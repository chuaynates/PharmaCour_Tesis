import {

    CARGAR_VENTAS,
    CARGAR_VENTAS_EXITO,
    CARGAR_VENTAS_ERROR,
    INFORMACION_VENTA,
    INFORMACION_VENTA_EXITO,

} from '../types';


// Cada reducer tiene su propio state

const initialState = {
    ventas: [],
    ventaInformacion: [],
    error: null,
    loading:false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case INFORMACION_VENTA:
        case CARGAR_VENTAS:
            return{
                ...state,
                loading: action.payload
            }
        
        case CARGAR_VENTAS_EXITO:
            return{
                ...state,
                loading:false,
                error:null,
                ventas: action.payload
            }
        case INFORMACION_VENTA_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                ventaInformacion: action.payload
            }
        case CARGAR_VENTAS_ERROR:
            return{
                ...state,
                loading:false,
                error: action.payload
            }



        default:
            return state;
    }
}