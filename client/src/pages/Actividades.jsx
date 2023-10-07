import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../assets/css/Actividades.css';
import NavBar from '../components/Home/NavBar.jsx';
import { useActs } from '../context/actContext';
import ActCard from '../components/UserLog/ActCard'

const opciones = [
    { label: 'Estadia', value: 'Estadia' },
    { label: 'Alimentacion', value: 'Alimentacion' },
    { label: 'Actividad', value: 'Actividad' },
];

function Actividades() {
    const { register, handleSubmit, reset } = useForm();
    const { createActs, getActs, acts } = useActs();

    const [tip, setTip] = useState('');
    const [imagen, setImagen] = useState(null);
    const [nombreArchivo, setNombreArchivo] = useState('');
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

    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagen(file);
            setNombreArchivo(file.name);
        }
    };

    const onSubmit = handleSubmit((data) => {
        console.log("Datos del formulario:", data);
        createActs(data);
        setMensaje('Actividad creada exitosamente');
        reset();
        setNombreArchivo('');

        setTimeout(() => {
            setMensaje('');
        }, 3000);
    });

    const handleLimpiarClick = () => {
        reset();
        setMensaje('');
        setNombreArchivo('');
    };

    useEffect(() => {
        getActs()
    }, [])

    return (
        <div className="actividad-container">
            <NavBar />
            <div className="actividad-buttons">
                <button onClick={handleOpenModal}>Crear Actividad</button>
            </div>
            <div className="actividad-content">
                <div className='cards'>{
                    acts.map((act) => (
                        <ActCard key={act.id} act={act} />
                    ))
                }
                </div>
                {modalOpen && (
                    <div className="modal" onClick={handleCloseModal}>
                        <div className="actividad-form" onClick={(e) => e.stopPropagation()}>
                            <form onSubmit={onSubmit} className='actividad'>

                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input type="text" className='formulario' {...register("nombre" , {required:true})} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="direccion">Direccion</label>
                                    <input type="text" className='formulario'  {...register("direccion" , {required:true}) } />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="descripcion">Descripcion</label>
                                    <textarea className="area" rows="3" {...register("descripcion", {required:true})} ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="tipo">Tipo</label>&nbsp;&nbsp;
                                    <select {...register('tipo', {required:true})} onChange={handleTipoChange} type="text" className='formulario-tipo' >
                                        <option value="">Selecciona un tipo</option>
                                        {opciones.map((opcion) => (
                                            <option key={opcion.value} value={opcion.value}>
                                                {opcion.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group-image">
                                    <input type="file" onChange={handleImagenChange} className='formulario1' />
                                    <input type="text" value={nombreArchivo} hidden className='formulario' {...register("imagen")} />
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

export default Actividades;
