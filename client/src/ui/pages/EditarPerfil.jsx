import { useEffect, useState } from 'react';
import axios from 'axios';

import { useForm } from "../../hooks/useForm"
const URLServer = "http://192.168.100.22:3020/"

export const EditarPerfil = () => {

    const[valuesEstado, setValueEstado] = useState([]);
    const [valueMunicipio, setValueMunicipio] = useState([]);
    //Obtenemos los estados 
    function getEstados(){
        axios.get(URLServer + "getEstado").then((response) => {
           setValueEstado(response.data);
        })
    }
    function getMunicipios(){
        axios.post(URLServer + "getMunicipio",{"Estado":Estado}).then((response) => {
            setValueMunicipio(response.data)
        })
    }
    useEffect(()=>{
        getEstados()
        getMunicipios()
    },[])
    function changeEstado(e) {
        onInputChange(e);
        getMunicipios()
    }
    const { onInputChange, Nombre, Telefono, Password, Pais, Estado } = useForm({
        Nombre: "Yo",
        Telefono:"4442389214",
        Password:123,
        Pais:1,
        Estado:24
    })
    return (
        <>
            <div className="cardPerfil contenedorCarrito" style={{ "display": "grid", "gridTemplateColumns": "25% 50% 25%", "background": "#F7F7F7", "height": "calc(100% - 60px)" }}>
                <div className="PrimeraSeccion text-center" style={{ "margin": "20px", "background": "#fff", "borderRadius": "30px", "boxShadow": " 1px 1px 2px 2px rgba(0, 0, 0, 0.2)", "maxHeight": "95%", "overflowX": "auto" }} >
                    <div className="m-4">
                        <img src={`./assets/IconUsuario.png`} style={{ "borderRadius": "20px" }} alt="IMGUsuario" className="ImgCard" />
                        <h4 className="m-3">Uriel Isaías De León Salazar</h4>
                        <hr style={{ "width": "95%", "margin": "0", "marginLeft": "2.5%" }} />
                        <div className="text-start m-4">
                            <h5 className="text-left">Datos generales</h5>
                            <h6 className="text-secondary">Correo:</h6>
                            <h6>isaiasdeleonsalazar@gmail.com</h6>
                            <h6 className="text-secondary">Telefono:</h6>
                            <h6>44-42-38-92-14</h6>
                        </div>
                        <hr style={{ "width": "95%", "margin": "0", "marginLeft": "2.5%" }} />
                        <div className="text-start m-4">
                            <h5 className="text-left">Ubicación</h5>
                            <h6 className="text-secondary">País:</h6>
                            <h6>Mexico</h6>
                            <h6 className="text-secondary">Estado:</h6>
                            <h6>San luis potosi, S.L.P</h6>
                            <h6 className="text-secondary">Municipio:</h6>
                            <h6>Soledad de graciano sanchez</h6>
                            <h6 className="text-secondary">Direccion:</h6>
                            <h6>Andador estrecho de bering 606 A</h6>
                            <h6 className="text-secondary">CP:</h6>
                            <h6>78438</h6>
                            <button style={{ "float": "right" }} className="btn btn-dark">Ver MAPA</button>
                        </div>

                    </div>


                </div>
                <div className="PrimeraSeccion text-center" style={{ "margin": "20px", "background": "#fff", "borderRadius": "30px", "boxShadow": " 1px 1px 2px 2px rgba(0, 0, 0, 0.2)", "maxHeight": "90%", "overflowX": "auto" }} >
                    <div className="m-4">
                        <h4>Editar datos</h4>
                        <div className="text-start">
                            <h6>Actualizar foto:</h6>
                            <div className="text-center " style={{ "width": "100%", "border": "2px dashed #D7DBDD", "height": "110px" }}>
                                <h5>Arrastra y suelta la imagen</h5>
                                <span style={{ "margin": "0" }}>O</span>
                                <form method="POST" id="fileimgOPM">
                                    <label htmlFor="fileimgOPM2" className="btn btn-secondary">Selecciona la imagen</label>
                                    <input id="fileimgOPM2" type="file" name="fileimgOPM2" className="file_multi_video" hidden />
                                </form>
                            </div>
                            <div className="p-4">
                                <div className=" d-flex">
                                    <div className="col-sm m-2" >
                                        <h6>Nombre:</h6>
                                        <input name="Nombre" value={Nombre} onChange={ onInputChange } type="text"  className="form-control" />
                                    </div>
                                    <div className="col-sm m-2">
                                        <h6>Telefono:</h6>
                                        <input name="Telefono" value={Telefono} onChange={ onInputChange } type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-sm m-2">
                                    <h6>Contraseña:</h6>
                                    <input name="Password" value={Password} onChange={ onInputChange } type="password" className="form-control" />
                                </div>
                                <div className="d-flex">
                                    <div className="col-sm m-2">
                                        <h6>Pais</h6>
                                        <select className="form-select" name="Pais" value={Pais} onChange={ onInputChange } >
                                            <option value="1">Mexico</option>
                                        </select>
                                    </div>
                                    <div className="col-sm m-2">
                                        <h6>Estado</h6>
                                        <select className="form-select" name="Estado" value={Estado} onChange={ onInputChange }>
                                            {valuesEstado.map((Val) => (
                                                <option key={Val.id} value={Val.id}>{Val.estado}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-sm m-2">
                                        <h6>Municipio</h6>
                                        <select className="form-select">
                                            {
                                                valueMunicipio.map((Val) => (
                                                    <option key={Val.id} value={Val.id}>{Val.municipio} </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    
                                    <div className="col-sm m-2">
                                        <h6>Direccion</h6>
                                        <input className="form-control" type="text"/>
                                    </div>
                                    <div className="col-sm m-2">
                                        <h6>Codigo postal</h6>
                                        <input className="form-control" type="number"/>
                                    </div>
                                </div>
                                <button className="btn btn-success" style={{"float":"right"}}>Guardar datos</button>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="PrimeraSeccion text-center" style={{ "margin": "20px", "background": "#fff", "borderRadius": "30px", "boxShadow": " 1px 1px 2px 2px rgba(0, 0, 0, 0.2)", "height": "min-content", "maxHeight": "90%", "overflowX": "auto" }} >
                    <div className="m-4">
                        <h4>Articulos</h4>
                        <div style={{ "display": "grid", "gridTemplateColumns": "50% 50%" }}>

                            <div className=" text-center">
                                <h6 >Comprados:</h6>
                                <h4 className="fw-bold text-success TotalesFont  ">5</h4>
                            </div>
                            <div className=" text-center">
                                <h6 >Carrito:</h6>
                                <h4 className=" fw-bold text-success TotalesFont">7</h4>

                            </div>
                        </div>
                        <hr style={{ "width": "95%", "margin": "0", "marginLeft": "2.5%" }} />
                        <div className="text-start m-3">
                            <h5>Historial de compras</h5>
                            <ul>
                                <li style={{ "margin": "5px" }}>
                                    <p style={{ "margin": "0" }} className="fw-bold">Celular</p>
                                    <p style={{ "margin": "0" }} className="text-secondary">2023/03/16</p>
                                </li>
                                <li style={{ "margin": "5px" }}>
                                    <p style={{ "margin": "0" }} className="fw-bold">Pantalla</p>
                                    <p style={{ "margin": "0" }} className="text-secondary">2023/03/12</p>
                                </li>
                                <li style={{ "margin": "5px" }}>
                                    <p style={{ "margin": "0" }} className="fw-bold">Pantalla</p>
                                    <p style={{ "margin": "0" }} className="text-secondary">2023/03/12</p>
                                </li>
                                <li style={{ "margin": "5px" }}>
                                    <p style={{ "margin": "0" }} className="fw-bold">Celular</p>
                                    <p style={{ "margin": "0" }} className="text-secondary">2023/03/16</p>
                                </li>
                                <li style={{ "margin": "5px" }}>
                                    <p style={{ "margin": "0" }} className="fw-bold">Pantalla</p>
                                    <p style={{ "margin": "0" }} className="text-secondary">2023/03/12</p>
                                </li>
                            </ul>
                        </div>

                        <button style={{ "float": "right" }} className="btn btn-danger mb-4">Convertirse en vendedor</button>
                    </div>


                </div>
            </div>
        </>
    )
}