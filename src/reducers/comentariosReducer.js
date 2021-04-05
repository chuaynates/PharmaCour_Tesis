import {
    CARGAR_COMENTARIOS,
    CARGAR_COMENTARIOS_EXITO
} from '../types'

const initialState = {
    loading: false,
    error: null,
    comentarios: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CARGAR_COMENTARIOS:
            return{
                ...state,
                loading:true
            }
        case CARGAR_COMENTARIOS_EXITO:
            return{
                ...state,
                loading:false,
                error: null,
                comentarios: action.payload
            }
        
        default:
            return state;
    }
}