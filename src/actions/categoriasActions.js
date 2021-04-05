import {

    CARGAR_CATEGORIAS,
    CARGAR_CATEGORIAS_EXITO,
    CARGAR_CATEGORIAS_ERROR

} from '../types';
import { clienteAxios } from '../config/axios';

export function cargarCategoriasActions() {
    return async (dispatch) => {
        dispatch(cargarCategorias());
        try {
            const token = localStorage.getItem('token')
            const respuesta = await clienteAxios(token).get('/categories')
            dispatch(cargarCategoriasExito(respuesta.data))
        } catch (error) {
            console.log(error.response);
            dispatch(cargarCategoriasError())
        }
    }
}

const cargarCategorias = () => ({
    type: CARGAR_CATEGORIAS,
    payload: true
})

const cargarCategoriasExito = respuesta => ({
    type: CARGAR_CATEGORIAS_EXITO,
    payload: respuesta
})

const cargarCategoriasError = () => ({
    type: CARGAR_CATEGORIAS_ERROR,
    payload: true
})