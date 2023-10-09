import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../assets/css/Conductor.css';
import NavBar from '../components/Home/NavBar.jsx';
import { useCond } from '../context/condContext';
import CondCard from '../components/UserLog/CondCard'

const opciones = [
    { label: 'Moto', value: 'Moto' },
    { label: 'Carro', value: 'Carro' },
    
];

function Conductor() {
    const { register, handleSubmit, reset } = useForm();
    const { createConds, getConds, conds } = useCond();

    const [tip, setTip] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleTipoChange = (e) => {
        setTip(e.target.value);
    };


    const onSubmit = handleSubmit((data) => {
        console.log("Datos del formulario:", data);
        createConds(data);
        setMensaje('Conductor creado exitosamente');
        reset();

        setTimeout(() => {
            setMensaje('');
        }, 3000);
    });

    const handleLimpiarClick = () => {
        reset();
        setMensaje('');
    };

    useEffect(() => {
        getConds()
    }, [])

    return (
        <div className="conductor-container">
            <NavBar />
            <div className="conductor-buttons">
                <button onClick={handleOpenModal}>Crear Conductor</button>
            </div>
            <div className="conductor-content">
                <div className='cards'>{
                    conds.map((cond) => (
                        <CondCard key={cond.id} cond={cond} />
                    ))
                }
                </div>
                {modalOpen && (
                    <div className="modal" onClick={handleCloseModal}>
                        <div className="conductor-form" onClick={(e) => e.stopPropagation()}>
                            <form onSubmit={onSubmit} className='conductor'>

                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input type="text" className='formulario' {...register("nombre" , {required:true})} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="apellido">Apellido</label>
                                    <input type="text" className='formulario'  {...register("apellido" , {required:true}) } />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="licencia">Licencia</label>
                                    <input type="text" className='formulario'  {...register("licencia" , {required:true}) } />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="tipo">Tipo Vehiculo</label>&nbsp;&nbsp;
                                    <select {...register('tipoVehiculo', {required:true})} onChange={handleTipoChange} type="text" className='formulario-tipo' >
                                        <option value="">Selecciona un tipo</option>
                                        {opciones.map((opcion) => (
                                            <option key={opcion.value} value={opcion.value}>
                                                {opcion.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="placas">Placas</label>
                                    <input type="text" className='formulario'  {...register("placas" , {required:true}) } />
                                </div>


                                <div className="form-group">
                                    <button type='submit'>Crear</button>
                                    <button type='button' onClick={handleLimpiarClick}>Limpiar</button>
                                </div>

                                {mensaje && <div className="mensaje">{mensaje}</div>}
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Conductor;
