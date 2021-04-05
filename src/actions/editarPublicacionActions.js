import {
    EDITAR_PUBLICACION,
    EDITAR_PUBLICACION_EXITO
} from '../types'
import { clienteAxios } from '../config/axios'
import Swal from 'sweetalert2'
import { cargarPublicacionesActions } from './publicacionesActions'
import $ from 'jquery'

export function editarPublicacionActions(id, publicacion) {
    return async (dispatch) => {
        dispatch(editarPublicacion())
        try {
            const token = localStorage.getItem('token')
            const respuesta = await clienteAxios(token).put(`/publication/${id}`, publicacion)
            dispatch(editarPublicacionExito(respuesta.data))

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: respuesta.data.mensaje,
                showConfirmButton: false,
                timer: 2000
            })

            $(`#editarPublicacion${id}`).modal('hide')

            dispatch(cargarPublicacionesActions())
        } catch (error) {
            //TODO: Agregar Mensaje de error
            console.log(error.response);
        }
    }
}

const editarPublicacion = () => ({
    type: EDITAR_PUBLICACION,
    payload: true
})

const editarPublicacionExito = respuesta => ({
    type: EDITAR_PUBLICACION_EXITO,
    payload: respuesta
})