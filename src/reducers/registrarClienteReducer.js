import {
    REGISTRAR_CLIENTE,
    REGISTRAR_CLIENTE_EXITO,
    REGISTRAR_CLIENTE_ERROR
} from '../types'

const initialState = {
    respuestaError: [],
    respuesta:null,
    loading: false,
    error:null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTRAR_CLIENTE:
            return {
                ...state,
                loading: true
            }
        
        case REGISTRAR_CLIENTE_EXITO:
            return {
                ...state,
                respuesta: action.payload,
                loading:false,
                error: null
            }
        
        case REGISTRAR_CLIENTE_ERROR:
            return{
                ...state,
                loading:false,
                error:true,
                respuestaError: action.payload
            }
        default:
            return state;
    }
}