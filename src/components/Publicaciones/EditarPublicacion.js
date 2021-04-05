import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mostrarAlertaAction, OcultarAlertaActions } from '../../actions/alertaActions';
import { editarPublicacionActions } from '../../actions/editarPublicacionActions';

const EditarPublicacion = ({ editarPublicacion }) => {


    const { title_publication, title_description, image_publication, id } = editarPublicacion

    const [titulo, guardarTitulo] = useState(title_publication)
    const [descripcion, guardarDescripcion] = useState(title_description)
    const [imagen, guardarImagen] = useState(null)

    const dispatch = useDispatch()
    //llamar a los actions de Alerta
    const mostrarAlerta = (alerta) => dispatch(mostrarAlertaAction(alerta));
    const ocultarAlerta = () => dispatch(OcultarAlertaActions());

    //Llamar al actions de EditarPublicacion
    const editarPublicacionActi = (idEditarPublicacion, publicacion) => dispatch(editarPublicacionActions(idEditarPublicacion, publicacion))

    //Estado Loadin

    const loading = useSelector(state => state.editarPublicacion.loading)


    const onSubmitEditarPublicacion = e => {
        e.preventDefault();

        //Validar los campos de Publicar
        if (titulo.trim() === "" || descripcion.trim() === "") {
            const respuesta = {
                msg: "Ambos campos son obligatorios",
                classes: "alert alert-danger text-center text-uppercase p-3 my-2",
            };
            mostrarAlerta(respuesta);
            return;
        }
        //si no hay errores
        ocultarAlerta();

        //Formatear los valores del formulario
        const editPubli = new FormData();
        if (imagen === null) {
            editPubli.append("archivo", imagen)
        } else {
            editPubli.append("archivo", imagen, imagen.name.replace(/ /g, ''));
        }
        editPubli.append("title_publication", titulo);
        editPubli.append("title_description", descripcion);

        // pasamos los valores a la funcion que se encarga de editar Publicacion
        editarPublicacionActi(id, editPubli);
    }



    return (
        <>
            <form
                onSubmit={onSubmitEditarPublicacion}
            >
                <div className="modal-content">

                    <div className="modal-header" style={{ background: '#2bb6bb', color: "#fff" }}>
                        <h5 className="modal-title" id={`editarPublicacionLabel${id}`}>Editar {title_publication}</h5>
                        <button type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="true" className="text-white">&times;</span>
                        </button>
                    </div>

                    {/* Contenido del modal */}

                    <div className="modal-body">
                        <div className="card mb-3">
                            <div className="d-flex justify-content-center">
                                <div className="comentario-publicacion-imagen" style={{
                                    backgroundImage: `url(http://127.0.0.1:8082/api/publicaciones/uploads/img/${image_publication}`
                                }}>
                                </div>
                                <div className="card-body justify-item-center">
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="tituloPublicacion">Titulo de la publicacion</label>
                                            <input type="text"
                                                className="form-control"
                                                id="tituloPublicacion"
                                                value={titulo}
                                                onChange={e => guardarTitulo(e.target.value)}
                                            />
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="descripcionPublicacion">Descripcion de la Publicacion</label>
                                        <textarea type="text"
                                            className="form-control"
                                            id="descripcionPublicacion"
                                            value={descripcion}
                                            onChange={e => guardarDescripcion(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label >Imagen Publicacion</label> <br />
                                        <div className="custom-file">
                                            <input type="file"
                                                className="custom-file-input"
                                                id="customFile"
                                                name="imagen"
                                                accept="image/*"
                                                onChange={(e) => guardarImagen(e.target.files[0])}
                                            />
                                            {imagen === null ? <label className="custom-file-label" htmlFor="customFile">Buscar Imagen</label>
                                                : <label className="custom-file-label" htmlFor="customFile">{imagen.name}</label>}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        {loading ? <button className="btn btn-outline-success" type="button" disabled>
                            <span className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true">
                            </span>Cargando...</button>
                            :
                            <button type="submit" className="btn btn-outline-success">Actualizar {title_publication}</button>
                        }
                    </div>

                </div>
            </form>
        </>
    );
}

export default EditarPublicacion;