import React from 'react';
import '../../assets/css/Buscador.css';
import { BsSearch } from 'react-icons/bs'

const Buscador = () => {
    return (
        <>
            <div className="contenedor h-100">
                <div className="d-flex justify-content-end h-100">
                    <div className="searchbar ml-4">
                        <input className="search_input" type="text" name="" placeholder="Search..." />
                        <button type="submit" className="search_icon btn"><BsSearch/></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Buscador;