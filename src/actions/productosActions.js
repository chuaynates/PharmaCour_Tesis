import {
    CARGAR_PRODUCTOS,
    CARGAR_PRODUCTOS_EXITO,
    CARGAR_PRODUCTOS_ERROR,

    FILTRAR_PRODUCTOS,
    FILTRAR_PRODUCTOS_EXITO,

    FILTRAR_PRODUCTOS_ASCENDENTES,
    FILTRAR_PRODUCTOS_ASCENDENTES_EXITO,

    FILTRAR_PRODUCTOS_PROVEEDOR,
    FILTRAR_PRODUCTOS_PROVEEDOR_EXITO,
    FILTRAR_PRODUCTOS_DESCENDENTES,
    FILTRAR_PRODUCTOS_DESCENDENTES_EXITO,
    BUSCAR_PRODUCTO,
    BUSCAR_PRODUCTO_EXITO,
    FILTRAR_PRODUCTO_PROVEEDOR_CATEGORIA,
    FILTRAR_PRODUCTO_PROVEEDOR_CATEGORIA_EXITO,
    FILTRAR_PRODUCTOS_PROVEEDOR_ERROR,
} from '../types';

import { clienteAxios } from '../config/axios'

export function cargarProductosActions() {
    return async (dispatch) => {

        dispatch(cargarProductos())

        try {
            const token = localStorage.getItem('token')
            const respuesta = await clienteAxios(token).get('/products')
            dispatch(cargarProductosExito(respuesta.data))
        } catch (error) {
            console.log(error.response);
            //TODO: Crear los mensajes de error
            dispatch(cargarProductosError())
        }

    }
}

const cargarProductos = () => ({
    type: CARGAR_PRODUCTOS,
    payload: true
})

const cargarProductosExito = respuesta => ({
    type: CARGAR_PRODUCTOS_EXITO,
    payload: respuesta
})

const cargarProductosError = () => ({
    type: CARGAR_PRODUCTOS_ERROR,
    payload: true
})

export function filtrarProductosCategoriasActions(id) {
    return async (dispatch) => {

        dispatch(filtrarProductos())
        try {
            const token = localStorage.getItem('token');
            const respuesta = await clienteAxios(token).get(`/products/category/${id}`)

            const productos = respuesta.data

            const producto = productos.map(producto => producto)
            dispatch(filtrarProductosExito(producto))
        } catch (error) {
            console.log(error)
            console.log(error.response);
        }
    }
}

const filtrarProductos = () => ({
    type: FILTRAR_PRODUCTOS,
    payload: true
})

const filtrarProductosExito = respuesta => ({
    type: FILTRAR_PRODUCTOS_EXITO,
    payload: respuesta
})


export function filtrarProductosDescendentesActions() {
    return async (dispatch) => {
        dispatch(filtrarProductosDescendentes())
        try {
            const token = localStorage.getItem('token');
            const respuesta = await clienteAxios(token).get(`/productsbypricedesc`)
            const productos = respuesta.data
            dispatch(filtrarProductosDescendentesExito(productos))
        } catch (error) {
            //TODO: MOSTRAR MENSAJE DE ERROR
            console.log(error.response);
        }
    }
}

const filtrarProductosDescendentes = () => ({
    type: FILTRAR_PRODUCTOS_DESCENDENTES,
    payload: true
})

const filtrarProductosDescendentesExito = respuesta => ({
    type: FILTRAR_PRODUCTOS_DESCENDENTES_EXITO,
    payload: respuesta
})


export function filtrarProductosAscendentesActions() {
    return async (dispatch) => {
        dispatch(filtrarProductosAscendentes())
        try {
            const token = localStorage.getItem('token');
            const respuesta = await clienteAxios(token).get(`/productsbypriceasc`)
            const productos = respuesta.data
            dispatch(filtrarProductosAscendentesExito(productos))
        } catch (error) {
            console.log(error.response);
        }
    }
}

const filtrarProductosAscendentes = () => ({
    type: FILTRAR_PRODUCTOS_ASCENDENTES,
    payload: true
})

const filtrarProductosAscendentesExito = respuesta => ({
    type: FILTRAR_PRODUCTOS_ASCENDENTES_EXITO,
    payload: respuesta
})

export function productosProveedorActions(id) {
    return async (dispatch) => {
        dispatch(filtrarProductosProveedor())
        try {
            const token = localStorage.getItem('token')
            const respuesta = await clienteAxios(token).get(`/products/provider/${id}`)
            dispatch(filtrarProductosProveedorExito(respuesta.data))
        } catch (error) {
            dispatch(filtrarProductosProveedorError())
            console.log(error.response);
        }
    }
}

const filtrarProductosProveedor = () => ({
    type: FILTRAR_PRODUCTOS_PROVEEDOR,
    payload: true
})

const filtrarProductosProveedorExito = respuesta => ({
    type: FILTRAR_PRODUCTOS_PROVEEDOR_EXITO,
    payload: respuesta
})

const filtrarProductosProveedorError = () => ({
    type: FILTRAR_PRODUCTOS_PROVEEDOR_ERROR,
    payload: true
})


export function buscarProductoActios(nombre) {
    return async (dispatch) => {
        dispatch(buscarProducto())
        try {
            const token = localStorage.getItem('token')
            const respuesta = await clienteAxios(token).get(`/products/filter/${nombre}`)
            dispatch(buscarProductoExito(respuesta.data))
        } catch (error) {

            //TODO: COLOCAR MENSAJE DE ERROR
            console.log(error);
            console.log(error.response);
        }
    }

}

const buscarProducto = () => ({
    type: BUSCAR_PRODUCTO,
    payload: true
})

const buscarProductoExito = productos => ({
    type: BUSCAR_PRODUCTO_EXITO,
    payload: productos
})

export function filtrarProductosProveedorCategoriaActions(id, idUsuarioLogueado) {
    return async (dispatch) => {
        dispatch(filtrarProductosProveedorCategoria())
        try {
            const token = localStorage.getItem('token');
            const respuesta = await clienteAxios(token).get(`/productos/provider/${idUsuarioLogueado}/${id}`)
            dispatch(filtrarProductosProveedorCategoriaExito(respuesta.data))
        } catch (error) {
            console.log(error.response);
        }
    }
}

const filtrarProductosProveedorCategoria = () => ({
    type: FILTRAR_PRODUCTO_PROVEEDOR_CATEGORIA,
    payload: true
})

const filtrarProductosProveedorCategoriaExito = productos => ({
    type: FILTRAR_PRODUCTO_PROVEEDOR_CATEGORIA_EXITO,
    payload: productos
})