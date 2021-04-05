import {
    CREAR_COMENTARIOS,
    CREAR_COMENTARIOS_EXITO
} from '../types'

const initialState = {
    respuesta: [],
    loading: false,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREAR_COMENTARIOS:
            return{
                ...state,
                loading: action.payload
            }
        case CREAR_COMENTARIOS_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                respuesta: action.payload
            }    
        default:
            return state;
    }
}