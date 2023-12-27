/* eslint-disable react/prop-types */
import { useState } from "react";
import { MensajeError } from "./MensajeError";

export const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {
    
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!presupuesto || presupuesto < 0) {
            setMensaje('Presupuesto Invalido ');
            return;
        }
        setIsValidPresupuesto(true);
    };

    const handleCerrarMensaje = () => {
        setMensaje('');
    };
    
    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form className="formulario" onSubmit={handleSubmit}>
                <div className="campo">
                    <label> Definir Presupuesto </label>
                    <input 
                        id="presupuesto"
                        className="nuevo-presupuesto"
                        type="number"
                        placeholder="Agrega un Presupuesto"
                        autoComplete="off"
                        value={presupuesto}
                        onChange={(e) => setPresupuesto(Number(e.target.value))}
                    />
                </div>

                <input 
                    type="submit"
                    value="Agregar"
                />
                {
                    mensaje && 
                    <MensajeError tipo="error"> 
                        {mensaje} 
                        <span 
                            onClick={handleCerrarMensaje}
                            className="cerrarMensaje"
                            title="Cerrar mensaje"
                        > 
                            X 
                        </span>
                    </MensajeError>
                }
            </form>
        </div>
    );
};