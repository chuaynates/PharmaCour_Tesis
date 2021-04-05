import {

    EDITAR_PRODUCTO,
    EDITAR_PRODUCTO_EXITO,
    EDITAR_PRODUCTO_ERROR

} from '../types';
import { clienteAxios } from '../config/axios';
import Swal from 'sweetalert2';
import { productosProveedorActions } from './productosActions';
import $ from 'jquery'

export function editarProductoActions(id, producto) {
    return async (dispatch) => {
        dispatch(editarProducto())
        try {
            const idUsuarioLogueado = localStorage.getItem('id')
            const token = localStorage.getItem('token');
            const respuesta = await clienteAxios(token).put(`/products/${id}`, producto)
            dispatch(editarProductoExito(respuesta.data));

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: respuesta.data.mensaje,
                showConfirmButton: false,
                timer: 2000
            })

            $(`#editarProducto${id}`).modal('hide')
            
            dispatch(productosProveedorActions(idUsuarioLogueado))
        } catch (error) {
            console.log(error.response);
            dispatch(editarProductoError())
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `Error al editar el producto: Verificar que el archivo sea una imagen`,
                showConfirmButton: true
            })
        }
    }
}

const editarProducto = () => ({
    type: EDITAR_PRODUCTO,
    payload: true
})

const editarProductoExito = respuesta => ({
    type: EDITAR_PRODUCTO_EXITO,
    payload: respuesta
})

const editarProductoError = () => ({
    type: EDITAR_PRODUCTO_ERROR,
    payload: true
})