export const CardCarrito = ({id,img,empresa,descripcion,estrellas,monto,DeletItem}) => {
    return (
        <div className="d-flex align-items-center" style={{ "padding": "20px", "width": "100%", "borderBottom": "2px dashed #D7DBDD" }}>
            <div >
                <img src={`./assets/Art${img}.png`} alt="IMGCompra" className="ImgCard2" />
            </div>
            <div className=" ms-3" style={{ "width": "100%" }}>
                <div className="d-flex justify-content-between" style={{ "width": "100%" }}>
                    <div className="col-sm">
                        <h5>Empresa:</h5>
                        <h6 className="text-secondary">{empresa}</h6>
                    </div>
                    <div className="d-flex" style={{ "width": "40%" }}>
                        <div className="col-sm">
                            <h5>Cantidad:</h5>
                            <input type="Number" style={{ "padding": "2px", "width": "50%" }} className="form-control text-center" />
                        </div>
                        <div className="col-sm">
                            <h5>Precio C/U:</h5>
                            <h5 className="fw-bold text-success">${monto} </h5>
                        </div>
                        <div className="col-sm">
                            <h5>Valoración:</h5>
                            <i style={{ "margin": "3px" }} className={`bi bi-star-fill ${(estrellas >= 1)?'text-warning':'' }`}></i>
                            <i style={{ "margin": "3px" }} className={`bi bi-star-fill ${(estrellas >= 2)?'text-warning':'' }`}></i>
                            <i style={{ "margin": "3px" }} className={`bi bi-star-fill ${(estrellas >= 3)?'text-warning':'' }`}></i>
                            <i style={{ "margin": "3px" }} className={`bi bi-star-fill ${(estrellas >= 4)?'text-warning':'' }`}></i>
                            <i style={{ "margin": "3px" }} className={`bi bi-star-fill ${(estrellas >= 5)?'text-warning':'' }`}></i>
                        </div>
                    </div>

                </div>
                <h5>Descripción:</h5>
                <h6 className="text-secondary" >{descripcion}</h6>
                <i style={{ "float": "right", "marginRight": "20px", "fontSize": "30px", "color": "#E63939", "cursor" : "pointer" }} className="bi bi-trash" onClick={()=>{DeletItem(id)}}></i>
            </div>

        </div>
    )
}