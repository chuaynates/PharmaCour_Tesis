import React from 'react';

import { FaRegClock, FaCommentAlt, FaHeart } from "react-icons/fa";
import { TiArrowForward } from "react-icons/ti";
import { Link } from 'react-router-dom';
import moment from 'moment';
import ComentarioPublicacion from './ComentarioPublicacion';
import { useDispatch } from 'react-redux';
import { cargarComentariosActions } from '../../actions/comentariosActions';
import { URLBASE } from '../../utils/domain';

const Publicacion = ({ publicacion }) => {

    const { image_publication, title_publication, title_description, provider, creation_date } = publicacion
    const { name, imgProfile, id } = provider
    
    const dispatch = useDispatch()
    const cargarComentarios = (idComentario) => dispatch(cargarComentariosActions(idComentario))

    const onClickCargarComentarios = () => {
        cargarComentarios(publicacion.id)
    }

    return (

        <>

            <div className="card tarjeta my-4 ">
                <div className="card-header d-flex align-items-center justify-content-between p-0">
                    <div>
                        <Link to={`/proveedores/${id}`}><img className="img-circle img-perfil" src={`${URLBASE}/api/providers/img/${imgProfile}`} alt={imgProfile} /></Link>
                        <Link to={`/proveedores/${id}`} className="nombre" >{name}</Link>
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
                            <a href="#like" className="text-white like"></a>
                        </div>
                        <div className="col-4">
                            <a
                                type="button"
                                href="#comentario"
                                className="text-white comentario"
                                data-toggle="modal"
                                data-target={`#comentarioPublicacion${publicacion.id}`}
                                onClick={() => onClickCargarComentarios()}
                            >
                                <FaCommentAlt size="25" />
                            </a>
                        </div>
                        <div className="col-4">
                            <a href="#compartir" className="text-white compartir"></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para ver los comentarios */}

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

        </>
    );
}

export default Publicacion;