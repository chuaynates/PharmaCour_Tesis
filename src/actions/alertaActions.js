import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,
} from '../types';


// Mostrar alerta
export function mostrarAlertaAction(alerta) {
    return (dispatch) => {
        dispatch(mostrarAlerta(alerta))
    }
}

const mostrarAlerta = alerta => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
})

// Ocultar alerta
export function OcultarAlertaActions() {
    return async (dispatch) => {
        await dispatch(ocultarAlerta());
    }
}

const ocultarAlerta = () => ({
    type: OCULTAR_ALERTA
}) 
