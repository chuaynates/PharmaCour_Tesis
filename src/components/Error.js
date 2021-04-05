/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import '../assets/css/Error.css';
class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="error-body ">
        <div id="error-container">
          <div className="error-content mt-5">
            <h2>404</h2>
            <h4>Opps! Pagina no encontrada</h4>
            <p>Al parecer la pagina no existe. Asegurate que la direccion de la pagina se correcto o es probable que la pagina fuera removida.</p>
            <a href="/">Regresar al Inicio</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
