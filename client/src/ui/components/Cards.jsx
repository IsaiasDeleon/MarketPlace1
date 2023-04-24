import { Link, useNavigate } from "react-router-dom";

export const Card = ({ id, img, empresa, descripcion, estrellas, monto, setIdCard, Estado, setClickProducto }) => {
    const navigate = useNavigate();
    function Gusto(id) {
        setIdCard(id);
    }
    
    function ProductoShow(id) {
        setClickProducto(id)
        navigate('/Producto', {
            replace: true
        })
    }
    return (
        <div className="card contenedorC">
            <h6 style={{"position":"absolute","left":"10px","top":"10px"}} className={`fw-bold ${Estado == "1" ? "text-success" :"text-primary"} `}>{Estado == "1" ? "Nuevo" : "Semi-Nuevo"}</h6>
            <div className="text-center divImgMT">
                    <img src={`./assets/Art${img}.png`} onClick={() => ProductoShow(id)} alt="IMGCompra" className="ImgCard" />
            </div>
            <div className="content-txt TextCard">
                <div className="TextCardSeccion" >
                    <h6 className="text-secondary">{empresa}</h6>
                    <div className="text-end">
                        <i style={{ "margin": "3px" }} className={`bi bi-star-fill ${(estrellas >= 1) ? 'text-warning' : ''}`}></i>
                        <i style={{ "margin": "3px" }} className={`bi bi-star-fill ${(estrellas >= 2) ? 'text-warning' : ''}`}></i>
                        <i style={{ "margin": "3px" }} className={`bi bi-star-fill ${(estrellas >= 3) ? 'text-warning' : ''}`}></i>
                        <i style={{ "margin": "3px" }} className={`bi bi-star-fill ${(estrellas >= 4) ? 'text-warning' : ''}`}></i>
                        <i style={{ "margin": "3px" }} className={`bi bi-star-fill ${(estrellas >= 5) ? 'text-warning' : ''}`}></i>
                    </div>
                </div>
                <h6 onClick={() => ProductoShow(id)} style={{"cursor":"pointer"}}>{descripcion}</h6>
                
                <div className="d-flex justify-content-between">
                    <h6 >${monto} </h6>
                    <div className="text-center text-white IconTextCard">
                        <button onClick={() => { Gusto(id)}} className="btn btn-danger" style={{ "float": "right", "borderRadius": "40px" }}><i class="bi bi-heart-fill"></i></button>
                        {/* <button onClick={() => { Carrito(id) }} className="btnCarrito">
                            <i className="bi bi-cart-fill"></i> 
                                Agregar
                        </button> */}

                    </div>

                </div>

            </div>
        </div>
    )
}