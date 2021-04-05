import {
    REALIZAR_PAGO,
    REALIZAR_PAGO_EXITO,
} from '../types';

const initialState = {
    loading: false,
    error: null,
    respuesta: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REALIZAR_PAGO:
            return{
                ...state,
                loading:action.payload
            }   
        case REALIZAR_PAGO_EXITO:
            return{
                ...state,
                loading:false,
                error: null,
                respuesta: action.payload
            }
        default:
            return state;
    }
}