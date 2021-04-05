import {
    CREAR_PUBLICACION,
    PORCENTAJE_CARGAR,
    CREAR_PUBLICACION_EXITO,
    CREAR_PUBLICACION_ERROR
    
} from '../types'

const initialState = {
    loading : false,
    error: null,
    mensaje : [],
    porcentaje: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREAR_PUBLICACION:
            return {
                ...state,
                loading: action.payload
            }
        case PORCENTAJE_CARGAR:
            return{
                ...state,
                loading:true,
                porcentaje: action.payload
            }
        
        case CREAR_PUBLICACION_EXITO:
            return {
                ...state,
                loading: false,
                porcentaje: '',
                error: null,
                mensaje: action.payload
            }

        case CREAR_PUBLICACION_ERROR:
            return {
                ...state,
                loading: false,
                porcentaje: '',
                error: true,
                mensaje: action.payload
            }

        default:
            return state;
    }
}