import {
    CALCULAR_TOTAL,
    CALCULAR_TOTAL_EXITO,
} from '../types';


// Mostrar alerta
export function calcularTotalAction(precio, envio, cantidad) {
    return (dispatch) => {
        dispatch(calcularTotal())
        try {
            
            const resultado = ((precio*cantidad)+envio)
            dispatch(calcularTotalExito(resultado))

        } catch (error) {
            console.log(error);
        }
    }
}

const calcularTotal = () => ({
    type: CALCULAR_TOTAL,
    payload: true
})

const calcularTotalExito = (resultado) => ({
    type: CALCULAR_TOTAL_EXITO,
    payload: resultado
}) 