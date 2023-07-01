import { LeadingActions, SwipeableList, SwipeableListItem, TrailingActions, SwipeAction } from 'react-swipeable-list';
import "react-swipeable-list/dist/styles.css";

import dosDecimales from "../helpers/dosDecimales";
import formatearFecha from "../helpers/formatearFecha";

const diccionarioIconos = {
    ahorro: '/img/icono_ahorro.svg',
    comida: '/img/icono_comida.svg',
    casa: '/img/icono_casa.svg',
    transporte: '/img/icono_transporte.svg',
    ocio: '/img/icono_ocio.svg',
    salud: '/img/icono_salud.svg',
    suscripciones: '/img/icono_suscripciones.svg'
}

const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {
    const { id, nombre, cantidad, categoria, fecha } = gasto;

    const LeadingActionsNode = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>Editar</SwipeAction>
        </LeadingActions>
    );

    const TrailingActionsNode = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => eliminarGasto(id)}
                destructive={true}    
            >Borrar</SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={<LeadingActionsNode />}
                trailingActions={<TrailingActionsNode />}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        {/* Icono */}
                        <img
                            src={diccionarioIconos[categoria]}
                            alt="Icono Gasto"
                        />

                        {/* Detalles */}
                        <div className="descripcion-gasto">
                            <p className="categoria">{categoria}</p>
                            <p className="nombre-gasto">{nombre}</p>
                            <p className="fecha-gasto">{formatearFecha(fecha)}</p>
                        </div>
                    </div>

                    <p className="cantidad-gasto">{dosDecimales(cantidad)} €</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Gasto;