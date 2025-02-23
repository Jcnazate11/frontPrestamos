import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SidebarUser from '../../../sidebarUser/SidebarUser';
import BotWidgetUser from './bottomUser/BotWidgetUser';
import TopWidgetUser from './topUser/TopWidgetUser';
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

        <TopWidgetUser />
        <BotWidgetUser />
      </div>
    </div>
  );
}
