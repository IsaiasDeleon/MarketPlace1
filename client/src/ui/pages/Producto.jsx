import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";

export const Producto = ({setIdCard, setIdCard2}) => {
    const [imagenes, setImagenes] = useState('Art1.png');
    const [onClickImagen, setOnClickImagen] = useState(1);
    
    let estrellas = 5;
    const { user } = useContext(AuthContext)
    let idU = user?.id;
    
    return (
        <>
         <div style={{ "top": "60px","width":"100%", "height":"100%", "position":"absolute", "padding":"50px 150px"}}>
           <div style={{"display":"grid", "gridTemplateColumns":"40% 60%"}}>
                <div className="text-center">
                    <div  style={{"display": "flex","flexDirection": "column", "position":"absolute"}}>
                        <img src={`./assets/Art1.png`} onClick={(e) => {setImagenes("Art1.png"); setOnClickImagen(1)}} alt="IMGCompra" className={`m-1 ${onClickImagen === 1 ? "BorderImagenSelect":"" }`} style={{"width":"70px","height":"50px"}} />
                        <img src={`./assets/Art1-1.jpg`} onClick={(e) => {setImagenes("Art1-1.jpg"); setOnClickImagen(2)}} alt="IMGCompra" className={`m-1 ${onClickImagen === 2 ? "BorderImagenSelect":"" }`} style={{"width":"70px","height":"50px" }} />
                        <img src={`./assets/Art1-2.jpg`} onClick={(e) => {setImagenes("Art1-2.jpg"); setOnClickImagen(3)}} alt="IMGCompra" className={`m-1 ${onClickImagen === 3 ? "BorderImagenSelect":"" }`} style={{"width":"70px", "height":"50px"}} />
                        <img src={`./assets/Art1-3.jpg`} onClick={(e) => {setImagenes("Art1-3.jpg"); setOnClickImagen(4)}} alt="IMGCompra" className={`m-1 ${onClickImagen ===4 ? "BorderImagenSelect":"" }`} style={{"width":"70px", "height":"50px"}} />
                    </div>
                    <img src={`./assets/${imagenes}`} alt="IMGCompra" className="ProductoImg" />
                </div>
                <div>
                    <h4>Tenis Puma Junior Unisex St Activate Zapato Deportivo Comodo</h4>
                    <div className="text-end">
                        <i style={{ "margin": "3px" }} className={`bi bi-star-fill h4 ${(estrellas >= 1) ? 'text-warning' : ''}`}></i>
                        <i style={{ "margin": "3px" }} className={`bi bi-star-fill h4 ${(estrellas >= 2) ? 'text-warning' : ''}`}></i>
                        <i style={{ "margin": "3px" }} className={`bi bi-star-fill h4 ${(estrellas >= 3) ? 'text-warning' : ''}`}></i>
                        <i style={{ "margin": "3px" }} className={`bi bi-star-fill h4 ${(estrellas >= 4) ? 'text-warning' : ''}`}></i>
                        <i style={{ "margin": "3px" }} className={`bi bi-star-fill h4 ${(estrellas >= 5) ? 'text-warning' : ''}`}></i>
                    </div>
                    <hr/>
                    <h6>Marca/Fabricante: <b className="text-primary"> FANUC</b></h6>
                    <h6>Código del proveedor (SKU/ID): <b className="text-primary"> A60L-0001-0290-LM20</b></h6>
                    <h6>Peso aproximado:<b className="text-primary"> 0.01 KG</b></h6>
                    <h6>Estado:<b className="text-success"> Nuevo</b></h6>
                    <h6>Estatus:<b className="text-primary"> Disponible</b></h6>
                    <h6>Tiempo de entrega: <b className="text-primary"> 14 días habiles</b></h6>
                    <h6>Tiempo de entrega en caso de agotarse: <b className="text-primary">31 días habiles</b></h6>
                    <h6>Ficha técnica: <b className="text-danger" style={{"textDecoration":"underline"}}> PDF</b></h6>
                    <hr/>
                    <div style={{"display":"grid", "gridTemplateColumns":"40% 60%"}}>
                        <div>
                            <h6>Precio:</h6>
                            <h4 className="fw-bold">$2000.00 MXN</h4>
                        </div>
                        <div className="text-end">
                            <button className="btn btn-success m-2">¡Cómpralo ahora!</button>
                            <button className="btn btn-primary m-2">Hacer oferta</button>
                            <button className="btn btn-dark m-2" onClick={(e) => {setIdCard2(3)}}>Agregar al carrito de compras</button>
                            <button className="btn btn-secondary m-2" onClick={(e) => { setIdCard(3)}}>Agregar a lista de favoritos</button>
                            <button className="btn btn-secondary m-2">Cotizar</button>
                        </div>
                        
                    </div>
                    <div style={{"background":"#EAEDED", "borderRadius":"10px"}}>
                            <div style={{"padding":"20px"}}>
                                <h6 style={{"fontWeight":"400"}}><b>Respira tranquilo.</b> Se aceptan devoluciones.</h6>
                                <h6 style={{"fontWeight":"400"}}><b >La gente está viendo este artículo.</b> 5 personas agregaron esto a su lista de favoritos.</h6>
                            </div>
                        </div>
                    <hr/>
                  
                    
                </div>
           </div>
         </div>
            
        </>
    )
}