export const Head = ({setEstadoMenu}) => {
    const onSubmitShowMenu = () =>{
        setEstadoMenu(true)
    }
    return (
        <>
            <div className="text-center contenedorH">
                <div className="d-flex justify-content-around ContendorHeight">
                    <div className="d-flex justify-content-around ContenedorWidthH">
                        <i className="bi bi-list menuShow" onClick={()=> { onSubmitShowMenu()}  }></i>
                        <a className="nav-link fw-bold TextShadowH HeadEnlaces paginasHead"  >Inicio</a>
                        <a className="nav-link fw-bold TextSinShadowH HeadEnlaces paginasHead"  >Productos nuevos</a>
                        <div className="input-group justify-content-center BuscadorH" >
                            <input type="text" className="form-control align-middle" placeholder="Buscar producto..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2"><i className="bi bi-search"></i></button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around InconosRight">
                        <div>
                            <a className="nav-link" ><i className="bi bi-bell h5"></i>
                                <div  className="text-center Notificaciones"><p style={{ "marginTop": "-3px", "color": "#fff" }} >1</p></div></a>
                        </div>
                        <div>
                            <a className="nav-link" > <i className="bi bi-bag h5"></i>
                                <div className="text-center Notificaciones"><p style={{ "marginTop": "-3px", "color": "#fff" }} >7</p></div></a>
                        </div>
                        <div style={{ "alignItems": "center" }} className="d-flex">
                            <div className="dropdown">
                            <div className=" col-2 dropdown-toggle UserIcon" data-bs-toggle="dropdown" aria-expanded="false"></div>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a className="dropdown-item" >Cambiar contraseña</a></li>
                                    <li><a className="dropdown-item" >Cerrar sesion</a></li>
                                    
                                </ul>
                            </div>
                           
                        </div>
                    </div>
                </div>
                <hr style={{ "width": "95%", "margin": "0", "marginLeft": "2.5%" }} />
            </div>
        </>
    )
}