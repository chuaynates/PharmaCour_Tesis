import {
  CREAR_PUBLICACION,
  PORCENTAJE_CARGAR,
  CREAR_PUBLICACION_EXITO,
  CREAR_PUBLICACION_ERROR,
} from "../types";
import { clienteAxios } from "../config/axios";
import { cargarPublicacionesActions } from './publicacionesActions';
import Swal from "sweetalert2";

export function crearPublicacionActions(publicacion) {
  return async (dispatch) => {
    dispatch(crearPublicacion());
    try {
      const token = localStorage.getItem('token')
      await clienteAxios(token).post('/publicaciones/upload', publicacion, {
        onUploadProgress: processEvent => {
          const porcentaje = Math.round(processEvent.loaded / processEvent.total * 100) + "%";
          dispatch(cargarPorcentaje(porcentaje));
        }
      })

      const mensaje = {
        msg: `La publicacion se realizo correctamente`,
        categoria: 'alert alert-success my-2'
      }

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `La publicacion se realizo correctamente`,
        showConfirmButton: false,
        timer: 2000
      })

      await dispatch(crearPublicacionExito(mensaje));

      dispatch(cargarPublicacionesActions())

    } catch (error) {
      console.log(error);
      const mensajeError = {
        msg: 'No se ha podido realizar la publicacion',
        categoria: 'alert alert-danger my-2'
      }

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error en la publicacion: El Archivo es demasiado grande para subirlo',
        showConfirmButton: true,
      })

      await dispatch(crearPublicacionError(mensajeError));

    }
  };
}

const crearPublicacion = () => ({
  type: CREAR_PUBLICACION,
  payload: true
});

const cargarPorcentaje = porcentaje => ({
  type: PORCENTAJE_CARGAR,
  payload: porcentaje,
})

const crearPublicacionExito = mensaje => ({
  type: CREAR_PUBLICACION_EXITO,
  payload: mensaje,
})

const crearPublicacionError = mensaje => ({
  type: CREAR_PUBLICACION_ERROR,
  payload: mensaje
})
