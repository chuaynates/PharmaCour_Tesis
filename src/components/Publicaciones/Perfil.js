import React from 'react';
import '../../assets/css/Perfil.css'
import { Link } from 'react-router-dom';
import { URLBASE } from '../../utils/domain';

const Perfil = ({datos}) => {

    const {imgBackground, imgProfile} = datos

    return (

        <div className="card card-perfil m-0 hovercard">
            <div className="card-header p-0">
                <img alt="fondo" className="card-img" src={`${URLBASE}/api/providers/img/fondo/${imgBackground}`} />
            </div>
            <div className="avatar">
                <img className="bg-white" src={`${URLBASE}/api/providers/img/${imgProfile}`} alt="perfil" />
            </div>
            <div className="info">
                <div className="titulo">
                    <Link to={`proveedores/${datos.id}`} className="nombre-perfil" href="https://scripteden.com/">{datos.name}</Link>
                </div>

                <div className="descripcion">{datos.address}</div>
                <hr />
                <Link type="button" to={`proveedores/${datos.id}`} className="btn btn-block font-weight-bold text-success">Ver mi perfil</Link>
            </div>
        </div>
    );
}

export default Perfil;