import React, { useState, useEffect } from 'react';

import '../../assets/css/Register.css'
import registro_img from "../../assets/img/connection.svg";
import wave from "../../assets/img/wave_registro.png";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//redux
import { mostrarAlertaAction, OcultarAlertaActions } from '../../actions/alertaActions';
import { registrarProveedorActions } from '../../actions/registrarProveedorActions'


const Register = ({ history }) => {

  const [name, guardarCompañia] = useState('');
  const [address, guardarDireccion] = useState('');
  const [city, guardarCiudad] = useState('');
  const [phone, guardarTelefono] = useState('');
  const [email, guardarCorreo] = useState('');
  const [username, guardarUsername] = useState('');
  const [password, guardarContraseña] = useState('');

  //inicializar el UseDispatch
  const dispatch = useDispatch();

  //Llamar al action de registrar Proveedor

  const registrarProveedor = proveedor => dispatch(registrarProveedorActions(proveedor));
  //Llamar al actions de Alerta
  const mostrarAlerta = alerta => dispatch(mostrarAlertaAction(alerta));
  const ocultarAlerta = () => dispatch(OcultarAlertaActions());

  // llamar a los estados con el useSelector
  const errores = useSelector(state => state.registrarProveedor.respuestaError)
  const proveedor = useSelector(state => state.registrarProveedor.respuesta);
  const alertaRegistrar = useSelector(state => state.alerta.alerta);
  const loading = useSelector(state => state.registrarProveedor.loading)
  const autenticado = useSelector(state => state.autenticacion.autenticado)


  const onSubmitRegistro = e => {
    e.preventDefault();

    //validar los campos
    if (name.trim() === "" || address.trim() === "" || city.trim() === "" || phone.trim() === "" ||
      email.trim() === "" || username.trim() === "" || password.trim() === "") {

      const alerta = {
        msg: 'Todos los campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3'
      }

      mostrarAlerta(alerta)
      return;
    }

    const users = {
      email,
      username,
      password
    }
    // si no hay errores,
    const proveedor = {
      name,
      address,
      city,
      phone,
      users
    }

    // llamar a la funcion para registrar al proveedor
    registrarProveedor(proveedor)

    dispatch(ocultarAlerta)

  }

  useEffect(() => {
    if (autenticado) {
      history.push('/publicaciones')
    }
  }, [autenticado, history])

  useEffect(() => {
    if (proveedor !== null) {
      history.push('/login')
    }
  }, [proveedor, history])

  return (

    <div>
      <img className="wave-registro" src={wave} alt="" />

      <div className="contenedor-registro">
        <div className="registro-content">

          <form
            onSubmit={onSubmitRegistro}
          >
            <div className="encabezado-registro">
              <h2 className="title">Regístrate</h2>
            </div>

            {alertaRegistrar ? <p className={alertaRegistrar.classes}>{alertaRegistrar.msg}</p> : null}
            {errores
              ? (errores.map(error => (
              <p className="alert alert-danger text-center text-uppercase p3">{error}</p>
              )))
              : null}

            <div className="form-row">
              <div className="form-group col-md-12">
                <label >Nombre de la Compañía</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  onChange={e => guardarCompañia(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Dirección de la compañía</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={address}
                  onChange={e => guardarDireccion(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label >Ciudad</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={city}
                  onChange={e => guardarCiudad(e.target.value)}
                />
              </div>

            </div>

            <div className="form-row">

              <div className="form-group col-md-12">
                <label >Número de contacto</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={e => guardarTelefono(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-12">
                <label >Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={e => guardarCorreo(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-12">
                <label >Nombre de usuario</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={username}
                  onChange={e => guardarUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">

              <div className="form-group col-md-12">
                <label >Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={e => guardarContraseña(e.target.value)}
                />
              </div>
            </div>

            <Link to="/login" className="forgot-pass">Ya tienes una cuenta ?<b> Click aquí </b></Link>
            {loading ? <button className="btn btn-primary btn-registro" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
              : <button type="submit" className="btn btn-registro" value="Registrarse" >Regístrarse</button>
            }
          </form>

        </div>
        <div className="imagen-registro">
          <img src={registro_img} alt="" />
        </div>
      </div>
    </div>

  );
}

export default Register;
