import React from "react";
import "../../assets/css/Productos.css";
import EditarProductoModal from "./EditarProductoModal";
import { useDispatch } from "react-redux";
import { eliminarProductoActions } from "../../actions/eliminarProductoActions";
import DetallesProductoModal from "./DetallesProductoModal";
import ComprarProductoModal from "./ComprarProductoModal";
import { URLBASE } from "../../utils/domain";

const Producto = ({ producto }) => {

  const { id, name, price, stock, provider, category, image } = producto

  console.log(producto);

  const dispatch = useDispatch();
  const eliminarProducto = idProductoEliminar => dispatch(eliminarProductoActions(idProductoEliminar));

  const onClickEliminar = (id) => {
    eliminarProducto(id);
  }

  const rol = localStorage.getItem('rol')
  const idUsuarioLogueado = Number(localStorage.getItem('id'))

  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-12 my-4">

        <div className="card producto-tarjeta border">

          <div className="producto-imagen mx-auto" style={{ backgroundImage: `url(${URLBASE}/api/products/img/${image})` }}>
            <div className="producto-gradient d-flex justify-content-center  align-items-center">
              {rol === "ROLE_PROVIDER" && provider.id === idUsuarioLogueado ?
                <>
                  <button type="button"
                    className="btn btn-editar mx-1"
                    data-toggle="modal"
                    data-target={`#editarProducto${id}`}>Editar
                </button>
                  <button
                    className="btn btn-eliminar mx-1"
                    type="button"
                    onClick={() => onClickEliminar(id)}
                  >
                    ELiminar
                </button>
                </>
                :
                <>
                  <button type="button mx-1"
                    className="btn btn-editar"
                    data-toggle="modal"
                    data-target={`#detallesProducto${id}`}>Detalles
                </button>
                  <button
                    className="btn btn-eliminar mx-1"
                    type="button"
                    data-toggle="modal"
                    data-target={`#comprarProducto${id}`}
                  >
                    Comprar
                </button>
                </>
              }
            </div>

          </div>

          <div className="px-4 card-body producto-body">

            <div className="d-flex justify-content-between">
              <span className="producto-name align-self-center">{name}</span>
              <h5 className="text-success align-self-center producto-precio">s/. {parseFloat(price).toFixed(2)}</h5>
            </div>

            <div>
              <span className="producto-proveedor">{provider.name}</span>
            </div>

            <div className="d-flex justify-content-between my-2">
              <span className="producto-stock">Stock</span>
              <span className={stock >= 50 ? `producto-stock-success p-1 text-light` :
                stock >= 25 ? `producto-stock-warning p-1 text-light` : `producto-stock-danger p-1 text-light`} > {stock === 0 ? 'Agotado' : ` ${stock} unidAD`} </span>
            </div>

            <div className="d-flex justify-content-between my-2">
              <span className="producto-stock">Categoria</span>
              <span className="producto-categoria p-1 text-light">{category.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editar un Porducto */}
      <div
        className="modal foda"
        id={`editarProducto${id}`}
        tabIndex="-1" role="dialog"
        aria-labelledby={`#editarProductoLabel${id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" >

          <EditarProductoModal editarProducto={producto} />

        </div>
      </div>

      {/* Detalles del producto */}

      <div
        className="modal foda"
        id={`detallesProducto${id}`}
        tabIndex="-1" role="dialog"
        aria-labelledby={`#detallesProductoLabel${id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" >

          <DetallesProductoModal editarProducto={producto} />

        </div>
      </div>

      {/* Comprar producto */}

      <div
        className="modal foda"
        id={`comprarProducto${id}`}
        tabIndex="-1" role="dialog"
        aria-labelledby={`#comprarProductoLabel${id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" >
          <ComprarProductoModal comprarProducto={producto} />
        </div>
      </div>

    </>
  );
};

export default Producto;
