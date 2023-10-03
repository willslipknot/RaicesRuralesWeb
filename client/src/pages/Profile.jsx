import React, { useEffect, useState } from 'react';
import NavBar from '../components/Home/NavBar.jsx';
import { useAuth } from '../context/authContext.jsx';
import '../assets/css/Profile.css';

function Profile() {
    const { user } = useAuth();
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        telefono: '',
        nombre: '',
        apellido: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Al cargar el componente o cuando el usuario cambie, llenar el estado del formulario con los datos del usuario
        setFormValues({
            username: user.usernam,
            email: user.correo,
            telefono: user.telefono,
            nombre: user.nombre,
            apellido: user.apellido,
        });
    }, [user]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    return (
        <div className="profile-container">
            <NavBar /><br /><br /><br /><br />
            <div className="profile-form">
                <h1>Perfil de Usuario</h1><br></br>
                <form className='perfil'>
                    <div className="form-group">
                        <label htmlFor="username">Nombre de Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formValues.username}
                            readOnly={!isEditing}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formValues.email}
                            readOnly={!isEditing}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                            type="text"
                            id="telefono"
                            name="telefono"
                            value={formValues.telefono}
                            readOnly={!isEditing}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formValues.nombre}
                            readOnly={!isEditing}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido">Apellido</label>
                        <input
                            type="text"
                            id="apellido"
                            name="apellido"
                            value={formValues.apellido}
                            readOnly={!isEditing}
                            onChange={handleInputChange}
                        />
                    </div>
                    {isEditing ? (
                        <div className="form-group">
                            <button type="submit">Actualizar</button>
                            <button type="button" onClick={handleCancelClick}>Cancelar</button>
                            
                        </div>
                    ) : (
                        <button type="button" onClick={handleEditClick}>Editar</button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Profile;
