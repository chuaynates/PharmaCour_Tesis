import React from 'react';

const DetallesProductoModal = ({ editarProducto }) => {

    const { id, name, price, stock, category, image, description } = editarProducto

    return (
        <>
            <div className="modal-content">

                <div className="modal-header" style={{ background: '#2fd69a', color: "#fff" }}>
                    <h5 className="modal-title" id={`detallesProductoLabel${id}`}>Detalles producto {name}</h5>
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
                                                disabled
                                                className="form-control"
                                                name="productoNombre"
                                                value={name}
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label htmlFor="productoCategoria">Categoria</label>
                                            <input type="text"
                                            disabled
                                                className="form-control"
                                                name="productoCategoria"
                                                value={category.name}
                                            />
                                        </div>

                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="productoPrecio">Precio</label>
                                            <input type="number"
                                                accept="any"
                                                disabled
                                                className="form-control"
                                                id="productoPrecio"
                                                value={price}
                                            />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="productoCantidad">Cantidad de Stock</label>
                                            <input type="number"
                                                className="form-control"
                                                disabled
                                                id="productoCantidad"
                                                value={stock}
                                            />
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="productoDescripcion">Descripcion del Producto</label>
                                        <textarea type="text"
                                            className="form-control"
                                            disabled
                                            id="productoDescripcion"
                                            value={description}
                                        />
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

export default DetallesProductoModal;