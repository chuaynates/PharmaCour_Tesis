import {

    CARGAR_CLIENTES,
    CARGAR_CLIENTES_EXITO,
    CARGAR_CLIENTES_ERROR,
    INFORMACION_CLIENTE,
    INFORMACION_CLIENTE_EXITO,

} from '../types';


// Cada reducer tiene su propio state

const initialState = {
    clientes: [],
    clienteInformacion: [],
    error: null,
    loading:false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case INFORMACION_CLIENTE:
        case CARGAR_CLIENTES:
            return{
                ...state,
                loading: action.payload
            }
        
        case CARGAR_CLIENTES_EXITO:
            return{
                ...state,
                loading:false,
                error:null,
                clientes: action.payload
            }
        case INFORMACION_CLIENTE_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                clienteInformacion: action.payload
            }
        case CARGAR_CLIENTES_ERROR:
            return{
                ...state,
                loading:false,
                error: action.payload
            }



        default:
            return state;
    }
}