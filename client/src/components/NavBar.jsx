import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../assets/css/NavBar.css';

function NavBar() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isFullFormVisible, setIsFullFormVisible] = useState(false);
    const [showInitialFields, setShowInitialFields] = useState(true);
    const { register, handleSubmit } = useForm();

    const handleCheckboxChange = () => {
        setIsLoginOpen(!isLoginOpen);
        setIsFullFormVisible(false);
        setShowInitialFields(true); // Mostrar los campos de nombre de usuario y contraseña al abrir el menú Login
    };

    const handleCancel = () => {
        setIsLoginOpen(false);
        setIsFullFormVisible(false);
        setShowInitialFields(true); // Mostrar los campos de nombre de usuario y contraseña al cancelar
    };

    const handleLoginSubmit = (values) => {
        console.log('Login:', values);
        setIsLoginOpen(false);
        setIsFullFormVisible(false);
        // Aquí puedes manejar la lógica para enviar los datos del formulario de login
    };

    const handleRegisterClick = () => {
        setIsFullFormVisible(true);
        setShowInitialFields(false); // Ocultar los campos de nombre de usuario y contraseña al hacer clic en "Registrar"
    };

    const handleRegisterSubmit = (values) => {
        console.log('Registro:', values);
        // Aquí puedes manejar la lógica para enviar los datos del formulario de registro
    };

    return (
        <div className="nav">
            <nav className="navbar">
                <ul className="navLis">
                    <div className='logo' />
                    <li><a href="#"><b className='menu'>Inicio</b></a></li>
                    <li><a href="#"><b className='menu'>Rutas</b></a></li>
                    <li><a href='#'><b className='menu'>Contactos</b></a></li>
                    <li>
                        <label className='labelcheck' htmlFor="menuCheckbox">
                            <b className='menu'>
                                <input type="checkbox" className='check' id="menuCheckbox" onChange={handleCheckboxChange} />
                                Login
                            </b>
                        </label>
                        {isLoginOpen && (
                            <ul className="submenu">
                                <form className='login' onSubmit={handleSubmit(handleRegisterSubmit)}>
                                    {showInitialFields && (
                                        <div>
                                            <div className="form-group">
                                                <label htmlFor="username"><b className='formulario'>Nombre Usuario</b></label>
                                                <input type="text" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password"><b className='formulario'>Contraseña</b></label>
                                                <input type="password" />
                                            </div>
                                        </div>
                                    )}
                                    {!isFullFormVisible && (
                                        <div className="form-group">
                                            <button className="button" type='submit'><b className='botones'>Entrar</b></button>&nbsp;&nbsp;&nbsp;
                                            <button onClick={handleRegisterClick} className="button"><b className='botones'>Registrar</b></button>
                                        </div>
                                    )}
                                    {isFullFormVisible && (
                                        <div>
                                            <div>
                                                <div className="form-group">
                                                    <label htmlFor="username"><b className='formulario'>Nombre Usuario</b></label>
                                                    <input type="text" {...register('username', {required:true})} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password"><b className='formulario'>Contraseña</b></label>
                                                    <input type="password" {...register('password', {required:true})} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="telefono"><b className='formulario'>Telefono</b></label>
                                                <input type="phone" {...register('telefono',  {required:true})} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="correo"><b className='formulario'>Correo</b></label>
                                                <input type="email" {...register('correo',  {required:true})} />
                                            </div>
                                            <div className="form-group">
                                                <button className="button" type='submit'><b className='botones'>Registrar</b></button>&nbsp;&nbsp;&nbsp;
                                                <button onClick={handleCancel} className="button"><b className='botones'>Cancelar</b></button>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;
