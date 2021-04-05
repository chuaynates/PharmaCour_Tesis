import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mostrarAlertaAction, OcultarAlertaActions } from '../../actions/alertaActions';
import { editarProductoActions } from '../../actions/editarProductoActions';

const EditarProductoModal = ({ editarProducto }) => {

    const dispatch = useDispatch()

    //Llamar al actions de alerta
    const mostrarAlerta = alerta => dispatch(mostrarAlertaAction(alerta))
    const ocultarAlerta = () => dispatch(OcultarAlertaActions())

    //llamar al actions de actualizar
    const actualizarProducto = (idProducto, actualProducto) => dispatch(editarProductoActions(idProducto, actualProducto))

    //Llamar a los estados 
    const alerta = useSelector(state => state.alerta.alerta)
    const categorias = useSelector(state => state.categorias.categorias)

    const { id, name, price, stock, category, image, description } = editarProducto

    const [nombre, guardarNombre] = useState(name)
    const [precio, guardarPrecio] = useState(price)
    const [almacen, guardarAlmacen] = useState(stock)
    const [categoria, guardarCategoria] = useState(category.name)
    const [descripcion, guardarDescripcion] = useState(description)
    const [imagen, guardarImagen] = useState(null);

    const loading = useSelector(state => state.editarProducto.loading);

    const onSubmitEditarProducto = e => {
        e.preventDefault()

        //Validar los campos de editar producto
        if (nombre.trim() === "" || categoria.trim() === "" || precio <= 0 ||
            almacen < 0 || descripcion.trim() === "") {
            const alerta = {
                msg: "Todos los campos son obligatorios",
                classes: "alert alert-danger text-center text-uppercase p-3 my-2",
            };

            mostrarAlerta(alerta);
            return;
        }

        //Si no hay errores
        ocultarAlerta()

        const editProd = new FormData();
        if (imagen === null) {
            editProd.append("archivo", imagen)
        } else {
            editProd.append("archivo", imagen, imagen.name.replace(/ /g, ''));
        }
        editProd.append("product_description", descripcion);
        editProd.append("name", nombre);
        editProd.append('price', precio)
        editProd.append('stock', almacen)
        editProd.append('product_category', categoria)

        actualizarProducto(id, editProd)

    }


    return (
        <>
            <form
                onSubmit={onSubmitEditarProducto}
            >
                <div className="modal-content">

                    <div className="modal-header" style={{ background: '#154360', color: "#fff" }}>
                        <h5 className="modal-title" id={`editarProductoLabel${id}`}>Editar Producto {name}</h5>
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
                                <div className="producto-editar-imagen" style={{
                                    backgroundImage: `url(http://127.0.0.1:8082/api/products/img/${image}`
                                }}>
                                </div>
                                <div className="">
                                    <div className="card-body justify-content-center">

                                        <div className="form-row">

                                            <div className="form-group col-md-12">
                                                <label htmlFor="productoNombre">Nombre del Producto</label>
                                                <input type="text"
                                                    className="form-control"
                                                    name="productoNombre"
                                                    value={nombre}
                                                    onChange={e => guardarNombre(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-group col-md-12">
                                                <label htmlFor="productoCategoria">Categoria</label>
                                                <select className="custom-select form-control"
                                                    placeholder="Seleccionar categoria"
                                                    name="categoria"
                                                    value={categoria}
                                                    onChange={(e) => guardarCategoria(e.target.value)}
                                                    required
                                                >
                                                    <option value="DEFAULT">Selecciona una categoria...</option>
                                                    {categorias.length === 0 ?
                                                        <option disabled>No hay categorias</option>
                                                        :
                                                        (
                                                            categorias.map(categoria => (
                                                                <option key={categoria.id} value={categoria.name}>{categoria.name}</option>
                                                            ))
                                                        )
                                                    }
                                                </select>
                                                {/* <input type="text"
                                                    className="form-control"
                                                    id="productoCategoria"
                                                    value={categoria}
                                                    onChange={e => guardarCategoria(e.target.value)}
                                                /> */}
                                            </div>

                                        </div>

                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="productoPrecio">Precio</label>
                                                <input type="number"
                                                    accept="any"
                                                    className="form-control"
                                                    name="productoPrecio"
                                                    value={precio}
                                                    onChange={e => guardarPrecio(e.target.value)}
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label htmlFor="productoCantidadEditar">Cantidad de Stock</label>
                                                <input type="number"
                                                    className="form-control"
                                                    name="productoCantidadEditar"
                                                    value={almacen}
                                                    onChange={e => guardarAlmacen(e.target.value)}
                                                />
                                            </div>

                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="productoDescripcion">Descripcion del Producto</label>
                                            <textarea type="text"
                                                className="form-control"
                                                name="productoDescripcion"
                                                value={descripcion}
                                                onChange={e => guardarDescripcion(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label >Imagen del producto</label> <br />
                                            <input type="file"
                                                name="imagen"
                                                accept="image/*"
                                                onChange={(e) => guardarImagen(e.target.files[0])}
                                            />
                                        </div>

                                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer de Modal */}
                    <div className="modal-footer">
                        {loading ? <button className="btn btn-outline-success" type="button" disabled>
                            <span className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true">
                            </span>Cargando...</button>
                            :
                            <button type="submit" className="btn btn-outline-success">Actualizar {name}</button>
                        }
                    </div>
                </div>
            </form>
        </>

    );
}

export default EditarProductoModal;