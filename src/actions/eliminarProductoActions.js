import {
    ELIMINAR_PRODUCTO,
    ELIMINAR_PRODUCTO_EXITO,
    ELIMINAR_PRODUCTO_ERROR
} from '../types'
import { clienteAxios } from '../config/axios';
import Swal from 'sweetalert2';
import { productosProveedorActions } from './productosActions';

export function eliminarProductoActions(id) {
    return async (dispatch) => {
        dispatch(eliminarProducto());

        try {
            const idUsuarioLogueado = localStorage.getItem('id')
            const token = localStorage.getItem('token');
            Swal.fire({
                title: 'Estas seguro de eliminar el Producto?',
                text: "El producto se borra del registro permanentemente!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrarlo!'
            }).then((result) => {
                if (result.value) {
                    clienteAxios(token).delete(`/products/${id}`).then(() => { dispatch(productosProveedorActions(idUsuarioLogueado)) })
                    dispatch(eliminarProductoExito())
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Producto eliminado correctamente`,
                        showConfirmButton: false,
                        timer: 2000
                    })
                }

            })
        } catch (error) {
            dispatch(eliminarProductoError())
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `Ocurrio un error en la eliminacion del producto`,
                showConfirmButton: false,
                timer: 2000
            })
            console.log(error.response);
            console.log(error);

        }
    }

}

const eliminarProducto = () => ({
    type: ELIMINAR_PRODUCTO,
    payload: true
})

const eliminarProductoExito = () => ({
    type: ELIMINAR_PRODUCTO_EXITO,
    payload: "Producto Eliminado Correctamente"
})

const eliminarProductoError = () => ({
    type: ELIMINAR_PRODUCTO_ERROR,
    payload: "Ocurrio un error en la eliminacion"
})