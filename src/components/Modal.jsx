/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { MensajeError } from "./MensajeError";
import CerrarBtn from '../img/cerrar.svg';

export const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    gastoEditar,
    setGastoEditar,
    guardarGasto
}) => {
    
    const [mensaje, setMensaje] = useState('');

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
        }
    }, [gastoEditar]);

    const ocultarModal = () => {
        setAnimarModal(false);
        setGastoEditar({});

        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son requeridos');

            setTimeout(() => {
                setMensaje('')
            }, 2500);
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha});
    }
    
    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarBtn} 
                    alt="Cerrar Modal"
                    onClick={ocultarModal}
                />
            </div>

            <form
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
                onSubmit={handleSubmit}
            >
                <legend> {gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'} </legend>
                {mensaje && <MensajeError tipo="error"> {mensaje} </MensajeError>}

                <div className="campo">
                    <label htmlFor="nombre"> Nombre Gasto </label>
                    <input 
                        id="nombre"
                        type="text"
                        placeholder="Agregar el nombre del Gasto"
                        autoComplete="off"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value.toUpperCase())}
                        required
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad"> Cantidad </label>
                    <input 
                        id="cantidad"
                        type="number"
                        placeholder="Agregar la Cantidad del gasto. Ej: 300"
                        autoComplete="off"
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                        required
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria"> Categoria </label>
                    <select 
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                    >
                        <option value=""> -- Seleccione una Categoria -- </option>
                        <option value="ahorro"> Ahorro </option>
                        <option value="comida"> Comida </option>
                        <option value="casa"> Casa </option>
                        <option value="gastos"> Gastos Varios </option>
                        <option value="ocio"> Ocio </option>
                        <option value="salud"> Salud </option>
                        <option value="suscripciones"> Suscripciones </option>
                    </select>
                </div>

                <input 
                    type="submit"
                    value={gastoEditar.nombre ? 'Guadar Cambio' : 'Agregar Gasto'}
                />
            </form>
        </div>
    );
};