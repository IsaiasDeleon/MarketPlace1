import { useEffect, useState } from "react"
import { useForm } from "../../hooks/useForm"

export const CardMisProductos = ({ id, img, descripcion, estrellas, monto,montoOferta, Stock, Estado, Estatus, nombre = "", Categoria, Oferta, saveOne, Fecha, empresa, Marca, CodigoProveedor, Peso, TempodeEntrega, TempoDdeEntregaAgotado,PDF }) => {
    const { onInputChange, nombreIN, descripcionIN, precioIN, precioOfertaIN, stokIN, estadoIN, categoriaIN, marcaIN, CodigoProveedorIN, PesoIN, TempodeEntregaIN, TempoDdeEntregaAgotadoIN } = useForm({
        nombreIN: nombre,
        descripcionIN: descripcion,
        precioIN: monto,
        precioOfertaIN: montoOferta,
        stokIN: Stock,
        estadoIN: Estado,
        categoriaIN: Categoria,
        marcaIN: Marca,
        CodigoProveedorIN:CodigoProveedor,
        PesoIN:Peso,
        TempodeEntregaIN:TempodeEntrega,
        TempoDdeEntregaAgotadoIN: TempoDdeEntregaAgotado
    })
    const [check, setCheck] = useState(Oferta)
    const [file, setFile] = useState(null);

    const handleChange = (event) => {
    setFile(event.target.files[0]);
    }
    function cambios(e) {
        onInputChange(e)
    }
    function save(id){
        let pdf = document.getElementById(`file${id}`);
        let file = pdf.files[0];
        let formData;
        if(file === undefined){
            formData = 0;
        }else{
            formData = new FormData();
            formData.set('file', file);
        }
        
        saveOne(formData,{
            Categoria:categoriaIN,
            Estado:estadoIN,
            Estatus:"1",
            Fecha,
            Oferta:check,
            Stock:stokIN,
            descripcion:descripcionIN,
            empresa,
            estrellas:estrellas,
            id,
            img,
            monto:precioIN,
            montoOferta: precioOfertaIN,
            nombre:nombreIN,
            marca:marcaIN,
            codigo: CodigoProveedorIN,
            peso: PesoIN,
            TiempoEn: TempodeEntregaIN,
            TiempoEnAg:TempoDdeEntregaAgotadoIN,
            PDF
        }
       )
        
    }
    return (
        <div className="d-flex align-items-center DiseñoMisProductos " >
            <div >
                <img src={`./assets/Art${img}.png`} alt="IMGCompra" className="ImgCard2" />
            </div>
            <div className=" ms-3" style={{ "width": "100%" }}>
                <div className="m-2" style={{ "display": "grid", "gridTemplateColumns": "25% 2% 25% 2% 45%" }}>
                    <div className="form-floating " style={{ "width": "100%" }}>
                        <input id={`nombreIN${id}`} name={`nombreIN`} value={nombreIN} onChange={(e) => cambios(e)} type="text" className="form-control" />
                        <label className='fw-bold'>Nombre del producto:</label>
                    </div>
                    <div></div>
                    <div className="form-floating " style={{ "width": "100%" }}>
                        <select className="form-select"  id={`categoriaIN${id}`} name="categoriaIN" value={categoriaIN} onChange={(e) => cambios(e)} aria-label="Floating label select example">
                            <option value="Celulares">Celulares</option>
                            <option value="Pantallas">Pantallas</option>
                            <option value="Calzado">Calzado</option>
                            <option value="Muebles">Muebles</option>
                            <option value="Otros">Otros</option>
                        </select>
                        <label className='fw-bold'>Categoría del producto:</label>
                    </div>
                    <div>
                    </div>
                    <div style={{ "display": "grid", "gridTemplateColumns": "35% 5% 60%" }}>
                        <div className="form-floating ">
                            <select className="form-select" id={`estadoIN${id}`} name="estadoIN" onChange={(e) => cambios(e)} value={estadoIN} aria-label="Floating label select example">
                                <option value="1">Nuevo</option>
                                <option value="2">Usado</option>
                            </select>
                            <label className='fw-bold'>Estado del producto:</label>
                        </div>
                        <div></div>
                        <div>
                            <label className="switch2">
                                <input type="hidden" value={check} id={`ofertaIN${id}`} />
                                <input type="checkbox"checked={check}  name="ofertaIN" onChange={() => setCheck(!check)} />
                                <div className="slider2">
                                    <span>Sin oferta</span>
                                    <span>Con oferta</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="m-2" style={{ "display": "grid", "gridTemplateColumns": "58% 2% 40%" }}>
                    <div>
                        <div className="form-floating " style={{ "width": "100%" }}>
                            <textarea style={{ "width": "100%" }} name={`descripcionIN`} id={`descripcionIN${id}`} value={descripcionIN} onChange={(e) => cambios(e)} type="text" className="form-control">
                            </textarea>
                            <label className='fw-bold'>Descripción:</label>
                        </div>
                    </div>
                    <div></div>
                    <div style={{ "display": "grid", "gridTemplateColumns": "60% 40%" }}>
                        <div className="d-flex">
                            <div className="form-floating col-sm" style={{ "marginRight": "10px" }}>
                                <input name={`precioIN`} id={`precioIN${id}`} value={precioIN} onChange={(e) => cambios(e)} type="Number" min={1} className="form-control " />
                                <label className='fw-bold'>Precio:</label>
                            </div>
                            <div className="form-floating col-sm" style={{ "marginLeft": "10px" }}>
                                <input name={`precioOfertaIN`} id={`precioOfertaIN${id}`} value={precioOfertaIN} onChange={(e) => cambios(e)} type="Number" min={1} className="form-control " />
                                <label className='fw-bold'>Precio con oferta:</label>
                            </div>
                        </div>
                        <div className="divEstrellas text-center">
                            <h6 className="TitulosMenu">Valoración:</h6>
                            <i style={{ "margin": "2px" }} className={`bi bi-star-fill TitulosMenu ${(estrellas >= 1) ? 'text-warning' : ''}`}></i>
                            <i style={{ "margin": "2px" }} className={`bi bi-star-fill TitulosMenu ${(estrellas >= 2) ? 'text-warning' : ''}`}></i>
                            <i style={{ "margin": "2px" }} className={`bi bi-star-fill TitulosMenu ${(estrellas >= 3) ? 'text-warning' : ''}`}></i>
                            <i style={{ "margin": "2px" }} className={`bi bi-star-fill TitulosMenu ${(estrellas >= 4) ? 'text-warning' : ''}`}></i>
                            <i style={{ "margin": "2px" }} className={`bi bi-star-fill TitulosMenu ${(estrellas >= 5) ? 'text-warning' : ''}`}></i>
                        </div>
                    </div>
                </div>
                <div className="m-2"style={{ "display": "grid", "gridTemplateColumns": "auto 2% auto 2% 7% 2% 20% 2% auto" }}>
                    <div className="form-floating " style={{ "width": "100%" }}>
                        <input id={`marcaIN${id}`} name={`marcaIN`} value={marcaIN} onChange={(e) => cambios(e)} type="text" className="form-control" />
                        <label className='fw-bold'>Marca/Fabricante:</label>
                    </div>
                    <div></div>
                    <div className="form-floating " style={{ "width": "100%" }}>
                        <input id={`CodigoProveedorIN${id}`} name={`CodigoProveedorIN`} value={CodigoProveedorIN} onChange={(e) => cambios(e)} type="text" className="form-control" />
                        <label className='fw-bold'>Código del proveedor (SKU/ID):</label>
                    </div>
                    <div></div>
                    <div className="form-floating " style={{ "width": "100%" }}>
                        <input id={`PesoIN${id}`} name={`PesoIN`} value={PesoIN} onChange={(e) => cambios(e)} type="text" className="form-control" />
                        <label className='fw-bold'>Peso:</label>
                    </div>
                    <div></div>
                    <div className="form-floating " style={{ "width": "100%" }}>
                        <input id={`TempodeEntregaIN${id}`} name={`TempodeEntregaIN`} value={TempodeEntregaIN} onChange={(e) => cambios(e)} type="text" className="form-control" />
                        <label className='fw-bold'>Tiempo de entrega:</label>
                    </div>
                    <div></div>
                    <div className="form-floating " style={{ "width": "100%" }}>
                        <input id={`TempoDdeEntregaAgotadoIN${id}`} name={`TempoDdeEntregaAgotadoIN`} value={TempoDdeEntregaAgotadoIN} onChange={(e) => cambios(e)} type="text" className="form-control" />
                        <label className='fw-bold'>Tiempo de entrega en caso de agotarse:</label>
                    </div>
                </div>
                <div className="m-2" style={{ "width": "100%" }}>
                    <div style={{ "display": "grid", "gridTemplateColumns": "10% 60% 15% 15%" }}>
                        <div className="form-floating " style={{ "width": "100%" }}>
                            <input name={`stokIN`} value={stokIN} id={`stokIN${id}`} onChange={(e) => cambios(e)} type="Number" min={1}  className="form-control" />
                            <label className='fw-bold'>Stock:</label>
                        </div>
                       
                        <div></div>
                        <div className="text-center">
                            <h5 style={{ "visibility": "hidden" }} className="TitulosMenu">Stock:</h5>
                            <label htmlFor={`file${id}`} className='btn btn-danger'><i className="bi bi-file-earmark-pdf-fill"></i> PDF</label>
                            <input type="file" onChange={handleChange} style={{"display":"none"}} name="upload" id={`file${id}`} accept="application/pdf"/>
                            
                        </div>
                        <div >
                            <h5 style={{ "visibility": "hidden" }} className="TitulosMenu">Stock:</h5>
                            <button onClick={() => save(id)} className='btn btn-primary'><i className="bi bi-cloud-download-fill"></i> Guardar</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}