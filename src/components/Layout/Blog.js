import React from "react";
import "../../assets/css/Blog.css";

const Informacion = ({ pagina }) => {
  return (
    <>
      <div className="titulo-navbar2 justify-content-center titulo-informacion">
        <div className="">
            <h1 className="text-center text-titulo font-weight-bold"> {pagina} </h1>
        </div>
      </div>
      <div className="titulo-info rounded-bottom"></div>
    </>
  );
};

export default Informacion;
