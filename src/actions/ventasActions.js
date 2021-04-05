import {
    CARGAR_VENTAS,
    CARGAR_VENTAS_ERROR,
    CARGAR_VENTAS_EXITO,
    INFORMACION_VENTA,
    INFORMACION_VENTA_EXITO
} from '../types';

import { clienteAxios } from '../config/axios'

export function cargarInformacionVentaActions() {
    return async (dispatch) => {
        
        dispatch(cargarInformacionVenta())
        try {
            const token = localStorage.getItem('token')
            await clienteAxios(token).get(`/ventas/provider/1`).then((data) => {
                dispatch(limpiarInformacionVenta())
                dispatch(cargarInformacionVentaExito(data.data))
            })
            
        } catch (error) {
            console.log(error.data);
        }
    }
}

const cargarInformacionVenta = () => ({
    type: INFORMACION_VENTA,
    payload: true
})

const cargarInformacionVentaExito = informacion => ({
    type: INFORMACION_VENTA_EXITO,
    payload: informacion
})

const limpiarInformacionVenta = () => ({
    type: INFORMACION_VENTA_EXITO,
    payload: []
})

