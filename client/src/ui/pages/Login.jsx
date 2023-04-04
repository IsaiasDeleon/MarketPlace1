import { useContext, useState } from "react"
import { AuthContext } from "../../auth/AuthContext"
import { types } from "../../types/types";
import { useNavigate } from "react-router";
import axios from "axios";
import { Noti } from "../components/Notificaciones";
const URLServer = "http://192.168.100.10:3020/"
export const Login = () => {
    const { Log } = useContext(AuthContext); 
    const navigate = useNavigate(); 

    const [correo, setCorreo] = useState("");
    const [pass, setPass] = useState("");
    const onInputChange = ({ target }) => {
        const { name, value} = target;
        switch (name) {
            case 'Correo':
                setCorreo(value);
                break;
            case 'Contrasena':
                setPass(value);
                break;
        }
    }

    const [notiCarrito, setNotiCarrito] = useState();
    const [activeNoti, setActiveNoti] = useState();

    const onLogin = (e) =>{
        // vamos a validar elñ correo que no venga vacio
    //    if(correo == ""){
    //         setNotiCarrito("UsuarioIncorrecto");
    //         setActiveNoti(true)
    //         setTimeout(() => {
    //             setActiveNoti(false)
    //         }, 5000);
    //    }
       
        axios.post(URLServer+"Login",{"user":correo,"pass":pass}).then((response) => {
            console.log(response.data)
            if(response.data[0]){
                const lastPath = localStorage.getItem('lastPath') || '/';
                let data = response.data[0];
                
                Log(data.Nombre, data.id, data.img);
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
        e.preventDefault();
    }
    return (
        <>
            <div className="contenedor">
                <div className="contentImg">
                    <picture>
                        <img style={{"width":"80%"}} alt="IMGCompra" src="./assets/New.png" />
                        <h2 role="tooltip" className="fw-bold text-white h2">
                            Market place <b style={{"color": "rgb(241, 196, 15)"}}>B</b><b style={{"color": "rgb(41, 128, 185)"}}>A</b>
                        </h2>
                    </picture>
                </div>
                <div className="contentLog">
                    <div className="form">
                        <h2 className="mb-2 fw-bold">¡Bienvenido!</h2>
                        <h6 style={{"color":"#A6ACAF"}} className="mt-2 mb-4">Favor de ingresar tus credenciales, si no te acuerdas
                            pregunta al personal de sistemas</h6>
                        {/* <p className="text-danger fw-bold">Las credenciales que ingreso son incorrectas.</p> */}
                        <form>
                            <input type="email" id="Correo" name="Correo" value={correo} placeholder="Correo electronico" onChange={onInputChange} />
                            <input type="password" autoComplete="on" className="mt-3" id="Contrasena" name="Contrasena" value={pass} placeholder="Contraseña" onChange={onInputChange} />
                            <button onClick={(e) => onLogin(e)} style={{"backgroundColor": "#303030", "width": "100%"}} className="btn mt-3 text-white">Iniciar</button>
                            <button onClick={(e) => onLogin(e)} style={{"backgroundColor": "#303030", "width": "100%"}} className="btn mt-3 text-white">Iniciar sesión con google <i style={{"float":"right"}} className="bi bi-google"></i></button>
                        </form>
                        
                    </div>
                    
                </div>
            </div>
            <Noti notiCarrito={notiCarrito} activeNoti={activeNoti} />
        </>
    )
}