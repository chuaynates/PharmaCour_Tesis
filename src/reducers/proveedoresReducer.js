import {

    CARGAR_PROVEEDORES,
    CARGAR_PROVEEDORES_EXITO,
    CARGAR_PROVEEDORES_ERROR,
    INFORMACION_PROVEEDOR,
    INFORMACION_PROVEEDOR_EXITO,

} from '../types';


// Cada reducer tiene su propio state

const initialState = {
    proveedores: [],
    proveedorInformacion: [],
    error: null,
    loading:false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case INFORMACION_PROVEEDOR:
        case CARGAR_PROVEEDORES:
            return{
                ...state,
                loading: action.payload
            }
        
        case CARGAR_PROVEEDORES_EXITO:
            return{
                ...state,
                loading:false,
                error:null,
                proveedores: action.payload
            }
        case INFORMACION_PROVEEDOR_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                proveedorInformacion: action.payload
            }
        case CARGAR_PROVEEDORES_ERROR:
            return{
                ...state,
                loading:false,
                error: action.payload
            }



        default:
            return state;
    }
}