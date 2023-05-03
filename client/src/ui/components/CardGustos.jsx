import { useNavigate } from "react-router";

export const CardGustos = ({ id, img, descripcion, monto, DeleteItemGustos, setClickProducto}) => {
    const navigate = useNavigate();
    function EliminarGusto(id){
        DeleteItemGustos(id)
    }
    function ProductoShow(id) {
        setClickProducto(id)
        navigate('/Producto', {
            replace: true
        })
    }
    return (
        <li>
            <div className="align-items-center FilaCarritoItem d-flex" style={{ "padding": "4px" }}>
                <div >
                    <img onClick={() => ProductoShow(id)} src={`./assets/Art${img}.png`} alt="IMGCompra" className="GustosIMG" />
                </div>
                <div className=" ms-3" style={{ "width": "100%" }}>
                    <p className="text-secondary OpcionesFont" onClick={() => ProductoShow(id)} style={{ "whiteSpace": "normal" }} > {descripcion} </p>
                    <div className="d-flex justify-content-between" style={{ "width": "100%" }}>
                        <h5 className="fw-bold  TitulosMenu">${monto} </h5>
                        <i onClick={() => EliminarGusto(id)} className="bi bi-trash IconoBasura"></i>
                    </div>
                </div>
            </div>
        </li>
    )
}