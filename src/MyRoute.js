import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';



const MyRoute = (props) => {
    const autenticado = useSelector(state => state.autenticacion.autenticado)

    return (
        autenticado ? <Route {...props} /> :
            <Redirect to='/login' />
    )
}

export default MyRoute;