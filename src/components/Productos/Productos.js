import React, { Fragment, useEffect, useState } from "react";
import Producto from "./Producto";
import Categorias from "./Categorias";
import Informacion from "../Layout/Informacion";
import CrearProducto from "./CrearProducto";
import { useDispatch, useSelector } from "react-redux";

//REDUX
import { cargarProductosActions, filtrarProductosAscendentesActions, productosProveedorActions, filtrarProductosDescendentesActions, buscarProductoActios } from "../../actions/productosActions";
import { cargarCategoriasActions } from "../../actions/categoriasActions";
import { RiArrowDropRightLine } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import '../../assets/css/Buscador.css'
import ScaleLoader from 'react-spinners/ScaleLoader'

const Productos = () => {

  const dispatch = useDispatch();

  const idUsuarioLogueado = localStorage.getItem('id')

  const rol = localStorage.getItem('rol')

  const [BProducto, GuardarBProducto] = useState("")

  useEffect(() => {
    if (rol === "ROLE_CLIENT") {
      if (BProducto.trim() !== "") {
        dispatch(buscarProductoActios(BProducto))
      } else {
        const cargarProductos = () => dispatch(cargarProductosActions());
        cargarProductos()
      }
    } else {
      const cargarProductoProveedor = (idUsuarioLogueado) => dispatch(productosProveedorActions(idUsuarioLogueado))
      cargarProductoProveedor(idUsuarioLogueado);
    }

    const cargarCategorias = () => dispatch(cargarCategoriasActions());
    cargarCategorias()

  }, [dispatch, idUsuarioLogueado, rol, BProducto])

  const productos = useSelector(state => state.productos.productos)
  const loading = useSelector(state => state.productos.loading)

  const categorias = useSelector(state => state.categorias.categorias)

  const onClickPrecioAscendente = () => {
    dispatch(filtrarProductosAscendentesActions())
  }

  const onClickPrecioDescendentes = () => {
    dispatch(filtrarProductosDescendentesActions())
  }

  const onSubmitBuscarProducto = e => {
    e.preventDefault()

  }


  return (
    <Fragment>
      <Informacion pagina={'Productos'} />
      <div className="container">

        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12 categoria-sidebar">
            <div className="row justify-content-center p-0">
              <div className="col-12 p-0">

                <div className="accordion" id="accordionCategoria">
                  <div className="card m-3">

                    <div className="card-header categorias-header" id="categoriaHeader">
                      <button className="btn btn-link btn-block text-left btn-categoria" type="button" data-toggle="collapse" data-target="#categoria" aria-expanded="true" aria-controls="categoria">
                        Buscar por categorias
                      </button>
                    </div>

                    {categorias.length === 0 ? <div
                      aria-labelledby="categoriaHeader"
                      data-parent="#accordionCategoria"
                      className="col-12 font-weight-bold collapse text-center mt-5">
                      <h5>NO HAY CATEGORIAS</h5>
                    </div> :
                      (
                        categorias.map(categoria => (
                          <Categorias
                            key={categoria.id}
                            categoria={categoria}
                          />
                        ))
                      )
                    }
                  </div>
                </div>
                {rol === 'ROLE_PROVIDER' ? null :
                  <div className="accordion" id="accordionFiltroPrecio">
                    {/* <div className="card m-3">

                      <div className="card-header categorias-header" id="filtroPrecioL">
                        <button className="btn btn-link btn-block text-left btn-categoria" type="button" data-toggle="collapse" data-target="#filtroPrecio" aria-expanded="true" aria-controls="filtroPrecio">
                          Ordenar por precio
                      </button>
                      </div>

                      <div id="filtroPrecio"
                        aria-labelledby="filtroPrecioL"
                        data-parent="#accordionFiltroPrecio"
                        className="col-12 font-weight-bold collapse text-center">
                      </div>
                      <div id="filtroPrecio" className="collapse" aria-labelledby="filtroPrecio" data-parent="#accordionFiltroPrecio">
                        <div className="card-body">
                          <button
                            className="btn categorias-boton btn-block bg-transparent"
                            onClick={() => onClickPrecioAscendente()}
                          >
                            <div className="row align-items-center justify-content-between pr-3 pl-3">
                              <div className="font-weight-bold ">Ascendente</div>
                              <div className="">
                                <RiArrowDropRightLine size={34} />
                              </div>
                            </div>
                          </button>

                          <button
                            className="btn categorias-boton btn-block bg-transparent"
                            onClick={() => onClickPrecioDescendentes()}
                          >
                            <div className="row align-items-center justify-content-between pr-3 pl-3">
                              <div className="font-weight-bold ">Descendente</div>
                              <div className="">
                                <RiArrowDropRightLine size={34} />
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div> */}
                  </div>
                }

              </div>
            </div>
          </div>
          {rol === 'ROLE_PROVIDER' ?
            <div className="col-lg-8 col-md-6 col-sm-12 categoria-sidebar">
              <CrearProducto />
            </div>
            :

            <div className="col-lg-8 col-md-6 col-sm-12 d-flex align-items-center categoria-sidebar">
              <div className="col-12 d-block">
                <form
                  onSubmit={onSubmitBuscarProducto}
                >
                  <div className="searchbar d-flex justify-content-between align-self-center">
                    <input className="search_input form-control" type="text"
                      name="producto" value={BProducto} onChange={(e) => GuardarBProducto(e.target.value)} placeholder="Buscar producto..." />
                    <button type="submit" className="search_icon mx-2 btn"><BsSearch /></button>
                  </div>
                </form>
              </div>
            </div>
          }
        </div>
        {loading ? <div className="row justify-content-center">
          <ScaleLoader
            size={0}
            height={50}
            margin={5}
            color={"#36D7B7"}
          />
        </div> :
          <div className="row productos-scroll justify-content-start">
            {productos.length === 0 ? <div className="col-12 alert alert-info font-weight-bold text-center mt-5">
              <h5>NO HAY PRODUCTOS</h5>
            </div> :

              (
                productos.map(producto => (
                  <Producto
                    key={producto.id}
                    producto={producto}
                  />
                ))
              )}

          </div>
        }
      </div>
    </Fragment >
  );
};

export default Productos;
