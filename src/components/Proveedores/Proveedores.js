import React, { Fragment, useEffect } from 'react';
// import person from '../../assets/img/person.jpg';
import '../../assets/css/Proveedores.css';
import Proveedor from './Proveedor';
import cristian from '../../assets/img/cristian.jpg';
import diego from '../../assets/img/diego.jpg';
// REDUX
import { useDispatch, useSelector } from 'react-redux';

// Action de Redux
import { cargarProveedoresAction } from '../../actions/proveedoresActions';

// React Spinners
import ScaleLoader from 'react-spinners/ScaleLoader';
import Informacion from '../Layout/Nosotros';

const Proveedores = () => {

    // utilizar use dispatch y te crea una funcion
    const dispatch = useDispatch();

    useEffect(() => {
        // Consultar la api
        const cargarProductos = () => dispatch(cargarProveedoresAction());
        cargarProductos();
    }, [dispatch])

    //Obtener el state
    const proveedores = useSelector(state => state.proveedores.proveedores);
    const error = useSelector(state => state.proveedores.error);
    const cargando = useSelector(state => state.proveedores.loading);


    return (
        <Fragment>
            <Informacion
                pagina="Proveedores"
            />
            <div className="container-fluid mt-5 ">
                {cargando ?
                    <div className="row justify-content-center">
                        <ScaleLoader
                            size={0}
                            height={50}
                            margin={5}
                            color={"#36D7B7"}
                        />
                    </div> :
                    <div className="row justify-content-center float-rigth">

                        {error ? <div className="alert text-center alert-danger col-12 mt-5" role="alert">
                            Hubo un error comunicarse con el administrador de la pagina
                            </div> : null
                        }

                        {proveedores.length === 0 ? <>

                             </>
                            :

                            (

                                proveedores.map(proveedor => (
                                    <Proveedor
                                        key={proveedor.id}
                                        proveedor={proveedor}
                                    />
                                ))

                            )}

                        {/* <div className="card-deck col-lg-4 col-md-6 col-sm-12 mt-2">
                        <div className="card tarjeta">
                            <img src={cafe} className="img-fluid tarjeta-imagen" alt="perfil"></img>
                            <h5 className="card-title text-center mt-3">Lima Cafe</h5>
                            <button type="button" className="btn m-2">Ver perfil</button>
                        </div>
                    </div> */}
                    </div>
                    
                    
                }
                <div class="card text-center">
  <div class="card-header bg-primary">
    
  </div>
  <div class="card-body">
    <h5 class="card-title">¿QUIÉNES SOMOS?</h5>
    <p class="card-text">La empresa fue creada con el fin de brindar el servicio de delivery de medicamentos e insumos relacionados a la salud. Para esto tendremos como principal herramienta una aplicación web llamada PharmaCour que permitirá al usuario ver, elegir y comprar el producto médico que desee. </p>
    
  </div>
  <div class="card-footer text-muted">
   
  </div>
</div>
<div class="card text-center">
  <div class="card-header bg-success">
    
  </div>
  <div class="card-body">
    <h5 class="card-title">VISIÓN</h5>
    <p class="card-text">Llegar a ser la mejor empresa de delivery en el país.  Poder expandirnos a todas las regiones del Perú y así ofrecer a todos los compatriotas un servicio de calidad que prioriza la seguridad, higiene y buen trato en el servicio.</p>
    
  </div>
  
</div>
<div class="card text-center">
  <div class="card-header bg-warning">
   
  </div>
  <div class="card-body">
    <h5 class="card-title">MISIÓN</h5>
    <p class="card-text">Nuestra misión es ser una empresa que provea un servicio de delivery de calidad. Buscamos hacer la diferencia ofreciendo confiabilidad, rapidez y sanidad en todas las entregas.</p>
    
  </div>
  
</div>
<div class="card text-center">
  <div class="card-header bg-secondary">
   
  </div>
  <div class="card-body">
    <h5 class="card-title">DESARROLLADORES</h5>
    <img src={cristian} width="350px" style={{padding:"20px"}} ></img>
    <p class="card-text">Cristian Huaynates Soto</p>
    <img src={diego} width="300px" style={{padding:"20px"}} ></img>
    <p class="card-text">Diego Torres Huamán</p>
    
  </div>
  
</div>
            </div>
        </Fragment >
    );
}

export default Proveedores;