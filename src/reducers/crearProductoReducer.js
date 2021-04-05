import {
    CREAR_PRODUCTO,
    CREAR_PRODUCTO_EXITO,
    CREAR_PRODUCTO_ERROR
} from '../types'

const initialState = {
    loading: false,
    error: null,
    mensaje: []
}

export default function (state = initialState , action) {
    switch (action.type) {
        case CREAR_PRODUCTO:
            return {
                ...state,
                loading:action.payload
            }
        case CREAR_PRODUCTO_EXITO:
            return{
                ...state,
                loading:false,
                error: null,
                mensaje: action.payload
            }
        
        case CREAR_PRODUCTO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
    
}