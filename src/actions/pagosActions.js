import {
    REALIZAR_PAGO,
    REALIZAR_PAGO_EXITO,
} from '../types';
import { clienteAxios } from '../config/axios';
import Swal from 'sweetalert2';

// Mostrar alerta
export function realizarPagoAction(pago, monto, producto, name, phone,address, clientName, clientSurname, clientId, providerId, quantity, unitAmount) {
    return (dispatch) => {
        dispatch(realizarPago())
        try {
            const { email, id } = pago
            const culqiRespuesta = {
                "nombre_proveedor": name,
                "numero_proveedor": phone,
                "direccion_proveedor": address,
                "nombre_cliente": clientName,
                "apellido_cliente": clientSurname,
                "id_cliente": clientId,
                "id_proveedor": providerId,
                "cantidad_producto": quantity,
                "precio_unitario": unitAmount,
                "amount": monto * 100,
                "token": id,
                "email": email,
                "descripcion": producto
            }
            console.log(culqiRespuesta);
            const token = localStorage.getItem('token')
            const respuesta = clienteAxios(token).post(`/pagosculqi`, culqiRespuesta)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Compra realizada correctamente espere que su proveedor se comunique con usted`,
                showConfirmButton: false,
                timer: 5000
            })
            dispatch(realizarPagoExito(respuesta))
        } catch (error) {
            console.log(error);
            console.log(error.response);
        }
    }
}

const realizarPago = () => ({
    type: REALIZAR_PAGO,
    payload: true
})

const realizarPagoExito = respuesta => ({
    type: REALIZAR_PAGO_EXITO,
    payload: respuesta
})

