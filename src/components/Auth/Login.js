/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

import "../../assets/css/Login.css";
import wave from "../../assets/img/loginimg.png";
import wavelog from "../../assets/img/wavelog.svg";



import Facebook from "../../assets/img/facebook.png";

import { useDispatch, useSelector } from "react-redux";


// redux
import {
  mostrarAlertaAction,
  OcultarAlertaActions,
} from "../../actions/alertaActions";
import { autenticacionUsuarioActions } from "../../actions/autenticacionActions";

const Login = ({ history }) => {
  //state componente
  const [username, guardarUsuario] = useState("");
  const [password, guardarContraseña] = useState("");

  const dispatch = useDispatch();

  //llamar al state de autenticacion
  const mensaje = useSelector((state) => state.autenticacion.mensaje);
  const cargar = useSelector((state) => state.autenticacion.loading);
  const error = useSelector((state) => state.autenticacion.error);
  const alerta = useSelector((state) => state.alerta.alerta);
  const autenticado = useSelector((state) => state.autenticacion.autenticado);

  //Llamar al actions de Alerta
  const mostrarAlerta = (alerta) => dispatch(mostrarAlertaAction(alerta));
  const ocultarAlerta = () => dispatch(OcultarAlertaActions());
  //llamar al actions de autenticacion
  const autenticarUsuario = (usuario) =>
    dispatch(autenticacionUsuarioActions(usuario));

  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  params.append("grant_type", "password");

  const onSubmitLogin = (e) => {
    e.preventDefault();

    // Validar los campos
    if (username.trim() === "" || password.trim() === "") {
      const respuesta = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      mostrarAlerta(respuesta);
      return;
    }

    //Si no hay errores
    dispatch(ocultarAlerta);
    // Llamar a la funcion
    autenticarUsuario(params);
    //Redirrecionar a la pagina de publicaciones
  };

  useEffect(() => {
    if (autenticado) {
      history.push("/publicaciones");
    }
  }, [autenticado, history]);

  return (
    <div>
      <div className="wavelogin"></div> 
      <img className="wave1" src={wave} />

      <div className="contenedor-login log123">

        <div className="login-content mt-5">
          <form onSubmit={onSubmitLogin}>
            

            <h2 className="title">Iniciar sesión</h2>

            <div className="input-div one mt-4">
              <div className="icon-login">
                <FaUser />
              </div>

              <div className="div">
                <input
                  type="text"
                  className="input"
                  placeholder="Nombre de usuario"
                  name="username"
                  value={username}
                  onChange={(e) => guardarUsuario(e.target.value)}
                />
              </div>
            </div>

            <div className="input-div pass">
              <div className="icon-login">
                <FaLock />
              </div>

              <div className="div">
                <input
                  type="password"
                  className="input"
                  placeholder="Contraseña"
                  name="password"
                  value={password}
                  onChange={(e) => guardarContraseña(e.target.value)}
                />
              </div>
            </div>
            
            <Link className="forgot-pass1" to={"/registro"}>
              Obtener cuenta nueva
            </Link>
            {cargar ? (
              <button className="btn btn-login" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Loading...</span>
              </button>
            ) : (
              <button type="submit" className="btn btn-login">
                Iniciar sesión
              </button>
            )}
            {error ? <p className={mensaje.categoria}>{mensaje.msg}</p> : null}

            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
            <p>Síguenos en:</p>
            <div className="social-media">
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/PharmaCour-110656344058337"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={Facebook} />
                  </a>
                </li>
                
              </ul>
            </div>
          </form>
        </div>
         
        
      </div>
      
    </div>
    
  );
};

export default Login;
