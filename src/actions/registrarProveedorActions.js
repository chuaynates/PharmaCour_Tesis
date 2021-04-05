import {
    REGISTRAR_PROVEEDOR,
    REGISTRAR_PROVEEDOR_EXITO,
    REGISTRAR_PROVEEDOR_ERROR
} from '../types'
import {clienteAxios4} from '../config/axios';
import Swal from 'sweetalert2';

export function registrarProveedorActions(proveedor) {
    return async (dispatch) => {
        dispatch(registrarProveedor());
        try {
            const respuesta = await clienteAxios4.post('/proveedores', proveedor);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Proveedor registrado correctamente`,
                text: "Inicie sesion con su usuario y contraseña",
                showConfirmButton: true
            })
            dispatch(registrarProveedorExito(respuesta.data))
        } catch (error) {
            console.log(error.response);
            dispatch(registrarProveedorError(error.response.data.errors))
        }
    }
    
}

const registrarProveedor = () => ({
    type: REGISTRAR_PROVEEDOR,
    payload: true
})

const registrarProveedorExito = proveedor => ({
    type: REGISTRAR_PROVEEDOR_EXITO,
    payload: proveedor
})

const registrarProveedorError = error => ({
    type: REGISTRAR_PROVEEDOR_ERROR,
    payload: error
})