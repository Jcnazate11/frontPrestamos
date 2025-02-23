import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SidebarUser from '../../../sidebarUser/SidebarUser';
import { Logout as LogoutIcon, PermIdentity } from '@mui/icons-material';

export default function HomeUser({ setAuth }) {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // Función para obtener el perfil del usuario
  const getProfile = async () => {
    try {
      const response = await fetch('http://localhost:8000/profile', {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      const parseRes = await response.json();

      setName(parseRes.firstname + ' ' + parseRes.lastname);
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    setAuth(false);
    navigate('/login');
  };

  return (
    <div className='flex h-[900px]'>
      <SidebarUser />
      <div className='w-full px-8 py-8 pb-8 mb-4 bg-white border rounded shadow-md h-[900px]'>
        {/* HOME ITEMS */}
        <div className='px-4 py-5 sm:px-6 rounded shadow-md bg-red-500 flex justify-between items-center'>
          <div>
            <h3 className='text-xl font-medium leading-6 text-white'>
              BIENVENIDO {name}
            </h3>
            <span className='text-md font-medium leading-6 text-white'>
              Iniciado sesión: {new Date().toLocaleTimeString()}
            </span>
          </div>

          <div className='flex items-center'>
            {/* ADMIN PAGE */}
            <Link to='/admin' className='hover:-translate-y-0.5 text-white mr-4'>
              <PermIdentity />
            </Link>

            {/* LOGOUT */}
            <button
              className='hover:-translate-y-0.5 text-white'
              onClick={handleLogout}
            >
              <LogoutIcon />
            </button>
          </div>
          
          <span className='text-lg font-medium leading-6 text-white'>
            {new Date().toLocaleString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>

        {/* Bienvenida y funcionalidades de préstamos */}
        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">¡Solicita tu préstamo ahora!</h3>
          <p className="text-md text-gray-600 text-center mb-6">
            En nuestra institución, te ofrecemos soluciones financieras adaptadas a tus necesidades. Accede fácilmente a préstamos con condiciones favorables, rapidez y seguridad.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-red-500 text-white rounded-lg p-6">
              <h4 className="font-semibold text-xl mb-3">Préstamos rápidos y fáciles</h4>
              <p>Realiza tu solicitud de préstamo en minutos, con respuesta inmediata. ¡Sin complicaciones ni papeleo!</p>
            </div>
            <div className="bg-red-500 text-white rounded-lg p-6">
              <h4 className="font-semibold text-xl mb-3">Tasas de interés competitivas</h4>
              <p>Obtén préstamos con tasas de interés bajas, lo que te permitirá pagar cómodamente a lo largo del tiempo.</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              to="/LoansUser"
              className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
            >
              ¡Solicita tu préstamo ahora!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
