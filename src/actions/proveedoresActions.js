import {

    CARGAR_PROVEEDORES,
    CARGAR_PROVEEDORES_EXITO,
    CARGAR_PROVEEDORES_ERROR,
    INFORMACION_PROVEEDOR,
    INFORMACION_PROVEEDOR_EXITO,

} from '../types';

//Cliente Axios
import { clienteAxios } from '../config/axios';

// Cargar los proveedores de la API
export function cargarProveedoresAction() {
    return async (dispatch) => {
        dispatch(descargarProveedores());

        try {
            const token = localStorage.getItem('token')
            const respuesta = await clienteAxios(token).get(`/proveedores`);
            dispatch(descargaProductosExitosa(respuesta.data))

        } catch (error) {
            dispatch(descargaProductosError())
        }
    }
}

const descargarProveedores = () => ({
    type: CARGAR_PROVEEDORES,
    payload: true
})

const descargaProductosExitosa = proveedores => ({
    type: CARGAR_PROVEEDORES_EXITO,
    payload: proveedores
})

const descargaProductosError = () => ({
    type: CARGAR_PROVEEDORES_ERROR,
    payload: true
})

// Cargar la informacion del proveedor
export function cargarInformacionProveedorActions(id) {
    return async (dispatch) => {
        
        dispatch(cargarInformacionProveedor())
        try {
            const token = localStorage.getItem('token')
            await clienteAxios(token).get(`/proveedores/${id}`).then((data) => {
                dispatch(limpiarInformacionProveedor())
                dispatch(cargarInformacionProveedorExito(data.data))
            })
            
        } catch (error) {
            console.log(error.data);
        }
    }
}

const cargarInformacionProveedor = () => ({
    type: INFORMACION_PROVEEDOR,
    payload: true
})

const cargarInformacionProveedorExito = informacion => ({
    type: INFORMACION_PROVEEDOR_EXITO,
    payload: informacion
})

const limpiarInformacionProveedor = () => ({
    type: INFORMACION_PROVEEDOR_EXITO,
    payload: []
})

