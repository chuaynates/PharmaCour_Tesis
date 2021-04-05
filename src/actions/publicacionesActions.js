import {

    CARGAR_PUBLICACIONES,
    CARGAR_PUBLICACIONES_EXITO,
    CARGAR_PUBLICACIONES_ERROR,
    PUBLICACIONES_PROVEEDOR,
    PUBLICACIONES_PROVEEDOR_EXITO

} from '../types';

import { clienteAxios } from '../config/axios';

export function cargarPublicacionesActions() {

    return async (dispatch) => {
        dispatch(cargarPublicaciones());

        try {

            const token = localStorage.getItem('token')
            const respuesta = await clienteAxios(token).get('/publicaciones/page/0');
            dispatch(cargarPublicacionesExito(respuesta.data.content));
        } catch (error) {
            dispatch(cargarPublicacionesError())
        }

    }

}

const cargarPublicaciones = () => ({
    type: CARGAR_PUBLICACIONES,
    payload: true
});

const cargarPublicacionesExito = publicaciones => ({
    type: CARGAR_PUBLICACIONES_EXITO,
    payload: publicaciones
})

const cargarPublicacionesError = () => ({
    type: CARGAR_PUBLICACIONES_ERROR,
    payload: true
})


export function publicacionesProveedorActions(id) {
    return async (dispatch) => {
        dispatch(cargarPublicacionesProveedor());
        try {
            const token = localStorage.getItem('token');
            const respuesta = await clienteAxios(token).get(`/publicaciones/provider/${id}/0`)
            dispatch(cargarPublicacionesProveedorExito(respuesta.data.content))
        } catch (error) {
            console.log(error);
        }
    }
}

const cargarPublicacionesProveedor = () => ({
    type: PUBLICACIONES_PROVEEDOR,
    payload: true
})

const cargarPublicacionesProveedorExito = respuesta => ({
    type: PUBLICACIONES_PROVEEDOR_EXITO,
    payload: respuesta
})

