import {
    CREAR_COMENTARIOS,
    CREAR_COMENTARIOS_EXITO
} from '../types'
import { clienteAxios } from '../config/axios'
import { cargarComentariosActions } from './comentariosActions'
import Swal from 'sweetalert2'

export function crearComentarioActions(comentario, id) {
    return async (dispatch) => {
        dispatch(crearComentario())
        
        try {
            const token = localStorage.getItem('token')
            const respuesta = await clienteAxios(token).post('/comment', comentario)
            dispatch(crearComentarioExito(respuesta))
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Comentario realizado correctamente`,
                showConfirmButton: false,
                timer: 2000
            })
            dispatch(cargarComentariosActions(id))
        } catch (error) {
            //TODO: IMPLEMENTAR ERROR ALERTA
            console.log(error.response);
            
        }
    }
}

const crearComentario = () => ({
    type: CREAR_COMENTARIOS,
    payload: true
})

const crearComentarioExito = respuesta => ({
    type: CREAR_COMENTARIOS_EXITO,
    payload: respuesta
})
