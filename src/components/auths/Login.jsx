import React, { useState } from 'react';
import { ArrowBackIosNew } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    correo: '',
    contrasena: '',
  });

  const { correo, contrasena } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const loginSuccessful = () => {
    toast.success('Inicio de sesión exitoso!', { autoClose: 1000 });

    setTimeout(() => {
      setAuth(true);
    }, 1500);
  };

  const loginFailed = (message) => {
    toast.error(message || 'Correo o contraseña incorrectos!', { autoClose: 2000 });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { correo, contrasena };

      const response = await fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (response.ok && parseRes.token) {
        localStorage.setItem('token', parseRes.token);
        loginSuccessful();
      } else {
        loginFailed(parseRes.message);
      }
    } catch (error) {
      console.error(error);
      loginFailed('Error en la conexión con el servidor');
    }
  };

  return (
    <div className='flex flex-col h-auto w-[620px] border rounded-md shadow-md mx-auto my-52 justify-center flex-wrap border-t-4 border-t-red-500'>
      <ToastContainer />
      <div className=''>
        <div className='flex justify-between items-center px-8 pt-6 pb-2'>
          <div>
            <h1 className='text-xl font-semibold'>Bienvenido de nuevo</h1>
            <small className='text-gray-400'>
              Ingresa tus credenciales para continuar
            </small>
          </div>

          <div className='ml-8'>
            <Link to='/'>
              <ArrowBackIosNew />
            </Link>
          </div>
        </div>

        <form onSubmit={onSubmit} className='bg-white px-8 pt-6 pb-8'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='correo'>
              Correo electrónico
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='correo'
              type='email'
              placeholder='correo@example.com'
              name='correo'
              value={correo}
              onChange={onChange}
            />
          </div>

          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='contrasena'>
              Contraseña
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='contrasena'
              type='password'
              placeholder='************'
              name='contrasena'
              value={contrasena}
              onChange={onChange}
            />
          </div>

          <div className='flex flex-col items-center justify-between gap-5'>
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
              type='submit'
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
