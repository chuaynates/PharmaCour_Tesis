import React from "react";
import { RiArrowDropRightLine } from "react-icons/ri";
import '../../assets/css/Categorias.css';
import { useDispatch } from "react-redux";
import { filtrarProductosCategoriasActions, filtrarProductosProveedorCategoriaActions } from "../../actions/productosActions";

const Categorias = ({ categoria }) => {

  const dispatch = useDispatch();

  const filtrarProducto = id => dispatch(filtrarProductosCategoriasActions(id))
  const { id, name } = categoria

  const rol = localStorage.getItem('rol');
  const idUsuarioLogueado = localStorage.getItem('id')

  const onClickCategoriaFiltro = (id) => {
    if (rol === 'ROLE_PROVIDER') {
      dispatch(filtrarProductosProveedorCategoriaActions(id, idUsuarioLogueado))
    } else {
      filtrarProducto(id)
    }
  }

  return (

    <div id="categoria" className="collapse" aria-labelledby="categoriaHeader" data-parent="#accordionCategoria">
      <div className="card-body">
        <button
          className="btn categorias-boton btn-block bg-transparent"
          onClick={() => onClickCategoriaFiltro(id)}
        >
          <div className="row align-items-center justify-content-between pr-3 pl-3">
            <div className="font-weight-bold ">{name}</div>
            <div className="">
              <RiArrowDropRightLine size={34} />
            </div>
          </div>
        </button>
      </div>
    </div>

  );
};

export default Categorias;
