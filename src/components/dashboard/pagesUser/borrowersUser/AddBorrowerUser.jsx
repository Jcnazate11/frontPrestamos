import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Sidebar from '../../../sidebarUser/SidebarUser';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBorrower = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    firstname: '',
    lastname: '',
    contactNumber: '',
    email: '',
    address: '',
    username: '',
  });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const { firstname, lastname, contactNumber, address, email, username } = inputs;

  const addSuccessful = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      }),
      {
        pending: 'Adding Borrower...',
        success: 'Added Successfully!',
        error: 'Error!',
      },
      {
        autoClose: 1000,
      }
    );
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { firstname, lastname, contactNumber, address, email, username };

      const response = await fetch('http://localhost:8000/addClient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body),
      });

      await response.json();
      addSuccessful();

      setTimeout(() => {
        navigate(-1);
      }, 3000);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = () => {
    setAuth(false);
    navigate('/login');
  };

  return (
    <div className='flex h-[900px]'>
      <Sidebar />

      <div className='w-full h-[900px] border bg-white shadow-md rounded'>
        <div className='w-full px-8 pt-6 pb-8 mb-4 bg-white rounded'>
          {/* HEADER */}
          <div className='flex items-center justify-between px-4 py-5 sm:px-6 bg-red-500 rounded shadow-md'>
            {/* TITLE */}
            <div>
              <h3 className='text-lg font-medium leading-6 text-white'>
                Añadir nuevo prestatario
              </h3>
              <p className='mt-1 max-w-2xl text-sm text-white'>
                Registre todos los campos requeridos.
              </p>
            </div>
            <ToastContainer />

            {/* LOGOUT BUTTON */}
            <button className='text-white' onClick={handleLogout}>
              <LogoutIcon />
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={onSubmit} className='mt-5 p-8 rounded border shadow-md border-t-4 border-t-red-500'>
            <label htmlFor='firstname'>Nombre: </label>
            <input
              type='text'
              className='block border border-grey-500 w-full p-3 rounded mb-4'
              name='firstname'
              value={firstname}
              onChange={onChange}
              placeholder='Nombre'
              required
            />

            <label htmlFor='lastname'>Apellido: </label>
            <input
              type='text'
              className='block border border-grey-500 w-full p-3 rounded mb-4'
              name='lastname'
              value={lastname}
              onChange={onChange}
              placeholder='Apellido'
              required
            />

            <label htmlFor='contactNumber'>Contacto: </label>
            <input
              type='tel'
              className='block border border-grey-500 w-full p-3 rounded mb-4'
              name='contactNumber'
              value={contactNumber}
              onChange={onChange}
              placeholder='Contacto'
              required
            />

            <label htmlFor='email'>Email: </label>
            <input
              type='email'
              className='block border border-grey-500 w-full p-3 rounded mb-4'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Email'
              required
            />

            <button type='submit' className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
              Guardar
            </button>
            <Link to='/borrowersUser' className='ml-4 text-red-500 underline'>
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBorrower;
