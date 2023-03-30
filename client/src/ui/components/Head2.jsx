import { Link } from "react-router-dom"

export const Head2 = ({  numArticulos }) => {
    
    return (
        <>
            <div className="text-center contenedorH2">
                <div className="d-flex justify-content-around ContendorHeight">
                    <div className="d-flex justify-content-around ContenedorWidthH">
                        {/* <i className="bi bi-list menuShow" onClick={() => { onSubmitShowMenu() }}></i> */}
                        <Link to={"/Inicio"} className="nav-link fw-bold TextShadowH HeadEnlaces "  >Inicio</Link>
                        {/* <a className="nav-link fw-bold TextSinShadowH HeadEnlaces paginasHead"  >Productos nuevos</a> */}
                        <div className="input-group justify-content-center BuscadorH" >
                            <input type="text" className="form-control align-middle" placeholder="Buscar producto..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2"><i className="bi bi-search"></i></button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around InconosRight">
                        <div>
                            <a className="nav-link" ><i className="bi bi-bell h5"></i>
                                <div className="text-center Notificaciones"><p style={{ "marginTop": "-3px", "color": "#fff" }} >1</p></div></a>
                        </div>
                        <div>
                            <Link to={"/Carrito"} className="nav-link" > <i className="bi bi-cart h5"></i>
                                <div className="text-center Notificaciones"><p style={{ "marginTop": "-3px", "color": "#fff" }} > {numArticulos} </p></div></Link>

                        </div>
                        <div style={{ "alignItems": "center" }} className="d-flex">
                            <div className="dropdown">
                                <div className=" col-2 dropdown-toggle UserIcon" data-bs-toggle="dropdown" aria-expanded="false"></div>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><Link to={"/Perfil"} className="dropdown-item" >Editar perfil</Link></li>
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