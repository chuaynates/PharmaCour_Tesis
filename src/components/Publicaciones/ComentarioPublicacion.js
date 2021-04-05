import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import moment from 'moment';

import { crearComentarioActions } from '../../actions/crearComentarioActions'
import { Link } from 'react-router-dom';
import { URLBASE } from '../../utils/domain';
const ComentarioPublicacion = ({ comentarioPublicacion }) => {

    const dispatch = useDispatch();

    const crearComentario = (comentario, id) => dispatch(crearComentarioActions(comentario, id))

    const [txtComentario, guardarComentario] = useState("")

    const { id, image_publication, title_publication, provider } = comentarioPublicacion

    const comentarios = useSelector(state => state.comentarios.comentarios)
    const loading = useSelector(state => state.comentarios.loading)

    const onSubmitComentario = (e) => {
        e.preventDefault()
        if (txtComentario.trim() === "") {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `Ingrese algo para comentar`,
                showConfirmButton: false,
                timer: 2000
            })
            return;
        }

        const idUsuario = Number(localStorage.getItem('id'))
        const rol = localStorage.getItem('rol')

        if (rol === 'ROLE_PROVIDER') {
            const comentario = {
                "comment": txtComentario,
                "provider": {
                    "id": Number(idUsuario)
                },
                "publication": {
                    "id": id
                }
            }

            crearComentario(comentario, id);

        } else {
            const comentario = {
                "comment": txtComentario,
                "clients": {
                    "id": idUsuario
                },
                "publication": {
                    "id": id
                }
            }

            crearComentario(comentario, id);

        }

    }

    return (
        <>
            <div className="modal-content">

                <div className="modal-header" style={{ background: '#f0f2f5' }}>
                    <h5 className="modal-title" id={`editarProductoLabel${id}`}>Comentarios de {title_publication}</h5>
                    <button type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                {/* Contenido del modal */}

                <div className="modal-body">
                    <div className="card mb-5">
                        <div className="d-flex justify-content-center">
                            <div className="comentario-publicacion-imagen shadow" style={{
                                backgroundImage: `url(${URLBASE}/api/publicaciones/uploads/img/${image_publication}`
                            }}>
                            </div>
                            <div className="card-body justify-item-center">

                                <div className="shadow rounded-top p-2">
                                    <form
                                        onSubmit={onSubmitComentario}
                                    >
                                        <label>Realizar comentario</label>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="w-100 mr-1">
                                                <input type="text"
                                                    className="form-control block"
                                                    name="txtComentario"
                                                    value={txtComentario}
                                                    onChange={(e) => guardarComentario(e.target.value)}
                                                />
                                            </div>
                                            <div className="">
                                                <button type="submit" className="btn btn-success">Comentar</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="shadow rounded-bottom comentarios-scroll">
                                    {loading ? <div className="row justify-content-center">
                                        <div className="spinner-border text-center" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div> :
                                        comentarios.length === 0 ?
                                            <>
                                                <div className="row justify-content-center p-2">
                                                    <span className="alert alert-dark align-items-center text-center">No hay comentarios en esta publicación</span>
                                                </div>
                                            </>
                                            :
                                            (
                                                comentarios.map(comenta => (
                                                    <div className="d-flex justify-items-between p-2">
                                                        <div className="bg-transparent w-20 comentarios-imagen p-2">
                                                            {comenta.provider === null ? <img className="comentario-perfil" src={`${URLBASE}/api/providers/img/${comenta.clients.imgProfile}`} alt='' /> :
                                                                <img className="comentario-perfil" src={`${URLBASE}/api/providers/img/${comenta.provider.imgProfile}`} alt='' />}
                                                        </div>

                                                        <hr />

                                                        <div className="shadow w-100 p-3">
                                                            {comenta.provider === null ?
                                                                <>
                                                                    <div className="d-flex text-muted justify-content-between">
                                                                        <p className="font-weight-bold text-uppercase">{comenta.clients.name} </p>
                                                                        <p>{moment(comenta.date_created).startOf('minute').fromNow()}</p>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="d-flex text-muted justify-content-between">
                                                                        <Link to={`/proveedores/${comenta.provider.id}`} className="font-weight-bold">{comenta.provider.name}
                                                                            {provider.id === comenta.provider.id ? <span className="mx-2 text-success"> creador</span> : null}</Link>
                                                                        <p>{moment(comenta.date_created).startOf('minute').fromNow()}</p>
                                                                    </div>
                                                                </>
                                                            }
                                                            <hr />
                                                            <p className="comentario-texto">- {comenta.comment}</p>
                                                        </div>

                                                    </div>
                                                ))
                                            )
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ComentarioPublicacion;