import {
    REGISTRAR_PROVEEDOR,
    REGISTRAR_PROVEEDOR_EXITO,
    REGISTRAR_PROVEEDOR_ERROR
} from '../types'

const initialState = {
    respuestaError: [],
    respuesta:null,
    loading: false,
    error:null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTRAR_PROVEEDOR:
            return {
                ...state,
                loading: true
            }
        
        case REGISTRAR_PROVEEDOR_EXITO:
            return {
                ...state,
                respuesta: action.payload,
                loading:false,
                error: null
            }
        
        case REGISTRAR_PROVEEDOR_ERROR:
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