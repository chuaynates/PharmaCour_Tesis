import React, { Fragment, useEffect } from "react";

import '../../assets/css/Publicaciones.css';

//Redux
import { useDispatch, useSelector } from 'react-redux';

import Informacion from "../Layout/Blog";
//Actions de Publicaciones
import { cargarPublicacionesActions } from '../../actions/publicacionesActions';
import Publicacion from "./Publicacion";
import Perfil from "./Perfil";
import Publicar from "./Publicar";

// Loaders
import ScaleLoader from 'react-spinners/ScaleLoader'
import TopProductos from "../Productos/TopProductos";

const Publicaciones = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const cargarPublicaciones = () => dispatch(cargarPublicacionesActions());
        cargarPublicaciones();

    }, [dispatch])

    const publicaciones = useSelector(state => state.publicaciones.publicaciones);
    const cargar = useSelector(state => state.publicaciones.loading);
    const error = useSelector(state => state.publicaciones.error);

    const usuario = useSelector(state => state.autenticacion.usuario)

    return (
        <Fragment>
    <Informacion pagina={'Productos'} />
            {cargar ?
                <div className="row justify-content-center">
                    <ScaleLoader
                        size={0}
                        height={50}
                        margin={5}
                        color={"#36D7B7"}
                    />
                </div> :
            error ? <div className="col-12 alert alert-danger font-weight-bold text-center mt-5">
                <span>Error: comunicarse con el administrador de la pagina</span>
            </div> : 

            <div className="container-fluid">

                <div className="row mt-5 justify-content-between">

                    <div className="col-lg-3 p-0 m-0 pl-4 col-md-4 d-none d-sm-none d-md-none d-md-block">
                        {usuario.length === 0 ? 'Necesitas autenticarte' :
                            <Perfil key={usuario.id} datos={usuario} />
                        }

                    </div>

                    <div className="col-12 col-sm-12 col-md-8 productos-scroll col-lg-5">

                        {usuario.length === 0 ? 'Necesitas autenticarte' :
                                <Publicar key={usuario.id} datos={usuario} />
                        }

                        {publicaciones.length === 0 ? <div className="col-12 alert alert-info font-weight-bold text-center mt-5">
                            <h5>NO HAY PUBLICACIONES</h5>
                        </div> :

                            (
                                publicaciones.map(publicacion => (
                                    <Publicacion
                                        key={publicacion.id}
                                        publicacion={publicacion}
                                    />
                                ))
                            )
                        }
                    </div>

                    <div className="col-lg-3 p-0 pr-4 d-none d-sm-none d-md-none d-md-block d-sm-none ">
                        <h2 className="text-center mb-3 p-3">Productos mas vendidos</h2>
                        <TopProductos />

                    </div>
                </div>
            </div>
            }
        </Fragment>
    );
}

export default Publicaciones;