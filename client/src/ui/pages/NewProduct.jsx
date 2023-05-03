import { useEffect } from "react";

export const NewProduct = ({setMenu}) => {
    useEffect(() => {
        setMenu(2);
    },[])
    return(
        <>
            <div style={{"width":"100%","height":"100%","marginTop":"80px"}} >
                <h1>Hola</h1>
            </div>
        </>
    )
}