import React, { useEffect } from 'react';
import '../../assets/css/perfilProveedor.css'
import { useSelector, useDispatch } from 'react-redux';
import ProveedorInfo from './ProveedorInfo';
import Informacion from '../Layout/Informacion';
import PublicacionProveedor from '../Publicaciones/PublicacionProveedor';
import { cargarInformacionProveedorActions } from '../../actions/proveedoresActions';
import Producto from '../Productos/Producto';
import { URLBASE } from '../../utils/domain';
import { publicacionesProveedorActions } from '../../actions/publicacionesActions';
import { productosProveedorActions } from '../../actions/productosActions';

const ProveedorPerfil = ({ match }) => {

    const dispatch = useDispatch()

    //TODO: llamar al estado de las publicaciones por estado 
    const publicaciones = useSelector(state => state.publicaciones.publicaciones);
    const loadingPublicaciones = useSelector(state => state.publicaciones.loading);

    const productos = useSelector(state => state.productos.productos)
    const loadingProducto = useSelector(state => state.productos.loading)

    const informacion = useSelector(state => state.proveedores.proveedorInformacion)

    const id = match.params.id

    useEffect(() => {

        dispatch(publicacionesProveedorActions(id))
        dispatch(productosProveedorActions(id))
        dispatch(cargarInformacionProveedorActions(id))

    }, [dispatch, id]);




    return (
        <>
            <div className="row ">
                <div className="col-12 p-0">
                    <Informacion pagina={`Informacion del proveedor`} />
                    
                    <div className="titulo-info rounded-bottom"></div>
                </div>

                <div className="container py-3">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 d-none d-sm-none d-md-none d-md-block">
                            <div className="card card-perfil hovercard">
                                <div className="card-header proveedor-perfil p-0"></div>
                                <div className="avatar">
                                    <img alt="" className="bg-white" src={`${URLBASE}/api/providers/img/${informacion.imgProfile}`} />
                                </div>
                                <div className="info">
                                    <div className="titulo">
                                        <p className="titulo-perfil"> {informacion.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-8 col-lg-9">
                            <div className="p-2 shadow bg-transparent m-3">
                                <h2 className="text-center titulo-perfil ">{informacion.name}</h2>
                            </div>
                            <div className="row justify-content-center mx-3">
                                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link active"
                                            id="pills-home-tab"
                                            data-toggle="pill"
                                            href="#pills-publicaciones"
                                            role="tab"
                                            aria-controls="pills-home"
                                            aria-selected="true"
                                        >Mis publicaciones</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link"
                                            id="pills-profile-tab"
                                            data-toggle="pill"
                                            href="#pills-informacion"
                                            role="tab"
                                            aria-controls="pills-profile"
                                            aria-selected="false"
                                        >Mi información</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-content " id="pills-tabContent">
                                <div className="tab-pane fade show active"
                                    id="pills-publicaciones"
                                    role="tabpanel"
                                    aria-labelledby="pills-home-tab">
                                    <div className="col-lg-12">
                                        {loadingPublicaciones ?
                                            <div className="row justify-content-center">
                                                <div className="spinner-border text-center m-5" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                            :

                                            publicaciones.length === 0 ? <div className="col-12 alert alert-info font-weight-bold text-center my-3">
                                                <h5>NO HAY PUBLICACIONES</h5>
                                            </div> :

                                                (
                                                    publicaciones.map(publicacion => (
                                                        <PublicacionProveedor
                                                            key={publicacion.id}
                                                            publicacion={publicacion}
                                                        />
                                                    ))
                                                )
                                        }
                                    </div>
                                </div>
                                <div className="tab-pane col-12 fade" id="pills-informacion" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    {informacion.length !== 0 ? <ProveedorInfo />
                                        : 'No hay datos en el estado'}

                                    {/* <ProveedorInfo /> */}

                                    <h2 className="text-center  titulo-perfil ">Mis Productos</h2>

                                    <div className="row productos-scroll justify-content-start">
                                        {loadingProducto ?
                                            <div className="row justify-content-center">
                                                <div className="spinner-border text-center" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                            :

                                            productos.length === 0 ? <div className="col-12 alert alert-info font-weight-bold text-center mt-5">
                                                <h5>NO HAY PRODUCTOS</h5>
                                            </div> :

                                                (
                                                    productos.map(producto => (
                                                        <Producto
                                                            key={producto.id}
                                                            producto={producto}
                                                        />
                                                    ))
                                                )
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProveedorPerfil;