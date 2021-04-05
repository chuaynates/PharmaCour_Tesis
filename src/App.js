import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

//Carpeta de Auth
import Login from "./components/Auth/Login";
import Registro from "./components/Auth/RegistroProveedor";

//Css
//import './assets/css/App.css';

// Carpeta Proveedores
import Proveedores from "./components/Proveedores/Proveedores";
import ProveedorPerfil from './components/Proveedores/ProveedorPerfil';

//Carpeta de Productos
import Productos from "./components/Productos/Productos";

//Carpeta de Chat
import Graficos from "./components/Graficos/Graficos";

//Carpeta de Carrito
import Carrito from "./components/Carrito/Carrito";

//Carpeta de Publicaciones
import Publicacion from "./components/Publicaciones/Publicaciones";

//Carpeta de Layout
import Header from "./components/Layout/Header";
import Error from "./components/Error";
import Home from "./components/Home";

// Redux

import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';

// import MyRoute from "./MyRoute";

//Redux
import { datosUsuarioAutenticadoActions, validarTokenStorageActions } from './actions/autenticadoActions'

const Logout = () => {
  const dispatch = useDispatch()
  localStorage.clear()
  dispatch(validarTokenStorageActions(false))
  return <Redirect to={'/login'} />
}

const AppWrapper = () => {

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const App = () => {

  const dispatch = useDispatch()
  // const autenticado = useSelector(state => state.autenticacion.autenticado)

  const usuarioAutenticado = useSelector(state => state.autenticacion.usuario.users)
  if (usuarioAutenticado) {
    const rol = usuarioAutenticado.roles[0].name
    localStorage.setItem('rol', rol)
  }

  useEffect(() => {

    if (localStorage.getItem('token')) {
      dispatch(validarTokenStorageActions(true))
      const id = localStorage.getItem('id')
      dispatch(datosUsuarioAutenticadoActions(id))
    } else {
      dispatch(validarTokenStorageActions(false))
    }

  }, [dispatch])  

  return (

    <Router>
      <Header />
      <div className="container-fluid">
        <Switch>

          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/registro" component={Registro} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/publicaciones" component={Publicacion} />
          <Route exact path="/proveedores" component={Proveedores} />
          <Route exact path="/proveedores/:id" component={ProveedorPerfil} />
          <Route exact path="/productos" component={Productos} />
          <Route exact path="/graficos" component={Graficos} />
          <Route exact path="/carrito" component={Carrito} />
          <Route exact path="*" component={Error} />

        </Switch>
      </div>
    </Router>
  );
}

export default AppWrapper;
