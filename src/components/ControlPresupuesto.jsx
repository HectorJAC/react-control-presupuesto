/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const ControlPresupuesto = ({
    presupuesto, 
    setPresupuesto, 
    setIsValidPresupuesto, 
    gastos, 
    setGastos
}) => {
    
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => {
            return total + gasto.cantidad;
        }, 0);

        const totalDisponible = presupuesto - totalGastado;

        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

        setDisponible(totalDisponible);
        setGastado(totalGastado);

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 1000);
    }, [presupuesto, gastos]);

    const formatearCantidad = (cantidad) => {
        return Number(cantidad).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }
    
    const handleResetApp = () => {
        setGastos([]);
        setPresupuesto('');
        setIsValidPresupuesto(false);
    };

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar 
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                        trailColor: '#f5f5f5',
                        textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}
                > 
                    App Reset 
                </button>
                <p>
                    <span> Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>

                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span> Disponible: </span> {formatearCantidad(disponible)}
                </p>

                <p style={{color: 'red'}}>
                    <span style={{color: 'red'}}> Gastado: </span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    );
};