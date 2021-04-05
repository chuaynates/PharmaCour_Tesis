import {
    CREAR_PRODUCTO,
    CREAR_PRODUCTO_EXITO,
    CREAR_PRODUCTO_ERROR
} from '../types'
import { clienteAxios } from '../config/axios';
import { productosProveedorActions } from '../actions/productosActions'
import Swal from 'sweetalert2';
import $ from 'jquery'

export function crearProductoActions(producto) {
    return async (dispatch) => {
        dispatch(crearProducto());

        try {
            const id = localStorage.getItem('id')
            const token = localStorage.getItem('token')
            const respuesta = await clienteAxios(token).post('/products/upload', producto)
            dispatch(crearProductoExito(respuesta.response))
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Producto agregado correctamente`,
                showConfirmButton: false,
                timer: 2000
            })
            $(`#crearProducto`).collapse('hide')
            dispatch(productosProveedorActions(id))
        } catch (error) {
            console.log(error.response);
            dispatch(crearProductoError())
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `Error al registrar el producto: Verificar que el archivo sea una imagen`,
                showConfirmButton: true
            })

        }
    }
}

const crearProducto = () => ({
    type: CREAR_PRODUCTO,
    payload: true
})

const crearProductoExito = respuesta => ({
    type: CREAR_PRODUCTO_EXITO,
    payload: respuesta
})

const crearProductoError = () => ({
    type: CREAR_PRODUCTO_ERROR,
    payload: true
})