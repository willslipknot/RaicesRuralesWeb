import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/authContext.jsx';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/NavBar.css';

function NavBar() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isFullFormVisible, setIsFullFormVisible] = useState(false);
    const [showInitialFields, setShowInitialFields] = useState(true);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { signup, isAuthenticated, errors: erroresRegistro } = useAuth();
    const { signin, errors: erroresLogin, logout, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/Profile');

        if (isLoginOpen) {
            reset();
        }
    }, [isAuthenticated, isLoginOpen, reset]);

    const handleCheckboxChange = () => {
        setIsLoginOpen(!isLoginOpen);
        setIsFullFormVisible(false);
        setShowInitialFields(true);
        reset();
    };

    const handleCancel = () => {
        setIsLoginOpen(false);
        setIsFullFormVisible(false);
        setShowInitialFields(true);
        reset();
    };

    const handleLoginSubmit = (values) => {
        signin(values);

    };

    const handleRegisterClick = () => {
        setIsFullFormVisible(true);
        setShowInitialFields(false);
        reset();
    };

    const handleRegisterSubmit = async (values) => {
        signup(values);
        reset();
    };

    return (
        <div className="nav">
            <nav className="navbar">
                <ul className="navLis">
                    <div className='logo' />
                    <li><a href="#"><b className='menu'>Inicio</b></a></li>
                    <li><a href="#"><b className='menu'>Rutas</b></a></li>
                    <li><a href='#'><b className='menu'>Contactos</b></a></li>
                    {isAuthenticated ?
                        (
                            <> <li>
                                <label className='labelcheck' htmlFor="menuCheckbox">
                                    <b className='menu'>
                                        <input type="checkbox" className='check' id="menuCheckbox" onChange={handleCheckboxChange} />
                                        {user.usernam}

                                    </b>
                                </label>
                                {isLoginOpen && (
                                    <ul className="submenuUser">
                                        <form className='login' >
                                            <div className="form-group">
                                                <li><button href="/Profile" ><b className='menu'>Perfil</b></button></li><br></br>
                                                <li><button href="/" onClick={() => { logout() }}><b className='menu'>Logout</b></button></li>
                                            </div>
                                        </form>
                                    </ul>
                                )}
                            </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <label className='labelcheck' htmlFor="menuCheckbox">
                                        <b className='menu'>
                                            <input type="checkbox" className='check' id="menuCheckbox" onChange={handleCheckboxChange} />
                                            Login
                                        </b>
                                    </label>
                                    {isLoginOpen && (
                                        <ul className="submenu">
                                            {showInitialFields && (
                                                <form className='login' onSubmit={handleSubmit(handleLoginSubmit)} >
                                                    <div>
                                                        <div className="form-group">
                                                            <label htmlFor="username"><b className='formulario'>Nombre Usuario</b></label>
                                                            <input type="text" {...register('username', { required: true })} />
                                                            {
                                                                errors.username && (
                                                                    <p className='text-red-500'>
                                                                        Nombre de usuario es requerido
                                                                    </p>
                                                                )
                                                            }
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="password"><b className='formulario'>Contraseña</b></label>
                                                            <input type="password" {...register('password', { required: true })} />
                                                            {
                                                                errors.password && (
                                                                    <p className='text-red-500'>
                                                                        Contraseña es requerida
                                                                    </p>
                                                                )

                                                            }
                                                        </div>
                                                        <div className="form-group">
                                                            <button className="button" type='submit'><b className='botones'>Entrar</b></button>&nbsp;&nbsp;&nbsp;
                                                            <button onClick={handleRegisterClick} className="button"><b className='botones'>Registrar</b></button>
                                                        </div>
                                                        {
                                                            erroresLogin.map((error, i) => (

                                                                <div className='bg-red-500 p-0 text-white' key={i}>
                                                                    {error}
                                                                </div>
                                                            ))
                                                        }

                                                    </div>
                                                </form>
                                            )}
                                            {!isFullFormVisible && (
                                                <div></div>
                                            )}

                                            {isFullFormVisible && (
                                                <form className='login' onSubmit={handleSubmit(handleRegisterSubmit)} >
                                                    <div>
                                                        <div>
                                                            <div className="form-group">
                                                                <label htmlFor="username"><b className='formulario'>Nombre Usuario</b></label>
                                                                <input type="text" {...register('username', { required: true })} />
                                                                {
                                                                    errors.username && (
                                                                        <p className='text-red-500'>
                                                                            Nombre de usuario es requerido
                                                                        </p>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="password"><b className='formulario'>Contraseña</b></label>
                                                                <input type="password" {...register('password', { required: true })} />
                                                                {
                                                                    errors.password && (
                                                                        <p className='text-red-500'>
                                                                            Contraseña es requerida
                                                                        </p>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="telefono"><b className='formulario'>Telefono</b></label>
                                                            <input type="phone" {...register('telefono', { required: true })} />
                                                            {
                                                                errors.telefono && (
                                                                    <p className='text-red-500'>
                                                                        Telefono es requerido
                                                                    </p>
                                                                )
                                                            }
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="correo"><b className='formulario'>Correo</b></label>
                                                            <input type="email" {...register('correo', { required: true })} />
                                                            {
                                                                errors.correo && (
                                                                    <p className='text-red-500'>
                                                                        Correo es requerido
                                                                    </p>
                                                                )
                                                            }
                                                        </div>
                                                        <div className="form-group">
                                                            <button className="button" type='submit'><b className='botones'>Registrar</b></button>&nbsp;&nbsp;&nbsp;
                                                            <button onClick={handleCancel} className="button"><b className='botones'>Cancelar</b></button>
                                                        </div>
                                                        {
                                                            erroresRegistro.map((error, i) => (
                                                                <div className='bg-red-500 p-0 text-white' key={i}>
                                                                    {error}
                                                                </div>
                                                            ))
                                                        }

                                                    </div></form>
                                            )}

                                        </ul>
                                    )}
                                </li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;
