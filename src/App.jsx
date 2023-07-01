import { useEffect, useState } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import generarId from "./helpers/generarId";
import ListadoGastos from "./components/ListadoGastos";
import Filtros from "./components/Filtros";

const App = () => {
    const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? '');
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);

    const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);
    
    const [gastoEditar, setGastoEditar] = useState({});
    
    const [filtro, setFiltro] = useState('');
    const [gastosFiltrados, setGastosFiltrados] = useState([]);

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setModal(true);

            setTimeout(() => {
                setAnimarModal(true);
            }, 500);
        }

    }, [gastoEditar]);

    useEffect(() => {
        localStorage.setItem('presupuesto', presupuesto ?? 0);
    }, [presupuesto]);

    useEffect(() => {
        localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
    }, [gastos]);

    useEffect(() => {
        if(filtro !== '') {
            const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
            setGastosFiltrados(gastosFiltrados);
        }
        
    }, [filtro]);

    // Comprobar si el presupuesto de LocalStorage es válido
    useEffect(() => {
        const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
        if(presupuestoLS > 0) {
            setIsValidPresupuesto(true);
        }
    }, []);


    const handleNuevoGasto = () => {
        setModal(true);
        setGastoEditar({});

        setTimeout(() => {
            setAnimarModal(true);
        }, 500);
    }

    const guardarGasto = gasto => {

        if (gasto.id) {
            // Editar gasto
            const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
            setGastos(gastosActualizados);
            setGastoEditar({});

        } else {
            // Nuevo gasto
            gasto.id = generarId();
            gasto.fecha = Date.now();

            setGastos([...gastos, gasto]);
        }

    }

    const eliminarGasto = id => {
        const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id);
        setGastos(gastosActualizados);
    }

    return (
        <div className={modal ? 'fijar' : ''}>
            <Header
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />

            {/* Icono para añadir un nuevo gasto */}
            {isValidPresupuesto && (
                <>
                    <main>
                        <Filtros 
                            filtro={filtro}
                            setFiltro={setFiltro}
                        />

                        <ListadoGastos
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                            filtro={filtro}
                            gastosFiltrados={gastosFiltrados}
                        />
                    </main>

                    {/* Icono para agregar un gasto */}
                    <div className="nuevo-gasto">
                        <img onClick={handleNuevoGasto} src='/img/nuevo-gasto.svg' alt="Icono nuevo gasto" />
                    </div>
                </>
            )}

            {modal && (
                <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                />
            )}
        </div>
    )
}

export default App;