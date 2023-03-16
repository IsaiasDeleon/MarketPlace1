import axios from 'axios';
import { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';


function valuetext(value) {
    return `${value}`;
}
const URLServer = "http://192.168.100.22:3020/"
export const Menu = ({ estado, setEstadoMenu, setDataFiltrado }) => {

    const [value, setValue] = useState([1000, 4000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const onSubmitHideMenu = () => {
        setEstadoMenu(false)
    }
    const FiltValor = () => {
        setFiltros({ ...filtros, value: (value) })
    }

    //Filtros Object
    const [filtros, setFiltros] = useState({
        Bad: true,
        Apl: false,
        Celular: false,
        Pantallas: false,
        Calzado: false,
        Muebles: false,
        Otros: false,
        value: value
    });
    useEffect(() => {
        axios.post(URLServer + "PruebasBusqueda", filtros).then((response) => {
            setDataFiltrado(response.data)
        });
    }, [filtros])




    return (
        <>
            <div className={`contenedorM ${estado ? 'contenedorMActive' : ''}`} >
                <div style={{ "alignItems": "center" }} className="d-flex text-center  contenedorMHead" >
                    <p className="text-white fw-bold h5 col LogoFont">Market place <b style={{ "color": "#F1C40F" }}>B</b><b style={{ "color": "#2980B9" }}>A</b></p>
                    <i onClick={() => { onSubmitHideMenu() }} className="bi bi-x-square-fill cerrarMenu"></i>
                </div>
                <div style={{ "overflowY": "auto", "height": "100%" }}>
                    <div className="padding3 paginasMenu">
                        <p className="text-white fw-bold TitulosMenu"><i className="bi bi-layout-text-window-reverse"></i> Paginas</p>
                        <p className="nav-link fw-bold text-white OpcionesFont" href="#">Inicio</p>
                        <p className="nav-link fw-bold text-white OpcionesFont" href="#">Productos nuevos</p>
                    </div>

                    <div className="">
                        <p style={{ "margin": "5px", "marginBottom": "0" }} className="text-white fw-bold TitulosMenu"><i className="bi bi-filter"></i> Filtros</p>
                    </div>
                    <div className="padding3">
                        <p style={{ "margin": "0" }} className="text-white fw-bold TitulosMenu"><i className="bi bi-cart"></i> Tiendas</p>
                        <div className="form-check margin3">
                            <input className="form-check-input checkbox" type="checkbox" onChange={(e) => { setFiltros({ ...filtros, Bad: (!filtros.Bad) }) }} checked={filtros.Bad} id="Uno" />
                            <label className="form-check-label text-white OpcionesFont" htmlFor="Uno">
                                Badger automation
                            </label>
                        </div>
                        <div className="form-check margin3">
                            <input className="form-check-input checkbox" type="checkbox" onChange={() => { setFiltros({ ...filtros, Apl: (!filtros.Apl) }) }} checked={filtros.Apl} id="Dos" />
                            <label className="form-check-label text-white OpcionesFont" htmlFor="Dos">
                                Aplintec
                            </label>
                        </div>
                    </div>
                    <hr className='hrMenu' />
                    <div className="padding3">
                        <p style={{ "margin": "0" }} className="text-white fw-bold TitulosMenu"><i className="bi bi-box2"></i> Productos</p>
                        <div className="form-check margin3">
                            <input className="form-check-input checkbox" type="checkbox" onChange={() => { setFiltros({ ...filtros, Celular: (!filtros.Celular) }) }} checked={filtros.Celular} id="Tres" />
                            <label className="form-check-label text-white OpcionesFont " htmlFor="Tres">
                                Celulares
                            </label>
                        </div>
                        <div className="form-check margin3">
                            <input className="form-check-input checkbox" type="checkbox" onChange={() => { setFiltros({ ...filtros, Pantallas: (!filtros.Pantallas) }) }} checked={filtros.Pantallas} id="Cuatro" />
                            <label className="form-check-label text-white OpcionesFont " htmlFor="Cuatro">
                                Pantallas
                            </label>
                        </div>
                        <div className="form-check margin3">
                            <input className="form-check-input checkbox" type="checkbox" onChange={() => { setFiltros({ ...filtros, Calzado: (!filtros.Calzado) }) }} checked={filtros.Calzado} id="Cinco" />
                            <label className="form-check-label text-white OpcionesFont " htmlFor="Cinco">
                                Calzado
                            </label>
                        </div>
                        <div className="form-check margin3">
                            <input className="form-check-input checkbox" type="checkbox" onChange={() => { setFiltros({ ...filtros, Muebles: (!filtros.Muebles) }) }} checked={filtros.Muebles} id="Seis" />
                            <label className="form-check-label text-white OpcionesFont " htmlFor="Seis">
                                Muebles
                            </label>
                        </div>
                        <div className="form-check margin3">
                            <input className="form-check-input checkbox" type="checkbox" onChange={() => { setFiltros({ ...filtros, Otros: (!filtros.Otros) }) }} checked={filtros.Otros} id="Siete" />
                            <label className="form-check-label text-white OpcionesFont " htmlFor="Siete">
                                Otros
                            </label>
                        </div>

                    </div>
                    <hr className='hrMenu' />
                    <div className="p-3">
                        <p style={{ "margin": "0" }} className="text-white fw-bold mb-4"><i className="bi bi-currency-dollar"></i> Rango de precio</p>
                        <Stack spacing={2} direction="row" sx={{ mb: 1, mt: 4 }} alignItems="center">
                            <h6 className='text-white text-slider'>$500</h6>
                            <Slider

                                value={value}
                                onChange={handleChange}
                                min={500}
                                max={5000}
                                valueLabelDisplay="on"
                                step={50}
                                getAriaValueText={valuetext}
                                color="warning"
                                onChangeCommitted={FiltValor}
                            />
                            <h6 className='text-white text-slider'>$5000</h6>
                        </Stack>

                    </div>
                </div>

            </div>
        </>
    )
}