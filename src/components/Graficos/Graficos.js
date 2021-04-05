import React, { Fragment, useEffect ,Component} from 'react';
import Informacion from '../Layout/Sales';

// CHART.js
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';

//redux


import { cargarInformacionVentaActions } from '../../actions/ventasActions';

    
class Graficos extends Component {

  constructor(props) {
      super(props);
      this.state = ({
          ventas: [],
          status: null
      })
  }
  componentWillMount() {
    
      fetch('http://localhost:8082/api/ventas/provider/1')
        .then((response) => {
          return response.json()
        })
        .then((prod) => {
          this.setState({ ventas:prod,
              status:'succes' })
          console.log(this.state)
        })    
    } 

  //TODO: llamar al estado de las publicaciones por estado 


    render() {
      return(
        <Fragment>
            <Informacion pagina="Panel de Información" />
            <div className="container-fluid my-4">
                <div className="row justify-content-center">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    
               
            <div className="card bg-light">
              <div className="card-header"></div>
              <div className="card-body">
                <h4 className="card-title">
               
                </h4>

                <ul className="list-group my-2">
                  <li className="list-group-item list-group-item-primary text-center">
                    VENTAS REALIZADAS
                  </li>
                </ul>


                <table className="table table-striped table-hover table-bordered my-3">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Email</th>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio Unitario</th>
                      <th>Total</th>
                      <th>Fecha de Compra</th>
                      <th>Estado</th>
                      

                    </tr>
                  </thead>
                  {this.state.ventas.map(noticia => {
                return(
                  <tbody key={noticia.id}>
                    <tr>
                      <td>{noticia.nombre_cliente}</td>
                      <td>{noticia.apellido_cliente}</td>
                      <td>{noticia.email}</td>
                      <td>{noticia.descripcion}</td>
                      <td>{noticia.cantidad_producto}</td>
                      <td>{noticia.precio_unitario}</td>
                      <td> {noticia.precio_unitario * noticia.cantidad_producto}</td>
                      <th>{noticia.creation_date}</th>
                      <td className={noticia.estado === true ? `producto-stock-success p-1 text-light` : `producto-stock-danger p-1 text-light`}>
                        {noticia.estado === true ? 'Entregado' : `Pendiente`}</td>
                    </tr>
                  </tbody>
                  );})}
                </table>
                <h5 className="float-right">
                  <span>PHARMACOUR</span>:{" "}
                  <span className="badge badge-secondary">factura.total</span>
                </h5>

              </div>
            </div>
          </div>
                    </div>


                </div>
            </div>
        </Fragment>
   
   );
    }
     
    
  
}

export default Graficos;