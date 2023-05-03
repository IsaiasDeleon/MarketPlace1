import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { Noti } from "../components/Notificaciones";
const URLServer = "http://192.168.100.18:3020/"
export const Producto = ({setIdCard, setIdCard2, clickProducto, setMenu, setClickProducto}) => {
    

    const [imagenes, setImagenes] = useState(`Art${clickProducto}.png`);
    const [onClickImagen, setOnClickImagen] = useState(1);
    const [datosProducto, setDatosProducto] = useState([]);
    const [valueOferta, setValueOferta] = useState(0);
    const [notiCarrito, setNotiCarrito] = useState();
    const [activeNoti, setActiveNoti] = useState();

    const { user } = useContext(AuthContext)
    let idU = user?.id;
    useEffect(() => {
        setMenu(2);
        if(clickProducto == undefined){
            const idProduct = JSON.parse( localStorage.getItem('idProduct') );
            setClickProducto(idProduct)
            
        }
    },[])
    useEffect(() => {
        if(clickProducto !== undefined){
            setImagenes(`Art${clickProducto}.png`);
            axios.post(URLServer + "GetProducto", {"idProduct":clickProducto}).then((response) => {
                setDatosProducto(response.data)
                console.log(response.data)
                setValueOferta(response.data[0]?.monto - 1 )
                
            })
        }
    },[clickProducto]);
    function createMail(){
        axios.post(URLServer+"mailNode",{"idProduct":clickProducto, "idUser": idU, "Oferta" : valueOferta }).then((response) => {
             //Enviamos el mensaje a las notificaciones para mostrar la alerta al usuario
             setNotiCarrito(response.data)
             setActiveNoti(true)
             setTimeout(() => {
                 setActiveNoti(false)
             }, 4000);
        })
    }
    const onInputChange2 = ({ target }) => {
        const { name, value } = target;
        switch (name) {
            case 'Oferta':
                setValueOferta(value);
                break;
           
        }
    }
       
    function CreatePDF(){
        axios.post(URLServer+"GeneratePDF",{"idProduct":clickProducto, "idUser":idU}).then((response) => {
            let url = response.data;
             //Enviamos el mensaje a las notificaciones para mostrar la alerta al usuario
             setNotiCarrito(response.data)
             setActiveNoti(true)
             setTimeout(() => {
                 setActiveNoti(false)
             }, 4000);
            // var a = document.createElement('a');
            // var linkText = document.createTextNode("my title text");
            // a.appendChild(linkText);
            // a.title = "my title text";
            // a.href = "http://localhost:3000/client/src/CotizacionesUnitarias/Cotizacion.pdf";
            // a.download = 'file.pdf';
            // a.dispatchEvent(new MouseEvent('click'));
            // document.body.appendChild(a);
            // var link = document.createElement('a');
            //     link.style.cssText = 'color:red;background-color:yellow; width:100%; z-index:10';

            //     link.href = url;
            //     link.download = 'file.pdf';
                //link.dispatchEvent(new MouseEvent('click'));
        })
    }
    
    const handleDownload = () => {
        axios.post(URLServer+'download',{
            pdf:datosProducto?.[0]?.PDF
        }, {
            responseType: 'blob'
        }).then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
    
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'archivo.pdf');
          
          document.body.appendChild(link);
          
          link.click();
        });
      }
    return (
        <>
         <div className="divProducto">
           <div className="divGrid">
                <div className="text-center">
                    <div  style={{"display": "flex","flexDirection": "column", "position":"absolute", "zIndex":"1"}}>
                        <img src={`./assets/Art${clickProducto}.png`} onClick={(e) => {setImagenes(`Art${clickProducto}.png`); setOnClickImagen(1)}} alt="IMGCompra" className={`m-1 imagenesProductos ${onClickImagen === 1 ? "BorderImagenSelect":"" }`}  />
                        <img src={`./assets/Art${clickProducto}-1.jpg`} onClick={(e) => {setImagenes(`Art${clickProducto}-1.jpg`); setOnClickImagen(2)}} alt="IMGCompra" className={`m-1 imagenesProductos ${onClickImagen === 2 ? "BorderImagenSelect":"" }`}  />
                        <img src={`./assets/Art${clickProducto}-2.jpg`} onClick={(e) => {setImagenes(`Art${clickProducto}-2.jpg`); setOnClickImagen(3)}} alt="IMGCompra" className={`m-1 imagenesProductos ${onClickImagen === 3 ? "BorderImagenSelect":"" }`}  />
                        <img src={`./assets/Art${clickProducto}-3.jpg`} onClick={(e) => {setImagenes(`Art${clickProducto}-3.jpg`); setOnClickImagen(4)}} alt="IMGCompra" className={`m-1 imagenesProductos ${onClickImagen ===4 ? "BorderImagenSelect":"" }`}  />
                    </div>
                    <img src={`./assets/${imagenes}`} alt="IMGCompra" className="ProductoImg" />
                </div>
                <div className="mt-2">
                    <h4>{datosProducto?.[0]?.descripcion}</h4>
                    <div className="text-end">
                        <i style={{ "margin": "3px" }} className={`bi bi-star-fill h4 ${(datosProducto?.[0]?.estrellas >= 1) ? 'text-warning' : ''}`}></i>
                        <i style={{ "margin": "3px" }} className={`bi bi-star-fill h4 ${(datosProducto?.[0]?.estrellas >= 2) ? 'text-warning' : ''}`}></i>
                        <i style={{ "margin": "3px" }} className={`bi bi-star-fill h4 ${(datosProducto?.[0]?.estrellas >= 3) ? 'text-warning' : ''}`}></i>
                        <i style={{ "margin": "3px" }} className={`bi bi-star-fill h4 ${(datosProducto?.[0]?.estrellas >= 4) ? 'text-warning' : ''}`}></i>
                        <i style={{ "margin": "3px" }} className={`bi bi-star-fill h4 ${(datosProducto?.[0]?.estrellas >= 5) ? 'text-warning' : ''}`}></i>
                    </div>
                    <hr/>
                    <h6>Marca/Fabricante: <b className="text-secondary"> {datosProducto?.[0]?.Marca}</b></h6>
                    <h6>Código del proveedor (SKU/ID): <b className="text-secondary"> {datosProducto?.[0]?.CodigoProveedor}</b></h6>
                    <h6>Peso aproximado:<b className="text-secondary"> {datosProducto?.[0]?.Peso}</b></h6>
                    <h6>Estado:<b className={`${(datosProducto?.[0]?.Estado === "1")?"text-success":"text-primary"}`}> {(datosProducto?.[0]?.Estado === "1")?"Nuevo":"Semi-nuevo" }</b></h6>
                    <h6>Estatus:<b className="text-secondary"> Disponible</b></h6>
                    <h6>Tiempo de entrega: <b className="text-secondary"> {datosProducto?.[0]?.TempodeEntrega} días habiles</b></h6>
                    <h6>Tiempo de entrega en caso de agotarse: <b className="text-secondary">{datosProducto?.[0]?.TempoDdeEntregaAgotado} días habiles</b></h6>
                    <h6>Ficha técnica: <b onClick={() => handleDownload()} className="text-danger" style={{"textDecoration":"underline"}}> {datosProducto?.[0]?.PDF}</b></h6>
                    <hr/>
                    <div className="contenedorBotones">
                        <div>
                            <h6>Precio:</h6>
                            <h4 className="fw-bold">${datosProducto?.[0]?.monto} MXN</h4>
                        </div>
                        <div className="text-end">
                            <button className="btn btn-success m-1">¡Cómpralo ahora!</button>
                            <button className="btn btn-primary m-1"  data-bs-toggle="modal" data-bs-target="#exampleModal">Hacer oferta</button>
                            <button className="btn btn-dark m-1" onClick={(e) => {setIdCard2(clickProducto)}}>Agregar al carrito de compras</button>
                            <button className="btn btn-secondary m-1" onClick={(e) => { setIdCard(clickProducto)}}>Agregar a lista de favoritos</button>
                            <button className="btn btn-secondary m-1" onClick={() => CreatePDF()}>Cotizar</button>
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
          
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Ofertar por el producto</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <label>Oferta:</label>
                    <input name="Oferta" value={valueOferta} onChange={(e) => onInputChange2(e)}  className="form-control" type="number"/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" onClick={() => createMail()} className="btn btn-primary" data-bs-dismiss="modal">Ofertar</button>
                </div>
                </div>
            </div>
            </div>
           {/* <a href={`https://isc.isaiasdeleon.robo-tics-slp.net/resources/Cotizacion.pdf`} download={"file.pdf"}>Descargar</a> */}
         </div>
         <Noti notiCarrito={notiCarrito} activeNoti={activeNoti} />
        </>
    )
}