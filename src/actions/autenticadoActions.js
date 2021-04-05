import {

    CARGAR_DATOS_USUARIO_AUTENTICADO_EXITO,
    CARGAR_DATOS_USUARIO_AUTENTICADO_ERROR,
    VALIDAR_TOKEN_STORAGE

} from '../types';
import { clienteAxios } from '../config/axios';


export function datosUsuarioAutenticadoActions(id) {
    return async (dispatch) => {

        try {

            const token = localStorage.getItem('token')
            const rol = localStorage.getItem('rol')

            if (rol === 'ROLE_PROVIDER') {
                const usuarioAutenticado = await clienteAxios(token).get(`/proveedores/${id}`)
                dispatch(datosUsuarioAutenticadoExito(usuarioAutenticado.data))
            } else {
                const usuarioAutenticado = await clienteAxios(token).get(`/clients/${id}`)
                dispatch(datosUsuarioAutenticadoExito(usuarioAutenticado.data))
            }

        } catch (error) {
            console.log(error);
            localStorage.clear()
            const alerta = {
                msg: 'Sesion terminada, por favor vuelva a iniciar sesion',
                categoria: 'alert alert-warning'
            }
            dispatch(datosUsuarioAutenticadoError(alerta))
        }
    }
}

const datosUsuarioAutenticadoExito = usuario => ({
    type: CARGAR_DATOS_USUARIO_AUTENTICADO_EXITO,
    payload: usuario
})

const datosUsuarioAutenticadoError = alerta => ({
    type: CARGAR_DATOS_USUARIO_AUTENTICADO_ERROR,
    payload: alerta
})


export function validarTokenStorageActions(token) {
    return (dispatch) => {
        dispatch(validadartoken(token));
    }
}

const validadartoken = token => ({
    type: VALIDAR_TOKEN_STORAGE,
    payload: token
})