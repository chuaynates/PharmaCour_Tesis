import {

    AUTENTICAR_USUARIO,
    AUTENTICAR_USUARIO_EXITO,
    AUTENTICAR_USUARIO_ERROR,
    CARGAR_DATOS_USUARIO_AUTENTICADO_EXITO,
    CARGAR_DATOS_USUARIO_AUTENTICADO_ERROR,
    VALIDAR_TOKEN_STORAGE

} from '../types'

const initialState = {
    autenticado: false,
    loading:false,
    error: null,
    usuario:[],
    mensaje: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTENTICAR_USUARIO:
            return{
                ...state,
                loading: action.payload
            }
        
        case AUTENTICAR_USUARIO_EXITO:
            localStorage.setItem('token' , action.payload.access_token)
            localStorage.setItem('id' , action.payload.id_provider)
            localStorage.setItem('rol', action.payload.rol)
            return{
                ...state,
                error:null,
                loading:false,
                autenticado:true,
                mensaje:null
            }
        case CARGAR_DATOS_USUARIO_AUTENTICADO_ERROR:
        case AUTENTICAR_USUARIO_ERROR:
            return{
                ...state,
                loading:false,
                error:true,
                autenticado:false,
                mensaje: action.payload
            }
        case CARGAR_DATOS_USUARIO_AUTENTICADO_EXITO:
            return {
                ...state,
                loading:false,
                error:null,
                autenticado:true,
                usuario:action.payload
            }

        case VALIDAR_TOKEN_STORAGE:
            return {
                ...state,
                autenticado: action.payload
            }
        default:
            return state;

    }

}