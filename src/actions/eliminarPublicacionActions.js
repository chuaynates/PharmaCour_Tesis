import {
    ELIMINAR_PUBLICACION,
    ELIMINAR_PUBLICACION_EXITO,
    ELIMINAR_PUBLICACION_ERROR
} from '../types'

import { clienteAxios } from '../config/axios';
import Swal from 'sweetalert2';
import { cargarPublicacionesActions } from './publicacionesActions';

export function eliminarPublicacionActions(id) {
    return async (dispatch) => {
        dispatch(eliminarPublicacion())
        try {
            const token = localStorage.getItem('token');
            Swal.fire({
                title: 'Estas seguro de eliminar esta publicacion?',
                text: "La publicacion se borra del registro permanentemente!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrarlo!'
            }).then((result) => {
                if (result.value) {
                    clienteAxios(token).delete(`/publication/${id}`).then(() => { dispatch(cargarPublicacionesActions()) })
                    dispatch(eliminarPublicacionExito())
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Publicacion eliminado correctamente`,
                        showConfirmButton: false,
                        timer: 2000
                    })
                }

            })
        } catch (error) {
            dispatch(eliminarPublicacionError())
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `Ocurrio un error en la eliminacion de la publicacion`,
                showConfirmButton: false,
                timer: 2000
            })
            console.log(error.response);
            console.log(error);
        }
    }

}

const eliminarPublicacion = () => ({
    type: ELIMINAR_PUBLICACION,
    payload: true
})

const eliminarPublicacionExito = () => ({
    type: ELIMINAR_PUBLICACION_EXITO,
    payload: 'Publicacion borrado correctamente'
})

const eliminarPublicacionError = () => ({
    type: ELIMINAR_PUBLICACION_ERROR,
    payload: 'LA'
})