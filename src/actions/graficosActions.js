import {
    CARGAR_DATOS,
    CARGAR_DATOS_EXITO,
    CARGAR_DATOS_ERROR
} from '../types'

//cliente axios
import { clienteAxios } from '../config/axios'

export function CargarGraficosActions(id) {
    return async (dispatch) => {
        dispatch(cargarDatos())

        try {
            const token = localStorage.getItem('token')
            const respuesta = await clienteAxios(token).get(`/graficos/${id}`)
            const graficos = respuesta.data
            const label = graficos.map(dato => dato.title_publication)
            const valores = graficos.map(valor => valor.commentsWithIdSortedInDesc[0])
            const valor = valores.map(val => val.comment)

            const chartData = {
                "labels": label,
                "datasets": [
                    {   
                        "label": "N° de comentarios por publicación",
                        "backgroundColor": [
                            
                            `rgba(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, 0.6)`,
                            `rgba(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, 0.6)`,
                            `rgba(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, 0.6)`,
                            `rgba(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, 0.6)`,
                            `rgba(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, 0.6)`,
                            `rgba(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, 0.6)`,
                            // "rgba(255, 99, 132, 0.6)",
                            // "rgba(54, 162, 235, 0.6)",
                            // "rgba(255, 206, 86, 0.6)",
                            // "rgba(75, 192, 192, 0.6)",
                        ],
                        "data": valor,
                    }
                ]
            }
            dispatch(cargarDatosExito(chartData))
        } catch (error) {
            console.log(error)
            dispatch(cargarDatosError())
        }
    }
}

const cargarDatos = () => ({
    type: CARGAR_DATOS,
    payload: true
})

const cargarDatosExito = data => ({
    type: CARGAR_DATOS_EXITO,
    payload: data
})

const cargarDatosError = () => ({
    type: CARGAR_DATOS_ERROR,
    payload: true
})