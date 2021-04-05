import {

    EDITAR_PRODUCTO,
    EDITAR_PRODUCTO_EXITO,
    EDITAR_PRODUCTO_ERROR

} from '../types';

const initialState = {

    loading: false,
    error: null,
    respuesta: []
}


export default function (state = initialState, action) {
    switch (action.type) {
        case EDITAR_PRODUCTO:
            return{
                ...state,
                loading:action.payload
            }
        
        case EDITAR_PRODUCTO_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                respuesta: action.payload
            }
        
        case EDITAR_PRODUCTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
    
}