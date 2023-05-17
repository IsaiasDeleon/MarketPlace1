import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm"
import { Fotos } from "../components/fotos";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";
import { Noti } from "../components/Notificaciones";
const URLServer = "http://192.168.100.18:3020/"
const HTTP = axios.create({
    baseURL: "https://badgerautomation.com/MarketPlace/Server/Data.php"
})
export const NewProduct = ({ setMenu, setImagenesArray, imagesArray }) => {
    let id = "New";
    let estrellas = 5;
    const { user } = useContext(AuthContext);
    let idU = user?.id;
    const { onInputChange, nombreIN, descripcionIN, precioIN, precioOfertaIN, stokIN, estadoIN, categoriaIN, marcaIN, CodigoProveedorIN, PesoIN, TempodeEntregaIN, TempoDdeEntregaAgotadoIN } = useForm({
        nombreIN: "",
        descripcionIN: "",
        precioIN: 0,
        precioOfertaIN: 0,
        stokIN: 1,
        estadoIN: 1,
        categoriaIN: "Otros",
        marcaIN: "",
        CodigoProveedorIN: "",
        PesoIN: "0 KG",
        TempodeEntregaIN: "1",
        TempoDdeEntregaAgotadoIN: "1"
    })
    const [check, setCheck] = useState(false)
    const [file, setFile] = useState(null);

    const [notiCarrito, setNotiCarrito] = useState();
    const [activeNoti, setActiveNoti] = useState();

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    }
    function cambios(e) {
        onInputChange(e)
    }
    useEffect(() => {
        setMenu(2);
    }, [])

    function message(mess) {
        setNotiCarrito(`${mess}`);
        setActiveNoti(true)
        setTimeout(() => {
            setActiveNoti(false)
        }, 5000);
    }
    async function save() {
        if (stokIN === 0 || stokIN === undefined) {
            message("Stock")
            return;
        }
        if (descripcionIN === "") {
            message("descripcion")
            return;
        }
        if (precioIN === undefined || precioIN === 0) {
            message("Precio")
            return;
        }
        if (nombreIN === "") {
            message("Nombre")
            return;
        }
        if (TempodeEntregaIN === "") {
            message("TiempoEN")
            return;
        }

        let Images = document.getElementById(`Images`);
        let nombre = [];
        for (let i = 0; i < imagesArray.length; i++) {
            let file = imagesArray[i];
            let formData;
            if (file === undefined) {
                formData = 0;
            } else {
                formData = new FormData();
                formData.set('file', file);
            }
            if (formData !== 0) {
                const response = await axios.post(URLServer + 'Images', formData);
                nombre.push(response.data.filePath);
                // if (nombre.length === imagesArray.length) {
                //     let pdf = document.getElementById(`file${id}`);
                //     let file2 = pdf.files[0];
                //     let formData2;
                //     if (file2 === undefined) {
                //         formData2 = 0;
                //     } else {
                //         formData2 = new FormData();
                //         formData2.set('file', file2);
                //     }
                //     if (formData2 !== 0) {
                //         const response2 = await axios.post(URLServer + 'updatePro', formData2);
                //         let AllData = {
                //             Categoria: categoriaIN,
                //             Estado: estadoIN,
                //             Estatus: "1",
                //             Oferta: check,
                //             Stock: stokIN,
                //             descripcion: descripcionIN,
                //             empresa: idU,
                //             estrellas: estrellas,
                //             img: nombre,
                //             monto: precioIN,
                //             montoOferta: precioOfertaIN,
                //             nombre: nombreIN,
                //             marca: marcaIN,
                //             codigo: CodigoProveedorIN,
                //             peso: PesoIN,
                //             TiempoEn: TempodeEntregaIN,
                //             TiempoEnAg: TempoDdeEntregaAgotadoIN,
                //             PDF: response2?.data?.filePath
                //         }
                //         axios.post(URLServer + "InsertarProducto", AllData).then((response) => {
                //             if (response.data === "Insertado") {
                //                 // setNotiCarrito("ArticuloInsertado");
                //                 // setActiveNoti(true)
                //                 // setTimeout(() => {
                //                 //     setActiveNoti(false)
                //                 // }, 5000);
                //             }
                //         })
                //     } else {
                //         let AllData = {
                //             Categoria: categoriaIN,
                //             Estado: estadoIN,
                //             Estatus: "1",
                //             Oferta: check,
                //             Stock: stokIN,
                //             descripcion: descripcionIN,
                //             empresa: idU,
                //             estrellas: estrellas,
                //             img: nombre,
                //             monto: precioIN,
                //             montoOferta: precioOfertaIN,
                //             nombre: nombreIN,
                //             marca: marcaIN,
                //             codigo: CodigoProveedorIN,
                //             peso: PesoIN,
                //             TiempoEn: TempodeEntregaIN,
                //             TiempoEnAg: TempoDdeEntregaAgotadoIN,
                //             PDF: "N/A"
                //         }
                //         axios.post(URLServer + "InsertarProducto", AllData).then((response) => {
                //             if (response.data === "Insertado") {
                //                 // setNotiCarrito("ArticuloInsertado");
                //                 // setActiveNoti(true)
                //                 // setTimeout(() => {
                //                 //     setActiveNoti(false)
                //                 // }, 5000);
                //             }
                //         })
                //     }
                // }
            } else {
                //TIEne que inculir al menos una foto
            }

        }
        //     

        //     saveOne(formData,{

        //     }
        //    )
    }

    //Imagenes

    const input = document.getElementById("Images")
    const output = document.querySelector("output");
    function deleteImage(index) {
        let val = [...imagesArray];
        val.splice(index, 1);
        setImagenesArray(val)
    }
    function inputChange() {
        const files = input.files;
        console.log(files.length)
        let e = [];
        for (let i = 0; i < files.length; i++) {
            e.push(files[i]);
            if (i === files.length - 1) {
                let val = [];
                val.push(...imagesArray, ...e)
                setImagenesArray(val)
            }
        }

    }
    function inputDivChange(e) {
        console.log("Holaaa")
        e.preventDefault()
        let eF = [];
        const files = e.dataTransfer.files
        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.match("image")) continue;

            eF.push(files[i]);
            if (i === files.length - 1) {
                let val = [];
                val.push(...imagesArray, ...eF)
                setImagenesArray(val)
            }
            //   if (imagesArray.every(image => image.name !== files[i].name))

        }

    }

    return (
        <>
            <div className="d-flex divNewProducto DiseñoMisProductos " >
                <div className="imagenesNewProduct">
                    <div class="input-div" onDrop={(e) => inputDivChange(e)} >
                        <p>Arrastra y suelta tus fotos aquí o <button style={{ "padding": "5px", "background": "#000", "color": "#fff", "borderRadius": "5px" }}>selecciona el archivo</button></p>
                        <input onChange={() => inputChange()} id="Images" type="file" class="file" multiple="multiple" accept="image/jpeg, image/png, image/jpg" />
                    </div>
                    <br />
                    <output>
                        {
                            imagesArray.map((image, index) => (
                                <Fotos key={index} image={image} index={index} deleteImage={deleteImage} />
                            ))
                        }
                    </output>
                </div>
                <div className="DatosNewProduct" >
                    <div className="m-2 newProducto-gridEstrellas">
                        <div></div>
                        <div style={{ "display": "grid", "gridTemplateColumns": "65% 35% " }}>
                            <div >
                                <label style={{ "float": "right" }} className="switch2">
                                    <input type="hidden" value={check} id={`ofertaIN${id}`} />
                                    <input type="checkbox" checked={check} name="ofertaIN" onChange={() => setCheck(!check)} />
                                    <div className="slider2">
                                        <span>Sin oferta</span>
                                        <span>Con oferta</span>
                                    </div>
                                </label>
                            </div>
                            <div className="divEstrellas text-center  ">
                                <h6 className="TitulosMenu">Valoración:</h6>
                                <i style={{ "margin": "2px" }} className={`bi bi-star-fill TitulosMenu ${(estrellas >= 1) ? 'text-warning' : ''}`}></i>
                                <i style={{ "margin": "2px" }} className={`bi bi-star-fill TitulosMenu ${(estrellas >= 2) ? 'text-warning' : ''}`}></i>
                                <i style={{ "margin": "2px" }} className={`bi bi-star-fill TitulosMenu ${(estrellas >= 3) ? 'text-warning' : ''}`}></i>
                                <i style={{ "margin": "2px" }} className={`bi bi-star-fill TitulosMenu ${(estrellas >= 4) ? 'text-warning' : ''}`}></i>
                                <i style={{ "margin": "2px" }} className={`bi bi-star-fill TitulosMenu ${(estrellas >= 5) ? 'text-warning' : ''}`}></i>
                            </div>
                        </div>
                    </div>
                    <div className="m-2 newProducto-PrimerosInput">
                        <div className="form-floating " style={{ "width": "100%" }}>
                            <input id={`nombreIN${id}`} name={`nombreIN`} value={nombreIN} onChange={(e) => cambios(e)} type="text" className="form-control" />
                            <label className='fw-bold'>Nombre del producto:</label>
                        </div>
                        
                        <div className="form-floating " style={{ "width": "100%" }}>
                            <select className="form-select" id={`categoriaIN${id}`} name="categoriaIN" value={categoriaIN} onChange={(e) => cambios(e)} aria-label="Floating label select example">
                                <option value="Celulares">Celulares</option>
                                <option value="Pantallas">Pantallas</option>
                                <option value="Calzado">Calzado</option>
                                <option value="Muebles">Muebles</option>
                                <option value="Otros">Otros</option>
                            </select>
                            <label className='fw-bold'>Categoría del producto:</label>
                        </div>
                       
                        <div className="form-floating ">
                            <select className="form-select" id={`estadoIN${id}`} name="estadoIN" onChange={(e) => cambios(e)} value={estadoIN} aria-label="Floating label select example">
                                <option value="1">Nuevo</option>
                                <option value="2">Usado</option>
                            </select>
                            <label className='fw-bold'>Estado del producto:</label>
                        </div>

                    </div>

                    <div className="m-2" style={{ "display": "grid", "gridTemplateColumns": "100%" }}>
                        <div>
                            <div className="form-floating " style={{ "width": "100%" }}>
                                <textarea style={{ "width": "100%" }} name={`descripcionIN`} id={`descripcionIN${id}`} value={descripcionIN} onChange={(e) => cambios(e)} type="text" className="form-control">
                                </textarea>
                                <label className='fw-bold'>Descripción:</label>
                            </div>
                        </div>

                    </div>
                    <div className="m-2" style={{ "display": "grid", "gridTemplateColumns": "50% 50%" }}>
                        <div className="d-flex">
                            <div className="form-floating col-sm" style={{ "marginRight": "10px" }}>
                                <input name={`precioIN`} id={`precioIN${id}`} value={precioIN} onChange={(e) => cambios(e)} type="Number" min={1} className="form-control " />
                                <label className='fw-bold'>Precio:</label>
                            </div>
                            {
                                check && (
                                    <div className="form-floating col-sm" style={{ "marginLeft": "10px", "marginRight": "10px" }}>
                                        <input name={`precioOfertaIN`} id={`precioOfertaIN${id}`} value={precioOfertaIN} onChange={(e) => cambios(e)} type="Number" min={1} className="form-control " />
                                        <label className='fw-bold'>Precio con oferta:</label>
                                    </div>
                                )
                            }

                        </div>

                        <div className="d-flex">
                            <div className="form-floating col-sm " style={{ "marginLeft": "10px", "marginRight": "10px" }}>
                                <input id={`marcaIN${id}`} name={`marcaIN`} value={marcaIN} onChange={(e) => cambios(e)} type="text" className="form-control" />
                                <label className='fw-bold'>Marca/Fabricante:</label>
                            </div>
                            <div className="form-floating col-sm" style={{ "marginLeft": "10px" }}>
                                <input id={`CodigoProveedorIN${id}`} name={`CodigoProveedorIN`} value={CodigoProveedorIN} onChange={(e) => cambios(e)} type="text" className="form-control" />
                                <label className='fw-bold'>Código del proveedor (SKU/ID):</label>
                            </div>
                        </div>
                    </div>
                    <div className="m-2" style={{ "display": "grid", "gridTemplateColumns": "25% 25% 25% 25%" }}>


                        <div className="form-floating " style={{ "marginRight": "10px" }}>
                            <input id={`PesoIN${id}`} name={`PesoIN`} value={PesoIN} onChange={(e) => cambios(e)} type="text" className="form-control" />
                            <label className='fw-bold'>Peso:</label>
                        </div>

                        <div className="form-floating " style={{ "marginLeft": "10px", "marginRight": "10px" }}>
                            <input id={`TempodeEntregaIN${id}`} name={`TempodeEntregaIN`} value={TempodeEntregaIN} onChange={(e) => cambios(e)} type="text" className="form-control" />
                            <label className='fw-bold'>Tiempo de entrega:</label>
                        </div>

                        <div className="form-floating " style={{ "marginLeft": "10px", "marginRight": "10px" }}>
                            <input id={`TempoDdeEntregaAgotadoIN${id}`} name={`TempoDdeEntregaAgotadoIN`} value={TempoDdeEntregaAgotadoIN} onChange={(e) => cambios(e)} type="text" className="form-control" />
                            <label className='fw-bold'>Tiempo de entrega en caso de agotarse:</label>
                        </div>
                        <div className="form-floating " style={{ "marginLeft": "10px" }}>
                            <input name={`stokIN`} value={stokIN} id={`stokIN${id}`} onChange={(e) => cambios(e)} type="Number" min={1} className="form-control" />
                            <label className='fw-bold'>Stock:</label>
                        </div>
                    </div>
                    <div className="m-2" style={{ "width": "100%" }}>
                        <div className="nuevoProductoGridBTN" >
                            <div></div>
                            <div className="text-center">
                                <h5 style={{ "visibility": "hidden" }} className="TitulosMenu">Stock:</h5>
                                <label htmlFor={`file${id}`} className='btn btn-danger btn-lg'><i className="bi bi-file-earmark-pdf-fill"></i> PDF</label>
                                <input type="file" onChange={handleChange} style={{ "display": "none" }} name="upload" id={`file${id}`} accept="application/pdf" />

                            </div>
                            <div >
                                <h5 style={{ "visibility": "hidden" }} className="TitulosMenu">Stock:</h5>
                                <button onClick={() => save(id)} className='btn btn-primary btn-lg'><i className="bi bi-cloud-download-fill"></i> Guardar</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <Noti notiCarrito={notiCarrito} activeNoti={activeNoti} />
        </>
    )
}