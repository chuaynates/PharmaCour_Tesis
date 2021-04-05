import {

    CARGAR_PUBLICACIONES,
    CARGAR_PUBLICACIONES_EXITO,
    CARGAR_PUBLICACIONES_ERROR,
    PUBLICACIONES_PROVEEDOR,
    PUBLICACIONES_PROVEEDOR_EXITO

} from '../types';

const initialState = {
    publicaciones: [],
    error: null,
    loading:false
}

export default function(state = initialState, action) {
    switch (action.type) {

        case PUBLICACIONES_PROVEEDOR:
        case CARGAR_PUBLICACIONES:
            return{
                ...state,
                loading: action.payload
            }
        
        case PUBLICACIONES_PROVEEDOR_EXITO:
        case CARGAR_PUBLICACIONES_EXITO:
            return{
                ...state,
                loading:false,
                error:null,
                publicaciones: action.payload
            }     
        case CARGAR_PUBLICACIONES_ERROR:
            return{
                ...state,
                loading:false,
                error: action.payload
            }       
        default:
            return state;
    }
}