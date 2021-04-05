import React from 'react';

const TopProductos = () => {
    return (
        <div className="position-relative">
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <img src='https://swissbrothers.com/739-home_default/magnesol-33-sobrecitos-x-2g.jpg' height='60px' className='px-2' alt='' />
                    <span className="badge badge-primary badge-pill">Magnesol</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Tu mejor opcion
                <span className="badge badge-primary badge-pill">2</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                   Al mejor Precio  
                <span className="badge badge-primary badge-pill">1</span>
                </li>
            </ul>
        </div>
    );
}

export default TopProductos;