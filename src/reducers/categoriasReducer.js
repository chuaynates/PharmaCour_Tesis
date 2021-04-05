import {

    CARGAR_CATEGORIAS,
    CARGAR_CATEGORIAS_EXITO,
    CARGAR_CATEGORIAS_ERROR

} from '../types';

const initialState = {
    categorias: [],
    loading: false,
    error: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CARGAR_CATEGORIAS:
            return {
                ...state,
                loading: action.payload,
            }
        case CARGAR_CATEGORIAS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                categorias: action.payload
            }
        case CARGAR_CATEGORIAS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
    
        default:
            return state;
    }
    
}