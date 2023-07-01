import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = e => {
        e.preventDefault();

        if(!Number(presupuesto) || presupuesto <= 0) {
            setMensaje('El presupuesto no es válido');
            return;
        }

        setMensaje('');
        setIsValidPresupuesto(true);
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={handlePresupuesto} className="formulario" noValidate>
                <div className="campo">
                    <label>Define tu Presupuesto (€)</label>

                    <input
                        type="text"
                        className="nuevo-presupuesto"
                        placeholder="Cantidad..."
                        value={presupuesto}
                        onChange={e => setPresupuesto(e.target.value)}
                    />
                </div>

                <input type="submit" value="Añadir" />

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        </div>
    )
}

export default NuevoPresupuesto;