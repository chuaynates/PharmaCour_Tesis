import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calcularTotalAction } from '../../actions/calcularTotalActions';
import { CulqiProvider, Culqi } from "react-culqi";
import { URLBASE } from '../../utils/domain';
import { realizarPagoAction } from '../../actions/pagosActions';

const ComprarProductoModal = ({ comprarProducto }) => {

    const dispatch = useDispatch()

    const totalPrecio = useSelector(state => state.total.total)
    const client = useSelector(state => state.autenticacion.usuario)    

    const envio = 5.00
    const { id, name, price, image, description, provider } = comprarProducto

    console.log(comprarProducto);

    const [cantidad, guardarCantidad] = useState(1);

    useEffect(() => {
        if (cantidad !== '') {
            dispatch(calcularTotalAction(price, envio, cantidad))
        }
    }, [cantidad, price, dispatch]);

    return (
        <>
            <div className="modal-content">

                <div className="modal-header" style={{ background: '#2fd69a', color: "#fff" }}>
                    <h5 className="modal-title" id={`comprarProductoLabel${id}`}>Comprar producto {name}</h5>
                    <button type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true" className="text-white">&times;</span>
                    </button>
                </div>

                {/* Contenido del modal */}

                <div className="modal-body">
                    <div className="card mb-3">
                        <div className="d-flex justify-content-center">
                            <div className="producto-editar-imagen" style={{
                                backgroundImage: `url(${URLBASE}/api/products/img/${image}`
                            }}>
                            </div>
                            <div style={{ height: "500px" }}>
                                <div className="card-body justify-content-center">

                                    <div className="text-center">
                                        <h3 className="text-center mx-3" style={{ fontFamily: "fantasy" }}>{name}</h3>
                                    </div>
                                    <div className="border border-blue p-3" style={{ width: "500px" }}>
                                        <p>{description}</p>
                                        <hr />
                                        <div className="d-flex justify-content-between my-1">
                                            <h5 className="align-self-center w-100">Precio Unitario:</h5>
                                            <input type="number" disabled className=" text-center align-self-center w-20" value={parseFloat(price).toFixed(2)} />
                                        </div>
                                        <div className="d-flex justify-content-between my-1">
                                            <h5 className="align-self-center w-100">Envio:</h5>
                                            <input type="number" disabled className=" text-center align-self-center w-20" value={parseFloat(envio).toFixed(2)} />
                                        </div>
                                        <div className="d-flex justify-content-between my-1">
                                            <h5 className="align-self-center w-100">Cantidad:</h5>
                                            <input type="number" className=" text-center align-self-center w-20"
                                                value={cantidad} onChange={(e) => guardarCantidad(e.target.value)} />
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between my-1">
                                            <h5 className="align-self-center w-100">Total:</h5>
                                            <input type="number" disabled className="text-center align-self-center w-20"
                                                value={totalPrecio}/>
                                        </div>
                                        <CulqiProvider
                                            publicKey="pk_test_31ptBe5PYXaG89Wa"
                                            amount={totalPrecio}
                                            title={name}
                                            description={description}
                                            onToken={token => {
                                                dispatch(realizarPagoAction(token, totalPrecio, name, provider.name ,provider.phone, provider.address,
                                                    client.name,client.surname, client.id, provider.id, cantidad, price))
                                            }}
                                            onError={error => {
                                                console.error("something bad happened", error);
                                            }}
                                            // Uncomment `options` to see customizations take place
                                            options={{
                                                style: {
                                                    maincolor: "#2fd69a",
                                                    buttontext: "white",
                                                    maintext: "black",
                                                    desctext: "black",
                                                    logo: `${URLBASE}/api/products/img/${image}`
                                                }
                                            }}
                                        >
                                            <div>
                                                <Culqi>
                                                    {({ openCulqi, setAmount, amount }) => {

                                                        return (
                                                            <div>
                                                                {/* <button
                                                                    onClick={() => {
                                                                        setAmount(amount = totalPrecio*100);
                                                                    }} 
                                                                >
                                                                Increase amount by 100</button>*/}
                                                                <button className="btn btn-success" onClick={(e)=>{openCulqi(); setAmount(amount = totalPrecio*100)}}>Realizar pago de {totalPrecio} soles</button>
                                                            </div>
                                                        );
                                                    }}
                                                </Culqi>
                                            </div>
                                        </CulqiProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ComprarProductoModal;