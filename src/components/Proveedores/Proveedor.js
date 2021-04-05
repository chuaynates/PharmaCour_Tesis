import React from 'react';
import { Link } from 'react-router-dom';
import { URLBASE } from '../../utils/domain';

const Proveedor = ({ proveedor }) => {

    const { name, imgProfile, id } = proveedor

    return (
        <div className="card-deck col-lg-3 col-md-6 col-sm-12 mt-2">
            <div className="card tarjeta">
                <img src={`${URLBASE}/api/providers/img/${imgProfile}`} className="img-fluid tarjeta-imagen" alt="perfil"></img>
                <h5 className="card-title text-center mt-3">{name}</h5>
                <Link to={`/proveedores/${id}`} className="btn button mb-2 mr-2 ml-2 p-2">Ver perfil</Link>
            </div>
        </div>
    );
}

export default Proveedor;