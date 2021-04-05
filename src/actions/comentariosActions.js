import {
    CARGAR_COMENTARIOS,
    CARGAR_COMENTARIOS_EXITO
} from '../types'
import { clienteAxios } from '../config/axios';

export function cargarComentariosActions(id) {
    return async (dispatch) => {
        dispatch(cargarComentarios())
        try {
            const token = localStorage.getItem('token');
            const respuesta = await clienteAxios(token).get(`/publicaciones/${id}`)
            const comentarios = respuesta.data.commentsWithIdSortedInDesc
            const comentar = comentarios.map(com => com)
            dispatch(cargarComentariosExito(comentar)) 
        } catch (error) {
            //TODO: Mensaje de error
            console.log(error.response);
            console.log(error);
        }
    }
}

const cargarComentarios = () => ({
    type: CARGAR_COMENTARIOS,
    payload: true
})

const cargarComentariosExito = respuesta => ({
    type: CARGAR_COMENTARIOS_EXITO,
    payload: respuesta
})