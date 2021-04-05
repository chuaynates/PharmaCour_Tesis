import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mostrarAlertaAction, OcultarAlertaActions } from '../../actions/alertaActions';
import { editarProveedorActions } from '../../actions/editarProveedorActions';

const ProveedorInfo = () => {

    const dispatch = useDispatch()

    const mostrarAlerta = mensaje => dispatch(mostrarAlertaAction(mensaje))
    const ocultarAlerta = () => dispatch(OcultarAlertaActions())

    const alerta = useSelector(state => state.alerta.alerta)

    const informacion = useSelector(state => state.proveedores.proveedorInformacion)
    const loadingEditarProveedor = useSelector(state => state.editarProveedor.loading)

    const { id, name, phone, city, address } = informacion

    const [nombre, guardarNombre] = useState(name);
    const [telefono, guardarTelefono] = useState(phone);
    const [ciudad, guardarCiudad] = useState(city);
    const [direccion, guardarDireccion] = useState(address);
    const [perfil, guardarPerfil] = useState(null);
    const [fondo, guardarFondo] = useState(null);

    const idUsuarioLogueado = localStorage.getItem('id');
    const rolUsuarioLogueado = localStorage.getItem('rol');

    const evaluarUsuario = (id) => {
        if (Number(idUsuarioLogueado) === id && rolUsuarioLogueado === "ROLE_PROVIDER") {
            return false
        } else {
            return true
        }
    }

    const onSubmitEditarProveedor = (e) => {
        e.preventDefault()
        if (nombre.trim() === "" || telefono.trim() === "" || ciudad.trim() === "" || direccion.trim() === "") {
            const respuesta = {
                msg: "Todos los campos son obligatorios",
                classes: "alert alert-danger text-center text-uppercase p-3 my-2",
            };
            mostrarAlerta(respuesta);
            return;
        }

        if (telefono.length !== 9) {
            const respuesta = {
                msg: "Ingrese un telefono valido",
                classes: "alert alert-danger text-center text-uppercase p-3 my-2",
            };
            mostrarAlerta(respuesta);
            return;
        }

        ocultarAlerta()

        const proveedor = new FormData()
        proveedor.append("name", nombre);
        proveedor.append("id", id);
        proveedor.append("address", direccion);
        proveedor.append("city", ciudad);
        proveedor.append("phone", telefono);

        if (perfil === null) {
            proveedor.append("imagen_perfil", perfil)
        } else {
            proveedor.append("imagen_perfil", perfil, perfil.name.replace(/ /g, ''));
        }

        if (fondo === null) {
            proveedor.append("imagen_fondo", fondo)
        } else {
            proveedor.append("imagen_fondo", fondo, fondo.name.replace(/ /g, ''));
        }

        dispatch(editarProveedorActions(proveedor))

    }

    useEffect(() => {
        dispatch(OcultarAlertaActions())
    }, [nombre, telefono, ciudad, direccion, dispatch])

    return (
        <>
            <div className="bg-white shadow my-2 card-body justify-content-center">
                <form
                    onSubmit={onSubmitEditarProveedor}
                >
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Nombre</label>
                        <div className="col-sm-10">
                            <input type="text"
                                disabled={evaluarUsuario(id)}
                                className="form-control"
                                value={nombre}
                                onChange={(e) => guardarNombre(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group row justify-content-between">
                        <label className="col-sm-2 col-form-label">Teléfono</label>
                        <div className="col-sm-10">
                            <input type="text"
                                disabled={evaluarUsuario(id)}
                                className="form-control"
                                value={telefono}
                                onChange={(e) => guardarTelefono(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Ciudad</label>
                        <div className="col-sm-10">
                            <input type="text"
                                disabled={evaluarUsuario(id)}
                                className="form-control"
                                value={ciudad}
                                onChange={(e) => guardarCiudad(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Dirección</label>
                        <div className="col-sm-10">
                            <input type="text"
                                disabled={evaluarUsuario(id)}
                                className="form-control"
                                value={direccion}
                                onChange={(e) => guardarDireccion(e.target.value)}
                            />
                        </div>
                    </div>

                    {evaluarUsuario(id) ? null :
                        <>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Imagen de Perfil</label>
                                <div className="col-sm-10">
                                    <div className="custom-file">
                                        <input type="file" disabled={evaluarUsuario(id)} className="custom-file-input" id={`proveedorPerfil${id}`}
                                            name="imagenPerfilProveedor" accept="image/*" onChange={(e) => guardarPerfil(e.target.files[0])} />
                                        {perfil === null ? <label className="custom-file-label" htmlFor={`proveedorPerfil${id}`}>Buscar foto de perfil</label> :
                                            <label className="custom-file-label" htmlFor={`proveedorPerfil${id}`}>{perfil.name}</label>}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Imagen de Portada</label>
                                <div className="col-sm-10">
                                    <div className="custom-file">
                                        <input type="file" disabled={evaluarUsuario(id)} className="custom-file-input" id={`proveedorFondo${id}`}
                                            name="imagenPerfilProveedor" accept="image/*" onChange={(e) => guardarFondo(e.target.files[0])} />
                                        {fondo === null ? <label className="custom-file-label" htmlFor={`proveedorFondo${id}`}>Buscar foto de Portada</label> :
                                            <label className="custom-file-label" htmlFor={`proveedorFondo${id}`}>{fondo.name}</label>}
                                    </div>
                                </div>
                            </div>
                            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
                            <div className="row">
                                {loadingEditarProveedor ? <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> :
                                    <button type="submit" className="btn btn-block btn-outline-info">Actualizar</button>}
                            </div>



                        </>
                    }
                    {/* <div className="form-group">
                    <label htmlFor="productoDescripcion">Descripcion del Producto</label>
                    <textarea type="text"
                        className="form-control"
                        disabled
                        id="productoDescripcion"
                        value={description}
                    />
                </div> */}
                </form>
            </div >
        </>
    );
}

export default ProveedorInfo;