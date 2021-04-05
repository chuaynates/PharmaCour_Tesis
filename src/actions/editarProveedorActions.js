import {
    EDITAR_PROVEEDOR,
    EDITAR_PROVEEDOR_EXITO,
    EDITAR_PROVEEDOR_ERROR
} from '../types'
import { clienteAxios } from '../config/axios';
import Swal from 'sweetalert2';
import {datosUsuarioAutenticadoActions} from '../actions/autenticadoActions'
import { cargarInformacionProveedorActions } from './proveedoresActions';

export function editarProveedorActions(proveedor) {
    return async (dispatch) => {
        dispatch(editarProveedor());

        try {
            const idUsuarioLogueado = localStorage.getItem('id')
            const token = localStorage.getItem('token');
            const respuesta = await clienteAxios(token).post('/providers/edit', proveedor)
            dispatch(editarProveedorExito(respuesta.data))
            dispatch(datosUsuarioAutenticadoActions(idUsuarioLogueado))
            dispatch(cargarInformacionProveedorActions(idUsuarioLogueado))
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Perfil actualizado correctamente",
                showConfirmButton: false,
                timer: 2000
            })
        } catch (error) {
            //TODO: IMPLEMENTAR ERROR ALERTA
            dispatch(editarProveedorError())
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Error al actualizar los datos del proveedor",
                showConfirmButton: false,
                timer: 2000
            })
            console.log(error);
            console.log(error.response);
        }
    }
}

const editarProveedor = () => ({
    type: EDITAR_PROVEEDOR,
    payload: true
})

const editarProveedorExito = respuesta => ({
    type: EDITAR_PROVEEDOR_EXITO,
    payload: respuesta
})

const editarProveedorError = () => ({
    type: EDITAR_PROVEEDOR_ERROR,
    payload: true
})
