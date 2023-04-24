export const CardHorizontal = ({ id, img, empresa, descripcion, estrellas, monto, setIdCard, Estado }) => {
    function Gusto(id) {
        setIdCard(id);
    }
    return (
        <div className="d-flex align-items-center FilaCarritoItem" >
            
            <div >
            <h5 style={{"float":"left"}} className={`fw-bold ${Estado == "1" ? "text-success" :"text-primary"} `}>{Estado == "1" ? "Nuevo" : "Semi-Nuevo"}</h5>
                <img src={`./assets/Art${img}.png`} alt="IMGCompra" className="ImgCard2" />
            </div>
            <div className=" ms-3" style={{ "width": "100%" }}>
                <div className="d-flex justify-content-between" style={{ "width": "100%" }}>
                    <h6 className="text-secondary TitulosMenu">{empresa}</h6>
                    <div className="d-flex ContenedorCantidadDineroEstrellas">
                        <div className="col-sm w100 AcomodoText">
                            <h5 className="fw-bold  TitulosMenu">${monto} </h5>
                        </div>
                        <div className="col-sm w100 divEstrellas">
                            <i style={{ "margin": "3px" }} className={`bi bi-star-fill TitulosMenu ${(estrellas >= 1) ? 'text-warning' : ''}`}></i>
                            <i style={{ "margin": "3px" }} className={`bi bi-star-fill TitulosMenu ${(estrellas >= 2) ? 'text-warning' : ''}`}></i>
                            <i style={{ "margin": "3px" }} className={`bi bi-star-fill TitulosMenu ${(estrellas >= 3) ? 'text-warning' : ''}`}></i>
                            <i style={{ "margin": "3px" }} className={`bi bi-star-fill TitulosMenu ${(estrellas >= 4) ? 'text-warning' : ''}`}></i>
                            <i style={{ "margin": "3px" }} className={`bi bi-star-fill TitulosMenu ${(estrellas >= 5) ? 'text-warning' : ''}`}></i>
                        </div>
                    </div>
                </div>
                <h5 className="TitulosMenu">Descripción:</h5>
                <h6 className="text-secondary OpcionesFont" >{descripcion}</h6>
                <div className="d-flex justify-content-end">
                    <div className="d-flex justify-content-around" style={{ "width": "20%" }}>
                        <button onClick={() => { Gusto(id)}} className="btn btn-danger" style={{ "float": "right", "borderRadius": "40px" }}><i class="bi bi-heart-fill"></i></button>
                    </div>
                
                </div>
            </div>
        </div>
    )
}