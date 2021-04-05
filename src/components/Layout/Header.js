import React from 'react';
import { Fragment } from 'react';

import '../../assets/css/Navbar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiMenu } from 'react-icons/fi';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { URLBASE } from '../../utils/domain';


const Header = () => {

    const autenticado = useSelector(state => state.autenticacion.autenticado);
    const usuario = useSelector(state => state.autenticacion.usuario)

    const { imgProfile, name } = usuario

    const rol = localStorage.getItem('rol')
    const id = localStorage.getItem('id')

    return (
        <Fragment>

            <header className="nav-header fixed-top position-sticky p-0">
                <nav className="navb navbar navbar-expand-lg p-0">

                    <button className="navbar-toggler navb-button" type="button" data-toggle="collapse" data-target="#header-collapse" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <FiMenu color="white" size={34} />
                    </button>
                    
                    <a href="/" className="logo"></a>
                    <div className="collapse row justify-content-end enlaces navbar-collapse" id="header-collapse">
                    
                        <ul className="nav-ul navbar-nav align-items-center pl-auto">
                            {autenticado ?
                                <>



                                    {rol === 'ROLE_PROVIDER' ?
                                        <>
                                            
                                            <li className="nav-li nav-item">
                                                <Link to={'/productos'} className="nav-a">Productos</Link>
                                            </li>
                                            <li className="nav-li nav-item active">
                                                <Link to={'/publicaciones'} className="nav-a">Blog</Link>
                                            </li>
                                            <li className="nav-li nav-item">
                                                <Link to={'/graficos'} className="nav-a">Panel de Ventas</Link>
                                            </li>
                                        </>
                                        :
                                        <>
                                            <li className="nav-li nav-item">
                                                <Link to={'/productos'} className="nav-a">Productos</Link>
                                            </li>
                                            
                                            <li className="nav-li nav-item active">
                                                <Link to={'/publicaciones'} className="nav-a">Blog</Link>
                                            </li>
                                            <li className="nav-li nav-item">
                                                <Link to={'/proveedores'} className="nav-a">¿Quiénes Somos?</Link>
                                            </li>
                                            {/* <li className="nav-li nav-item">
                                                <Link to={'/carrito'} className="nav-a">Carrito</Link>
                                            </li> */}
                                        </>
                                    }

                                    <li className="mr-5">
                                        <div className="btn-group">
                                            <button type="button" className="btn " data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                                                <img className="img-circle img-perfil" src={`${URLBASE}/api/providers/img/${imgProfile}`} alt='perfil' />
                                                <span className="text-light">{name} <RiArrowDropRightLine size={34} /> </span>
                                            </button>
                                            <div className="dropdown-menu position-relative mx-2 dropdown-menu-left">
                                                <button className="dropdown-item disabled" type="button">Configuracion</button>
                                                {rol === "ROLE_PROVIDER" ?
                                                    <Link to={`/proveedores/${id}`} className="dropdown-item" type="button">Editar Perfil</Link>
                                                    : <Link to={`/clientes/${id}`} className="dropdown-item" type="button">Editar Perfil</Link>
                                                }
                                                <Link to={'/Logout'} className="dropdown-item" type="button">Cerrar Sesión</Link>
                                            </div>
                                        </div>
                                    </li>
                                </> :
                                <>
                                    <li className="nav-li nav-item">
                                        <Link to={'/login'} className="nav-a">INICIAR SESIÓN</Link>
                                    </li>
                                    <li className="nav-li nav-item">
                                        <Link to={'/registro'} className="nav-a">REGISTRAR</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </nav>
                <div className="clearfix"></div>
            </header>

        </Fragment>
    );
}

export default Header;