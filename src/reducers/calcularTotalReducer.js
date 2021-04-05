import {
    CALCULAR_TOTAL,
    CALCULAR_TOTAL_EXITO,
} from '../types';

const initialState = {
    loading: false,
    total: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CALCULAR_TOTAL:
            return {
                ...state,
                loading: action.payload
            }
        case CALCULAR_TOTAL_EXITO:
            return {
                ...state,
                total: action.payload
            }
        default:
            return state;
    }
}