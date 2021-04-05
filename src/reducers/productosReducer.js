import {
    CARGAR_PRODUCTOS,
    CARGAR_PRODUCTOS_EXITO,
    CARGAR_PRODUCTOS_ERROR,
    FILTRAR_PRODUCTOS,
    FILTRAR_PRODUCTOS_EXITO,
    FILTRAR_PRODUCTOS_ASCENDENTES,
    FILTRAR_PRODUCTOS_ASCENDENTES_EXITO,
    FILTRAR_PRODUCTOS_PROVEEDOR_EXITO,
    FILTRAR_PRODUCTOS_PROVEEDOR,
    FILTRAR_PRODUCTOS_DESCENDENTES,
    FILTRAR_PRODUCTOS_DESCENDENTES_EXITO,
    BUSCAR_PRODUCTO,
    BUSCAR_PRODUCTO_EXITO,
    FILTRAR_PRODUCTO_PROVEEDOR_CATEGORIA,
    FILTRAR_PRODUCTO_PROVEEDOR_CATEGORIA_EXITO,
    FILTRAR_PRODUCTOS_PROVEEDOR_ERROR
} from '../types';

const initialState = {
    productos: [],
    error: null,
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {

        case FILTRAR_PRODUCTO_PROVEEDOR_CATEGORIA:
        case BUSCAR_PRODUCTO:
        case FILTRAR_PRODUCTOS_PROVEEDOR:
        case FILTRAR_PRODUCTOS_ASCENDENTES:
        case FILTRAR_PRODUCTOS_DESCENDENTES:
        case FILTRAR_PRODUCTOS:
        case CARGAR_PRODUCTOS:
            return {
                ...state,
                loading: action.payload
            }

        case FILTRAR_PRODUCTO_PROVEEDOR_CATEGORIA_EXITO:
        case BUSCAR_PRODUCTO_EXITO:
        case FILTRAR_PRODUCTOS_PROVEEDOR_EXITO:
        case FILTRAR_PRODUCTOS_ASCENDENTES_EXITO:
        case FILTRAR_PRODUCTOS_DESCENDENTES_EXITO:
        case FILTRAR_PRODUCTOS_EXITO:
        case CARGAR_PRODUCTOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }
        case FILTRAR_PRODUCTOS_PROVEEDOR_ERROR:
        case CARGAR_PRODUCTOS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }

}