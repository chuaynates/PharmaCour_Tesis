import {

    AUTENTICAR_USUARIO,
    AUTENTICAR_USUARIO_EXITO,
    AUTENTICAR_USUARIO_ERROR,
    CARGAR_DATOS_USUARIO_AUTENTICADO_EXITO

} from '../types';
import { clienteAxios2, clienteAxios } from '../config/axios';

//import clienteAxios from '../config/axios';

export function autenticacionUsuarioActions(usuario) {
    return async (dispatch) => {
        dispatch(autenticarUsuario());

        try {

            const respuesta = await clienteAxios2.post('/token', usuario)
            dispatch(autenticarUsuarioExito(respuesta.data))

            const token = localStorage.getItem('token')
            const rol = localStorage.getItem('rol');
            if (rol === 'ROLE_PROVIDER') {
                const usuarioAutenticado = await clienteAxios(token).get(`/proveedores/${localStorage.getItem('id')}`)
                dispatch(cargarDatosUsuarios(usuarioAutenticado.data));
            } else {
                const usuarioAutenticado = await clienteAxios(token).get(`/clients/${localStorage.getItem('id')}`)
                dispatch(cargarDatosUsuarios(usuarioAutenticado.data));
            }

        } catch (error) {
            console.log(error.response);
            
            if (error.response) {
                const alerta = {
                    msg: error.response.data.error_description,
                    categoria: 'alert alert-danger'
                }
                dispatch(autenticacionUsuarioError(alerta))
                return;
            }

            const alerta = {
                msg: 'Error en el servidor',
                categoria: 'alert alert-danger'
            }

            dispatch(autenticacionUsuarioError(alerta));

        }
    }
}

const autenticarUsuario = () => ({
    type: AUTENTICAR_USUARIO,
    payload: true
})

const autenticarUsuarioExito = usuario => ({
    type: AUTENTICAR_USUARIO_EXITO,
    payload: usuario
})

const cargarDatosUsuarios = datosUsuarios => ({
    type: CARGAR_DATOS_USUARIO_AUTENTICADO_EXITO,
    payload: datosUsuarios
})

const autenticacionUsuarioError = alerta => ({
    type: AUTENTICAR_USUARIO_ERROR,
    payload: alerta
})


