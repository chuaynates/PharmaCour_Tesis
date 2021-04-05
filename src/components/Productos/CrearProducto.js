import React, { useState } from 'react';
import { mostrarAlertaAction, OcultarAlertaActions } from '../../actions/alertaActions';
import { crearProductoActions } from '../../actions/crearProductoActions';
import { useDispatch, useSelector } from 'react-redux';

const CrearProducto = () => {

    const [nombre, guardarNombre] = useState('');
    const [categoria, guardarCategoria] = useState('');
    const [precio, guardarPrecio] = useState('');
    const [stock, guardarStock] = useState(0);
    const [descripcion, guardarDescripcion] = useState('');
    const [imagen, guardarImagen] = useState(null);


    const dispatch = useDispatch();

    //Llamar al actions de crear producto
    const mostrarAlerta = alerta => dispatch(mostrarAlertaAction(alerta))
    const ocultarAlerta = () => dispatch(OcultarAlertaActions())

    //Llamar al actions de crear producto
    const crearProducto = producto => dispatch(crearProductoActions(producto))

    //Llamar a los estados 
    const alerta = useSelector(state => state.alerta.alerta)
    const categorias = useSelector(state => state.categorias.categorias)
    const loading = useSelector(state => state.crearProducto.loading)

    const onSubmitProducto = e => {
        e.preventDefault();

        //Validar los campos de Publicar
        if (nombre.trim() === "" || categoria.trim() === "" || precio <= 0 ||
            stock < 0 || descripcion.trim() === "" || imagen === null) {
            const alerta = {
                msg: "Todos los campos son obligatorios",
                classes: "alert alert-danger text-center text-uppercase p-3 my-2",
            };

            mostrarAlerta(alerta);
            return;
        }

        //si no hay errores
        ocultarAlerta()

        //Obtener el proveedor logueado
        const id = localStorage.getItem('id')

        //Convertir los datos a FormData
        const prod = new FormData();
        prod.append("archivo", imagen, imagen.name.replace(/ /g, ''));
        prod.append("product_description", descripcion);
        prod.append("name", nombre);
        prod.append('price', precio)
        prod.append('stock', stock)
        prod.append('product_category', categoria)
        prod.append('provider_id', id)

        // pasamos los valores del formulario al actions para registrar los productos
        crearProducto(prod)

    }


    return (
        <>
            <div className="row justify-content-center p-0">
                <div className="col-12 p-0">

                    <div className="accordion" id="accordionCrearProducto">
                        <div className="card m-3">
                            <div className="card-header categorias-header" id="crearProductoHeader">
                                <button className="btn btn-link btn-block text-left btn-categoria" type="button" data-toggle="collapse" data-target="#crearProducto" aria-expanded="false" aria-controls="crearProducto">
                                    Crear Producto
                                </button>

                            </div>
                            <div id="crearProducto" className="collapse" aria-labelledby="crearProductoHeader" data-parent="#accordionCrearProducto">
                                <div className="card-body">
                                    <form
                                        className="form-group"
                                        onSubmit={onSubmitProducto}
                                    >

                                        <label>Nombre producto</label>
                                        <input type="text"
                                            className="form-control"
                                            name="nombre"
                                            value={nombre}
                                            onChange={e => guardarNombre(e.target.value)}
                                        />

                                        <hr />
                                        <label>Categoria producto</label>

                                        <select
                                            className="custom-select form-control"
                                            placeholder="Selecionar categoria"
                                            name="Categorias"
                                            value={categoria}
                                            onChange={(e) => guardarCategoria(e.target.value)}
                                            required
                                        >
                                            <option value="selected">
                                                Selecciona una categoria...
                                            </option>
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

                                        <hr />
                                        <label>Precio en soles del producto</label>
                                        <input type="number"
                                            step="any"
                                            className="form-control"
                                            name="precio"
                                            value={precio}
                                            onChange={e => guardarPrecio(Number(e.target.value))}
                                        />

                                        <hr />
                                        <label>Cantidad de producto en stock</label>
                                        <input type="number"
                                            className="form-control"
                                            name="stock"
                                            value={stock}
                                            onChange={e => guardarStock(Number(e.target.value))}
                                        />

                                        <hr />
                                        <label>Descripción del producto</label>
                                        <textarea type="text"
                                            className="form-control"
                                            name="descripcion"
                                            value={descripcion}
                                            onChange={e => guardarDescripcion(e.target.value)}
                                        />

                                        <hr />

                                        <label >Imagen del producto</label> <br />

                                        <div className="custom-file">
                                            <input type="file"
                                                className="custom-file-input"
                                                id="customFile"
                                                name="imagen"
                                                accept="image/*"
                                                onChange={(e) => guardarImagen(e.target.files[0])}
                                            />
                                            {imagen === null ? <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                                : <label className="custom-file-label" htmlFor="customFile">{imagen.name}</label>}

                                        </div>

                                        <hr />

                                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

                                        <div className="d-flex justify-content-between">
                                            {loading ? <div className="spinner-border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div> : <button type="submit" className="btn btn-info text-light font-weight-bold" >Crear producto</button>}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CrearProducto;