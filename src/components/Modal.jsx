import { useEffect, useState } from "react";
import Mensaje from "./Mensaje";

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {
    
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0) {
            setId(gastoEditar.id);
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setFecha(gastoEditar.fecha);
        }
    }, [])

    const handleOcultarModal = () => {
        setAnimarModal(false);
        setGastoEditar({});

        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const handleFormularioGasto = e => {
        e.preventDefault();

        if([nombre.trim(), cantidad, categoria.trim()].includes('')) {
            setMensaje('Todos los campos son obligatorios');
            return;
        }

        guardarGasto({id, nombre, cantidad, categoria, fecha});

        handleOcultarModal();
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img onClick={handleOcultarModal} src="/img/cerrar.svg" alt="Icono cerrar modal" />
            </div>

            <form onSubmit={handleFormularioGasto} className={`formulario ${animarModal ? 'animar' : 'cerrar'}`} noValidate>
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre</label>

                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre del Gasto"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>

                    <input
                        id="cantidad"
                        type="number"
                        placeholder="Cantidad del Gasto"
                        value={cantidad}
                        onChange={e => setCantidad(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>

                    <select
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccionar --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="transporte">Transporte</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input 
                    type="submit"
                    value={gastoEditar.nombre ? 'Editar Gasto' : 'Añadir Gasto'}
                />
            </form>
        </div>
    )
}

export default Modal;