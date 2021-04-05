import { EDITAR_PROVEEDOR, EDITAR_PROVEEDOR_ERROR, EDITAR_PROVEEDOR_EXITO } from '../types';

const initialState = {
    loading: false,
    error: null,
    respuesta: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case EDITAR_PROVEEDOR:
            return {
                ...state,
                loading: action.payload,
            }
        case EDITAR_PROVEEDOR_EXITO:
            return {
                ...state,
                loading: false,
                respuesta: action.payload
            }
        case EDITAR_PROVEEDOR_ERROR:
            return {
                ...state,
                loading:false,
                error: true
            }

        default:
            return state;
    }
    
}