import React, { useState } from "react";
import "../../assets/css/Publicar.css";

import { useDispatch, useSelector } from "react-redux";

//Redux
import {
  mostrarAlertaAction,
  OcultarAlertaActions,
} from "../../actions/alertaActions";

import { crearPublicacionActions } from "../../actions/publicarActions";
import { URLBASE } from "../../utils/domain";

const Publicar = ({ datos }) => {
  //state del registrar
  const [titulo, guardarTitulo] = useState("");
  const [descripcion, guardarDescripcion] = useState("");
  const [imagen, guardarImagen] = useState(null);

  const dispatch = useDispatch();

  //llamar a los actions de Alerta
  const mostrarAlerta = (alerta) => dispatch(mostrarAlertaAction(alerta));
  const ocultarAlerta = () => dispatch(OcultarAlertaActions());

  // llamar al actions de Publicar
  const crearPublicacion = (publicacion) => dispatch(crearPublicacionActions(publicacion));

  //Llamar al estado de alerta
  const alerta = useSelector((state) => state.alerta.alerta);

  //llamar a los estados de realizarPublicacion
  const porcentaje = useSelector(state => state.realizarPublicacion.porcentaje)
  const loading = useSelector((state) => state.realizarPublicacion.loading);

  const onsubmitPublicar = (e) => {
    e.preventDefault();

    //Validar los campos de Publicar
    if (titulo.trim() === "" || descripcion.trim() === "" || imagen === null) {
      const respuesta = {
        msg: "Todos los campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p-3 my-2",
      };
      mostrarAlerta(respuesta);
      return;
    }

    //si no hay errores
    ocultarAlerta();

    //Obtener el id del proveedor logueado
    const id = localStorage.getItem('id')

    //Formatear los valores del formulario
    const pb = new FormData();
    pb.append("archivo", imagen, imagen.name.replace(/ /g, ''));
    pb.append("title_publication", titulo);
    pb.append("title_description", descripcion);
    pb.append('provider_id', id)

    // pasamos los valores a la funcion que se encarga de publicar
    crearPublicacion(pb);

  };


  const rol = localStorage.getItem('rol')

  return (
    <>
      {rol === 'ROLE_PROVIDER' ?
        <div className="row justify-contect-center">
          <div className="col-12">
            <div className="card shadow">
              <div className="card-body">
                <form onSubmit={onsubmitPublicar}>
                  <div className="input-group d-flex align-items-center mb-3">
                    <div className="custom-file">

                      <div className="custom-file">
                        <input type="file"
                          className="custom-file-input"
                          id="customFile"
                          name="imagen"
                          accept="image/*"
                          onChange={(e) => guardarImagen(e.target.files[0])}
                        />
                        {imagen === null ? <label className="custom-file-label" htmlFor="customFile">Buscar Imagen</label>
                          : <label className="custom-file-label" htmlFor="customFile">{imagen.name}</label>}
                      </div>

                    </div>
                    <div className="avatar-pub">
                      <img src={`${URLBASE}/api/providers/img/${datos.imgProfile}`} alt='perfil' />
                    </div>
                  </div>
                  {imagen !== null ?
                    <div className="imagen-publicar-preview card-body p-0 text-center text-muted font-italic">
                      <img className="imagen-preview card-img img-fluid" id="imagenPrevisualizacion" alt='' src='#' />
                      <span>Previsualizacion de la Imagen</span>
                    </div>
                    : null}

                  <hr />

                  <div className="row justify-content-center">
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Titulo de la publicacion"
                        name="titulo"
                        value={titulo}
                        onChange={(e) => guardarTitulo(e.target.value)}
                      />
                      <br />

                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Descripcion"
                        name="descripcion"
                        value={descripcion}
                        onChange={(e) => guardarDescripcion(e.target.value)}
                      />
                    </div>
                  </div>

                  {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

                  <hr />

                  {loading ? (
                    <>
                      <div className="progress" style={{ height: "5px" }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${porcentaje}` }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>{porcentaje
                        }
                      </div>
                    </>
                  ) : (
                      <>
                        <button
                          type="submit"
                          className="botton-publicar font-weight-bold text-uppercase btn-block w"
                        >
                          Publicar
                  </button>
                      </>
                    )}
                </form>
              </div>
            </div>
          </div>
        </div> :
        null
      }
    </>
  );
};

export default Publicar;
