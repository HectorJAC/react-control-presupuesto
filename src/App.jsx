import { useState, useEffect } from 'react';

import { Header } from './components/Header';
import { ListadoGastos } from './components/ListadoGastos';
import { Modal } from './components/Modal';
import { Filtros } from './components/Filtros'

import { generarId } from './helpers';
import NuevoGasto from './img/nuevo-gasto.svg';

const App = () => {
    const [presupuesto, setPresupuesto] = useState(localStorage.getItem('presupuesto') ?? '');
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);

    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);

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
    }, [gastoEditar])
    
    useEffect(() => {
        localStorage.setItem('presupuesto', presupuesto);
    }, [presupuesto]);

    useEffect(() => {
        localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
    }, [gastos]);

    useEffect(() => {
        if (filtro) {
            // Filtrar los gastos por categoria
            const gastosFiltrados = gastos.filter((gasto) => (
                gasto.categoria === filtro
            ));
            setGastosFiltrados(gastosFiltrados);
        }
    }, [filtro, gastos]);

    useEffect(() => {
        const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? '';
        if (presupuestoLS > 0) {
            setIsValidPresupuesto(true);
        }
    }, []);

    const handleNuevoGasto = () => {
        setModal(true);
        setGastoEditar({});

        setTimeout(() => {
            setAnimarModal(true);
        }, 500);
    };

    const guardarGasto = (gasto) => {
        if (gasto.id) {
            // Editar
            const gastosActualizados = gastos.map((gastoState) => (
                gastoState.id === gasto.id ? gasto : gastoState
            ))

            setGastos(gastosActualizados);
            setGastoEditar({});
        } else {
            // Agregar
            gasto.id = generarId();
            gasto.fecha = Date.now();
            setGastos([...gastos, gasto]);
        }

        setAnimarModal(false);

        setTimeout(() => {
            setModal(false);
        }, 500)
    }

    const eliminarGasto = (id) => {
        const gastosActualizados = gastos.filter((gasto) => (
            gasto.id !== id
        ));
        setGastos(gastosActualizados);
    }

    return (
        <div className={modal ? 'fijar' : null}>
            <Header 
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
                gastos={gastos}
                setGastos={setGastos}
            />

            {
                isValidPresupuesto && (
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
                        <div className='nuevo-gasto'>
                            <img
                                src={NuevoGasto}
                                alt='Icono Nuevo Gasto'
                                onClick={handleNuevoGasto}
                            />
                        </div>
                    </>
                )
            }
            {
                modal && <Modal 
                            setModal={setModal}
                            animarModal={animarModal}
                            setAnimarModal={setAnimarModal}
                            guardarGasto={guardarGasto}
                            gastoEditar={gastoEditar}
                            setGastoEditar={setGastoEditar}
                        />
            }
        </div>
    );
};

export default App
