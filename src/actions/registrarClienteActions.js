import {
    REGISTRAR_CLIENTE,
    REGISTRAR_CLIENTE_EXITO,
    REGISTRAR_CLIENTE_ERROR
} from '../types'
import {clienteAxios4} from '../config/axios';
import Swal from 'sweetalert2';

export function registrarClienteActions(cliente) {
    return async (dispatch) => {
        dispatch(registrarCliente());
        try {
            const respuesta = await clienteAxios4.post('/clientes', cliente);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Usuario registrado correctamente`,
                text: "Inicie sesion con su usuario y contraseña",
                showConfirmButton: true
            })
            dispatch(registrarClienteExito(respuesta.data))
        } catch (error) {
            console.log(error.response);
            dispatch(registrarClienteError(error.response.data.errors))
        }
    }
    
}

const registrarCliente = () => ({
    type: REGISTRAR_CLIENTE,
    payload: true
})

const registrarClienteExito = cliente => ({
    type: REGISTRAR_CLIENTE_EXITO,
    payload: cliente
})

const registrarClienteError = error => ({
    type: REGISTRAR_CLIENTE_ERROR,
    payload: error
})