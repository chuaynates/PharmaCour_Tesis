import React, { useState, useEffect  } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import registro_img from "../../assets/img/connection.svg";
import wave from "../../assets/img/registro.png";


import '../../assets/css/Register.css'
//redux
import { mostrarAlertaAction, OcultarAlertaActions } from '../../actions/alertaActions';
import { registrarClienteActions } from '../../actions/registrarClienteActions'

const RegistroCliente = ({history}) => {

    const [name, guardarNombre] = useState('');
    const [surname, guardarApellido] = useState('');
    const [address, guardarDireccion] = useState('');
    const [occupation, guardarOcupacion] = useState('');
    const [phone, guardarTelefono] = useState('');
    const [email, guardarCorreo] = useState('');
    const [username, guardarUsername] = useState('');
    const [password, guardarContraseña] = useState('');

    //inicializar el UseDispatch
    const dispatch = useDispatch();

    //Llamar al action de registrar Proveedor

    const registrarCliente = cliente => dispatch(registrarClienteActions(cliente));
    //Llamar al actions de Alerta
    const mostrarAlerta = alerta => dispatch(mostrarAlertaAction(alerta));
    const ocultarAlerta = () => dispatch(OcultarAlertaActions());

    // llamar a los estados con el useSelector
    const errores = useSelector(state => state.registrarCliente.respuestaError)
    const cliente = useSelector(state => state.registrarCliente.respuesta);
    const alertaRegistrar = useSelector(state => state.alerta.alerta);
    const loading = useSelector(state => state.registrarCliente.loading)
    const autenticado = useSelector(state => state.autenticacion.autenticado)

    const onSubmitRegistro = e => {
        e.preventDefault();

        //validar los campos
        if (name.trim() === "" || surname.trim() === "" || address.trim() === "" || occupation.trim() === "" || phone.trim() === "" ||
            email.trim() === "" || username.trim() === "" || password.trim() === "") {

            const alerta = {
                msg: 'Todos los campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }

            mostrarAlerta(alerta)
            return;
        }

        const users = {
            email,
            username,
            password
        }
        // si no hay errores,
        const cliente = {
            name,
            surname,
            address,
            occupation,
            phone,
            users
        }

        // llamar a la funcion para registrar al proveedor
        registrarCliente(cliente)
        dispatch(ocultarAlerta)

    }
    useEffect(() => {
        if (autenticado) {
          history.push('/productos')
        }
      }, [autenticado, history])
    
      useEffect(() => {
        if (cliente !== null) {
          history.push('/login')
        }
      }, [cliente, history])
    return (
        <>
        <div>
            <img className="wave-registro" src={wave} alt=""/>

            <div className="contenedor-registro">
                <div className="registro-content">
                <form
                    onSubmit={onSubmitRegistro}
                >
                    <div className="encabezado-registro">
                    <h2 className="title">Regístrate</h2>
                </div>
                    {alertaRegistrar ? <p className={alertaRegistrar.classes}>{alertaRegistrar.msg}</p> : null}
                    {errores
                        ? (errores.map(error => (
                            <p className="alert alert-danger text-center text-uppercase p3">{error}</p>
                        )))
                        : null}

                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label >Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={name}
                                onChange={e => guardarNombre(e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-12">
                            <label >Apellido </label>
                            <input
                                type="text"
                                className="form-control"
                                id="surname"
                                name="surname"
                                value={surname}
                                onChange={e => guardarApellido(e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-12">
                            <label>Dirección</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={address}
                                onChange={e => guardarDireccion(e.target.value)}
                            />
                        </div>
                        </div>
                        <div className="form-row">
                            
<div className="form-group col-md-6">
    <label >Ocupacion</label>
    <input
        type="text"
        className="form-control"
        id="occupation"
        name="occupation"
        value={occupation}
        onChange={e => guardarOcupacion(e.target.value)}
    />
</div>

<div className="form-group col-md-6">
    <label >Teléfono/Celular</label>
    <input
        type="tel"
        className="form-control"
        id="phone"
        name="phone"
        value={phone}
        onChange={e => guardarTelefono(e.target.value)}
    />
</div>
</div>

<div className="form-row">
<div className="form-group col-md-12">
    <label >Correo Electrónico</label>
    <input
        type="email"
        className="form-control"
        id="email"
        name="email"
        value={email}
        onChange={e => guardarCorreo(e.target.value)}
    />
</div>
</div>

<div className="form-row">
<div className="form-group col-md-12">
    <label >Nombre de usuario</label>
    <input
        type="text"
        className="form-control"
        id="username"
        name="username"
        value={username}
        onChange={e => guardarUsername(e.target.value)}
    />
</div>
</div>
<div className="form-row">

</div>

<div className="form-row">

<div className="form-group col-md-12">
    <label >Contraseña</label>
    <input
        type="password"
        className="form-control"
        id="password"
        name="password"
        value={password}
        onChange={e => guardarContraseña(e.target.value)}
    />
</div>
</div>

                    <Link to="/login" className="forgot-pass">Ya tienes una cuenta ?<b> Click aquí </b></Link>
                    {loading ? <button className="btn btn-primary btn-registro" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </button>
                        : <button type="submit" className="btn btn-registro" value="Registrarse" >Regístrarse</button>
                    }

                </form>
                <div className="imagen-registro">
        </div>
        </div>
    </div>
    </div>
        </>
    );
}

export default RegistroCliente;