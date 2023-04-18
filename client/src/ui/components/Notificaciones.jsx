import 'animate.css';
export const Noti = ({ notiCarrito, activeNoti }) => {
    let message = "";
    let color = "";
    // switch (notiCarrito){
    //     case "Agregado":
    //         message = "El producto fue agregado a tu carrito."
    //         color = "success";
    //         break;
    //     case "Existe":
    //         message = "El producto ya se encuntra en tu carrito.";
    //         color = "warning";
    //         break;
    //     case "Guardada":
    //         message = "Ubicación guardada.";
    //         color = "success";
    //         break;
    //     case "UbicacionError":
    //         message = "Activa la ubicación.";
    //         color = "danger";
    //         break;
    //     case "UsuarioIncorrecto"
    // }
    if (notiCarrito == "Agregado") {
        message = "El producto fue agregado a tu carrito."
        color = "success"
    }
    else if( notiCarrito == "AgregadoGustos") {
        message = "El producto fue agregado a tus gustos."
        color = "success"
    }
    else if( notiCarrito == "ExisteGustos"){
        message = "El producto ya se encuntra en tus gustos."
        color = "warning"
    }
    else if (notiCarrito == "Existe") {
        message = "El producto ya se encuntra en tu carrito."
        color = "warning"
    }
    else if (notiCarrito == "Eliminado") {
        message = "El producto fue elimando de tu carrito."
        color = "danger"
    }
    else if (notiCarrito == "Guardada") {
        message = "Ubicación guardada.";
        color = "success"
    }
    else if (notiCarrito == "UbicacionError") {
        message = "Activa la ubicación.";
        color = "danger";
    }
    else if( notiCarrito == "UsuarioIncorrecto") {
        message = "Las credenciales que ingreso son incorrectas. por favor verifique sus datos";
        color = "danger";
    }
    else if(notiCarrito == "CorreoVacio"){
        message = "El correo es un compo obligatorio";
        color = "warning"
    }
    else if(notiCarrito == "NombreVacio"){
        message = "El nombre es un campo obligatorio";
        color = "warning";
    }
    else if(notiCarrito == "PassVacio"){
        message = "La contraseña es un campo obligatorio";
        color = "warning"
    }
    else if( notiCarrito == "Actualizado"){
        message = "El usuario fue actualizado";
        color = "success";
    }
    else if(notiCarrito == "EliminadoGusto"){
        message = "El producto fue eliminado de tus guardados";
        color = "danger";
    }
    return (
        <div style={{ "position": "fixed", "right": "20px", "top": "80px", "zIndex": "1", "display": "block" }} className={`toast align-items-center text-bg-${color} border-0 animate__animated ${(activeNoti) ? 'animate__fadeInRight' : 'animate__fadeOutRight'} `} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
                <div className="toast-body">
                    {message}
                </div>
                <button type="button" className="btn-close btn-close-dark me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    )
}