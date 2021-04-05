import {
    CARGAR_DATOS,
    CARGAR_DATOS_EXITO,
    CARGAR_DATOS_ERROR
} from '../types'

const initialState = {
    datos: [],
    loading: false,
    error: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CARGAR_DATOS:
            return {
                ...state,
                loading: action.payload,
            }
        case CARGAR_DATOS_EXITO:
            return {
                ...state,
                loading:false,
                datos: action.payload
            }
        case CARGAR_DATOS_ERROR:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}