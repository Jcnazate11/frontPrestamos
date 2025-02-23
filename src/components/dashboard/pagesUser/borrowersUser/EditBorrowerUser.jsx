import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';

import Sidebar from '../../../sidebarUser/SidebarUser';

const EditBorrower = ({ setAuth }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const clientId = location.pathname.split('/')[2];

  const [inputs, setInputs] = useState({
    firstname: '',
    lastname: '',
    contactNumber: '',
    email: '',
    address: '',
  });

  // Obtener datos del cliente
  const getClient = async () => {
    try {
      const response = await fetch(`http://localhost:8000/client/${clientId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      const parseRes = await response.json();
      setInputs({
        firstname: parseRes.firstname || '',
        lastname: parseRes.lastname || '',
        contactNumber: parseRes.contactNumber || '',
        email: parseRes.email || '',
        address: parseRes.address || '',
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (clientId) {
      getClient();
    }
  }, [clientId]);

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const { firstname, lastname, contactNumber, address, email } = inputs;

  const showSuccessToast = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      }),
      {
        pending: 'Actualizando prestatario...',
        success: 'Actualizado exitosamente!',
        error: 'Error al actualizar!',
      },
      {
        autoClose: 1000,
      }
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { firstname, lastname, contactNumber, address, email };

      await fetch(`http://localhost:8000/clients/${clientId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body),
      });

      showSuccessToast();

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
      <ToastContainer />

      <div className='w-full h-[900px] mx-auto px-8 py-8 mb-4 border bg-white shadow-md rounded'>
        <div className='w-full px-8 pt-6 pb-8 mb-4 bg-white rounded'>
          {/* HEADER */}
          <div className='flex items-center justify-between px-4 py-5 sm:px-6 bg-red-500 rounded shadow-md'>
            <div>
              <h3 className='text-lg font-medium leading-6 text-white'>
                Actualizar Prestatario #{clientId}
              </h3>
              <p className='mt-1 max-w-2xl text-sm text-white'>
                Actualice todos los campos requeridos.
              </p>
            </div>

            {/* BOTÓN LOGOUT */}
            <button className='text-white' onClick={handleLogout}>
              <LogoutIcon />
            </button>
          </div>

          {/* FORMULARIO */}
          <form onSubmit={onSubmit} className='mt-5 p-8 h-[650px] rounded border shadow-md border-t-4 border-t-red-500'>
            <label htmlFor='firstname'>Nombre:</label>
            <input
              type='text'
              className='block border border-grey-500 w-full p-3 rounded mb-4'
              name='firstname'
              value={firstname}
              onChange={onChange}
              placeholder='Nombre'
              required
            />

            <label htmlFor='lastname'>Apellido:</label>
            <input
              type='text'
              className='block border border-grey-500 w-full p-3 rounded mb-4'
              name='lastname'
              value={lastname}
              onChange={onChange}
              placeholder='Apellido'
              required
            />

            <label htmlFor='contactNumber'>Número de contacto:</label>
            <input
              type='tel'
              className='block border border-grey-500 w-full p-3 rounded mb-4'
              name='contactNumber'
              value={contactNumber}
              onChange={onChange}
              placeholder='Número de contacto'
              required
            />

            <label htmlFor='address'>Dirección:</label>
            <input
              type='text'
              className='block border border-grey-500 w-full p-3 rounded mb-4'
              name='address'
              value={address}
              onChange={onChange}
              placeholder='Dirección'
              required
            />

            <label htmlFor='email'>Correo electrónico:</label>
            <input
              type='email'
              className='block border border-grey-500 w-full p-3 rounded mb-4'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Correo electrónico'
              required
            />

            {/* BOTONES */}
            <button type='submit' className='text-center py-3 rounded bg-red-500 text-white hover:bg-red-700 focus:outline-none my-1 w-1/5'>
              Actualizar
            </button>

            <Link to={`/borrower/${clientId}`} className='ml-5 text-center py-3 rounded bg-red-500 text-white hover:bg-red-700 focus:outline-none my-1 w-1/5 inline-block'>
              Atrás
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBorrower;
