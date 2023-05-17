import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../auth/AuthContext"
import { types } from "../../types/types";
import { useNavigate } from "react-router";
import axios from "axios";
import { Noti } from "../components/Notificaciones";
const URLServer = "http://192.168.100.18:3020/"
const HTTP = axios.create({
    baseURL: "https://badgerautomation.com/MarketPlace/Server/Data.php"
})
export const Login = ({setMenu}) => {
    const { Log } = useContext(AuthContext); 
    const navigate = useNavigate(); 
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [pass, setPass] = useState("");

    const [regist, setRegist] = useState(false);

    const onInputChange = ({ target }) => {
        const { name, value} = target;
        switch (name) {
            case 'Correo':
                setCorreo(value);
                break;
            case 'Contrasena':
                setPass(value);
                break;
            case 'Nombre':
                setNombre(value);
                break;
        }
    }

    const [notiCarrito, setNotiCarrito] = useState();
    const [activeNoti, setActiveNoti] = useState();

    const onLogin = (e) =>{
        
        e.preventDefault();
        // vamos a validar elñ correo que no venga vacio
       if(correo == ""){
            setNotiCarrito("CorreoVacio");
            setActiveNoti(true)
            setTimeout(() => {
                setActiveNoti(false)
            }, 5000);
            return;
       }
       if(pass == ""){
            setNotiCarrito("PassVacio");
            setActiveNoti(true)
            setTimeout(() => {
                setActiveNoti(false)
            }, 5000);
            return;
       }
       HTTP.post("/Login",{"user":correo,"pass":pass}).then((response) => {
        if(response.data[0]){
            const lastPath = localStorage.getItem('lastPath') || '/';
            let data = response.data[0];
            Log(data.Nombre, data.id, data.img, data.tipoUser);
            navigate(lastPath,{
                replace:true
            })
        }else{
            setNotiCarrito("UsuarioIncorrecto");
            setActiveNoti(true)
            setTimeout(() => {
                setActiveNoti(false)
            }, 5000);
        }
       })

    }
    
    const onRegister = (e) =>{
        e.preventDefault();
        //vamos a validar que los input no esten vacios
        if(nombre == ""){
            setNotiCarrito("NombreVacio");
            setActiveNoti(true);
            setTimeout(() => {
                setActiveNoti(false)
            }, 5000);
            return;
        }
        if(correo == ""){
            setNotiCarrito("CorreoVacio");
            setActiveNoti(true)
            setTimeout(() => {
                setActiveNoti(false)
            }, 5000);
            return;
       }
       if(pass == ""){
            setNotiCarrito("PassVacio");
            setActiveNoti(true)
            setTimeout(() => {
                setActiveNoti(false)
            }, 5000);
            return;
       }
       axios.post(URLServer+"Registrar",{"nombre":nombre,"correo":correo,"pass":pass}).then((response) => {
        console.log(response)
       })
    }
    useEffect(() => {
        setMenu(3)
    },[])
    return (
        <>
            <div className="contenedor">
                <div className="contentImg">
                    <picture>
                        <img  alt="IMGCompra" src="./assets/New.png" />
                        <h2 role="tooltip" className="fw-bold text-white h2">
                            Market place <b style={{"color": "rgb(241, 196, 15)"}}>B</b><b style={{"color": "rgb(41, 128, 185)"}}>A</b>
                        </h2>
                    </picture>
                </div>
                <div className="contentLog">
                    <div className="form">
                        <h2 className="mb-2 fw-bold">¡Bienvenido!</h2>
                        {
                            !regist ?
                                <>
                                    <h6 style={{"color":"#A6ACAF"}} className="mt-2 mb-4">Favor de ingresar tus credenciales, si no te acuerdas pregunta al personal de sistemas</h6> 
                                    <form>
                                        <input type="email" id="Correo" name="Correo" value={correo} placeholder="Correo electronico" onChange={onInputChange} />
                                        <input type="password" autoComplete="on" className="mt-3" id="Contrasena" name="Contrasena" value={pass} placeholder="Contraseña" onChange={onInputChange} />
                                        <button onClick={(e) => onLogin(e)} style={{"backgroundColor": "#303030", "width": "100%"}} className="btn mt-3 text-white">Iniciar</button>
                                        <button onClick={(e) => onLogin(e)} style={{"backgroundColor": "#303030", "width": "100%"}} className="btn mt-3 text-white">Iniciar sesión con google <i style={{"float":"right"}} className="bi bi-google"></i></button>
                                    </form>
                                </>:
                                <form className="text-start mt-4">
                                    <label className="fw-bold">Nombre completo:</label>
                                    <input type="text" id="Nombre2" name="Nombre" value={nombre} placeholder="Nombre completo" onChange={onInputChange} />
                                    <label className="fw-bold mt-2">Correo electronico:</label>
                                    <input type="email" id="Correo2" name="Correo"  value={correo} placeholder="Correo electronico" onChange={onInputChange} autoComplete="off"/>
                                    <label className="fw-bold mt-2">Contraseña:</label>
                                    <input type="password" autoComplete="off" id="Contrasena2" name="Contrasena" value={pass} placeholder="Contraseña" onChange={onInputChange} />
                                    <button onClick={(e) => onRegister(e)} style={{"backgroundColor": "#303030", "width": "100%"}} className="btn mt-3 text-white">Registrarse</button>
                                    <button onClick={(e) => onRegister(e)} style={{"backgroundColor": "#303030", "width": "100%"}} className="btn mt-3 text-white">Rigistrar con google <i style={{"float":"right"}} className="bi bi-google"></i></button>
                                </form>
                        }
                        <label className="switch">
                            <input onChange={(e) => setRegist(!regist)} type="checkbox"/>
                            <div className="slider">
                                <span>Tengo cuenta</span>
                                <span>Registrarse</span>
                            </div>
                        </label>
                    </div>
                    
                </div>
            </div>
            <Noti notiCarrito={notiCarrito} activeNoti={activeNoti} />
        </>
    )
}