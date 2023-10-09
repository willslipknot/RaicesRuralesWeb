import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/CondCard.css';
import { useCond } from '../../context/condContext';

const opciones = [
    { label: 'Moto', value: 'Moto' },
    { label: 'Carro', value: 'Carro' }
];

function CondCard({ cond }) {

    const [modalOpen, setModalOpen] = useState(false);
    const { deleteCond, getCond, updateCond } = useCond()
    const [selectedId, setSelectedId] = useState(null);
    const { register, handleSubmit, reset, setValue } = useForm();
    const [tip, setTip] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        if (selectedId !== null) {
            async function loadCond() {
                const cond = await getCond(selectedId);
                console.log(cond);
                setValue('nombre', cond.nombre);
                setValue('apellido', cond.apellido);
                setValue('licencia', cond.licencia);
                setValue('placas', cond.placas);
                setValue('tipoVehiculo', cond.tipoVehiculo);
            }
            loadCond();
        }
    }, [selectedId]);



    const handleOpenModal = () => {
        setSelectedId(cond.id);
        setModalOpen(true);

    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const onSubmit = handleSubmit(async (data) => {
        console.log("Datos del formulario:", data);
        if (selectedId !== null) {
            try {
                await updateCond(selectedId, data);
                setMensaje('Conductor editado exitosamente');
                handleCloseModal();
            } catch (error) {
                console.error('Error al editar el conductor:', error);
            }
        }
        setTimeout(() => {
            setMensaje('');
        }, 3000);
    });
    const handleLimpiarClick = () => {
        reset();
        setMensaje('');
    };

    const handleTipoChange = (e) => {
        setTip(e.target.value);
    };

    return (
        <div className="card">
            <div className='title'>
                <div>
                    <h1>Nombre: {cond.nombre} {cond.apellido}</h1>
                    <p>Tipo: {cond.tipoVehiculo}</p>
                    <p>Placas: {cond.placas}</p><br />
                    <div className='buttons'>
                        <button onClick={handleOpenModal}>Editar</button>&nbsp;
                        {modalOpen && (
                            <div className="modal" onClick={handleCloseModal}>
                                <div className="conductor-form" onClick={(e) => e.stopPropagation()}>
                                    <form onSubmit={onSubmit} className='conductor'>

                                        <div className="form-group">
                                            <label htmlFor="nombre">Nombre</label>
                                            <input type="text" className='formulario' {...register("nombre", { required: true })} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="apellido">Apellido</label>
                                            <input type="text" className='formulario' {...register("apellido", { required: true })} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="licencia">Licencia</label>
                                            <input type="text" className='formulario'  {...register("licencia", { required: true })} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="tipo">Tipo</label>&nbsp;&nbsp;
                                            <select {...register('tipoVehiculo', { required: true })} onChange={handleTipoChange} type="text" className='formulario-tipo' >
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
                                            <input type="text" className='formulario'  {...register("placas", { required: true })} />
                                        </div>

                                        <div className="form-group">
                                            <button type='submit'>Editar</button>
                                            <button type='button' onClick={handleLimpiarClick}>Limpiar</button>
                                        </div>

                                        {mensaje && <div className="mensaje">{mensaje}</div>}
                                    </form>
                                </div>
                            </div>
                        )}

                        <button onDoubleClick={() => {
                            deleteCond(cond.id);
                        }}>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CondCard;
