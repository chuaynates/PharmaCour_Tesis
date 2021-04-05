import React from 'react';

import { FaRegClock, FaCommentAlt, FaHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TiArrowForward } from "react-icons/ti";
import { Link } from 'react-router-dom';
import moment from 'moment';
import ComentarioPublicacion from './ComentarioPublicacion';
import EditarPublicacion from './EditarPublicacion';
import { useDispatch } from 'react-redux';
import { eliminarPublicacionActions } from '../../actions/eliminarPublicacionActions';
import { URLBASE } from '../../utils/domain';

const PublicacionProveedor = ({ publicacion }) => {

    const { image_publication, title_publication, title_description, provider, creation_date } = publicacion
    const { name, imgProfile, id } = provider

    const dispatch = useDispatch()

    //LLamar al action de eliminacion de publicaciones
    const eliminarPublicacion = idPubl => dispatch(eliminarPublicacionActions(idPubl))
    const idPublicacion = publicacion.id

    const onCLickElimarPublicacion = (idPublicacion) => {
        eliminarPublicacion(idPublicacion)
    }

    const rol = localStorage.getItem('rol');
    const idUsuarioLogueado = Number(localStorage.getItem('id'))

    return (

        <>

            <div className="card tarjeta">
                <div className="card-header d-flex align-items-center justify-content-between p-0">
                    <div>
                        <Link to={`/proveedores/${id}`}><img className="img-circle img-perfil" src={`${URLBASE}/api/providers/img/${imgProfile}`} alt="perfil" /></Link>
                        <Link to={`/proveedores/${id}`} className="nombre" >{name}</Link>
                    </div>
                    <div>

                        {rol === 'ROLE_PROVIDER' && idUsuarioLogueado === id ?

                            <div className="dropdown dropleft">
                                <button className="btn"
                                    type="button"
                                    id={`dropdownMenuButton${publicacion.id}`}
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <BsThreeDotsVertical />
                                </button>

                                <div className="dropdown-menu " aria-labelledby={`dropdownMenuButton${publicacion.id}`}>
                                    <button type="button"
                                        href="#comentario"
                                        data-toggle="modal"
                                        data-target={`#editarPublicacion${publicacion.id}`}
                                        className="dropdown-item">Editar</button>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => onCLickElimarPublicacion(idPublicacion)}
                                    >Eliminar</button>
                                </div>

                            </div>
                            : null
                        }
                    </div>
                </div>

                <div className="card-body p-0">
                    <img className="card-img publicacion-imagen img-fluid" src={`${URLBASE}/api/publicaciones/uploads/img/${image_publication}`} alt="fondo" />
                </div>

                <div className="card-footer text-muted justify-content-between">    

                    <div className="p-1">
                        <h5 className="card-text">{title_publication}</h5>
                    </div>
                    <div className=" ">
                        <p className="card-text border border-top-0 p-3">{title_description}</p>
                        <span className="fecha">
                            <FaRegClock /> {moment(creation_date).startOf('minute').fromNow()}
                        </span>
                    </div>

                    <hr />
                    <div className="text-center bg-dark-gray row">
                        <div className="col-4  align-self-center">
                            <a href="#like" className="text-white like"><FaHeart size="25" /></a>
                        </div>
                        <div className="col-4">
                            <a
                                type="button"
                                href="#comentario"
                                className="text-white comentario"
                                data-toggle="modal"
                                data-target={`#comentarioPublicacion${publicacion.id}`}
                            >
                                <FaCommentAlt size="25" />
                            </a>
                        </div>
                        <div className="col-4">
                            <a href="#compartir" className="text-white compartir"><TiArrowForward size="25" /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para ver las publicaciones */}

            <div
                className="modal foda"
                id={`comentarioPublicacion${publicacion.id}`}
                tabIndex="-1" role="dialog"
                aria-labelledby={`#comentarioPublicacionLabel${publicacion.id}`}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-xl" >

                    <ComentarioPublicacion comentarioPublicacion={publicacion} />

                </div>
            </div>


            {/* Modal para editar publicacion */}

            <div
                className="modal foda"
                id={`editarPublicacion${publicacion.id}`}
                tabIndex="-1" role="dialog"
                aria-labelledby={`#editarPublicacionLabel${publicacion.id}`}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-xl" >

                    <EditarPublicacion editarPublicacion={publicacion} />

                </div>
            </div>
        </>
    );
}

export default PublicacionProveedor;