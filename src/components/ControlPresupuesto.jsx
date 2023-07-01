import { useEffect, useState } from "react";
import dosDecimales from "../helpers/dosDecimales";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({ gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto }) => {
    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => dosDecimales(gasto.cantidad) + total, 0);
        const totalDisponible = presupuesto - totalGastado;
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

        setGastado(totalGastado);
        setDisponible(totalDisponible);

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 800)

    }, [gastos]);

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reniciar la aplicación?');

        if(resultado) {
            setGastos([]);
            setPresupuesto('');
            setIsValidPresupuesto(false);
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3b82f6',
                        trailColor: '#f5f5f5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3b82f6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% gastado`}
                />
            </div>

            <div className="contenido-presupuesto">
                <button
                    onClick={handleResetApp}
                    type="button"
                    className="reset-app"
                >
                    Reiniciar Aplicación
                </button>
                <p>
                    <span>Presupuesto: </span> {dosDecimales(presupuesto)} €
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span> {dosDecimales(disponible)} €
                </p>
                <p>
                    <span>Gastado: </span> {dosDecimales(gastado)} €
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto;