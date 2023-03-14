import 'animate.css';
export const Noti = ({notiCarrito,activeNoti}) => {
    let message = "";
    let color = "";
    if(notiCarrito == "Agregado"){
        message="El producto fue agregado a tu carrito."
        color = "success"
    }
    if(notiCarrito == "Existe"){
        message="El producto ya se encuntra en tu carrito."
        color= "warning"
    }
    return (
        <div style={{"position": "fixed","right": "20px", "top": "80px","zIndex": "1","display":"block"}} className={`toast align-items-center text-bg-${color} border-0 animate__animated ${(activeNoti)? 'animate__fadeInRight' : 'animate__fadeOutRight'} `} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
                <div className="toast-body">
                    {message}
                </div>
                <button type="button" className="btn-close btn-close-dark me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    )
}