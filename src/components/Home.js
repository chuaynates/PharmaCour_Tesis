import React from 'react';
import "../assets/css/Home.css";
import play from "../assets/img/inicio-09.png";
import medi from "../assets/img/medicamentos.png";
import { Link } from "react-router-dom";


const Home = () => {
  
  return (
    <div >
      
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="frase_q">
             <h2 className="H2">Los mejores productos, <br/> en un solo lugar</h2><br>
             </br> <h4>Únete a nuestra gran comunidad y encuentra los mejores precios</h4>
          </div>

          <div className="doc"></div>
          <div className="wave"></div>
          <div className="texto-inicio">
           
            
            
          </div>
        </div>
       
        <div className="row">
          <div className="frase_q2">
          <a className="H3">COMENZAR</a>
          
          </div>
          
        </div>
        <div className="boton-inicio">
            
            <Link to={'/login'} className="nav-a"><img src={play} width="120px"/></Link>
          </div>
      </div>
    </div>
  );
}

export default Home;


