import {
    EDITAR_PUBLICACION,
    EDITAR_PUBLICACION_EXITO,
    EDITAR_PUBLICACION_ERROR
} from '../types'

const initialState = {
    loading: false,
    error: null,
    respuesta: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case EDITAR_PUBLICACION:
            return {
                ...state,
                loading: true,
            };
        
        case EDITAR_PUBLICACION_EXITO:
            return {
                ...state,
                loading:false,
                error: null,
                respuesta: action.payload
            }
        
        case EDITAR_PUBLICACION_ERROR:
            return {
                ...state,
                loading:false,
                error: true,
                respuesta: action.payload
            }
    
        default:
            return state;
    }
}