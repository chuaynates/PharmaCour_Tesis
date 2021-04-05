import {
    ELIMINAR_PRODUCTO,
    ELIMINAR_PRODUCTO_EXITO,
    ELIMINAR_PRODUCTO_ERROR
} from '../types'

const initialState = {
    loading: false,
    error: null,
    respuesta: ""
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ELIMINAR_PRODUCTO:
            return{
                ...state,
                loading: true,
            };
        
        case ELIMINAR_PRODUCTO_EXITO:
            return{
                ...state,
                loading:false,
                respuesta: action.payload
            }

        case ELIMINAR_PRODUCTO_ERROR:
            return {
                ...state,
                loading: false,
                error:true,
                respuesta: action.payload
            }
        default:
            return state;
    }
}