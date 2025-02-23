import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LocationOnOutlined,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import Sidebar from '../../../sidebarUser/SidebarUser';
import LoanInfo from '../loansUser/LoanUser';

export default function Borrower({ setAuth }) {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const clientId = location.pathname.split('/')[2];

  // Función para obtener datos del prestatario
  const getClient = async () => {
    try {
      const response = await fetch(`http://localhost:8000/client/${clientId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      const parseRes = await response.json();
      console.log(parseRes);

      setName(`${parseRes.firstname} ${parseRes.lastname}`);
      setContactNumber(parseRes.contactNumber);
      setAddress(parseRes.address);
      setEmail(parseRes.email);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (clientId) {
      getClient();
    }
  }, [clientId]); // Se agregó `clientId` como dependencia para evitar llamadas innecesarias

  // Función para cerrar sesión
  const handleLogout = () => {
    setAuth(false);
    navigate('/login');
  };

  return (
    <div className='h-[900px] flex'>
      <Sidebar />

      <div className='w-full h-[900px] mx-auto px-8 py-8 mb-4 border bg-white shadow-md rounded'>
        {/* HEADER */}
        <div className='flex items-center justify-between px-4 py-5 sm:px-6 bg-red-500 rounded shadow-md'>
          {/* TITLE */}
          <div>
            <h3 className='text-lg font-medium leading-6 text-white'>
              Información del Prestatario
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-white'>
              Información del Cliente
            </p>
          </div>

          {/* BOTÓN LOGOUT */}
          <button className='text-white' onClick={handleLogout}>
            <LogoutIcon />
          </button>
        </div>

        {/* BORROWER ITEMS */}
        <div className='flex'>
          {/* ACCOUNT INFO */}
          <div className='w-1/4 h-[720px] mt-5 border rounded shadow-md border-t-4 border-t-red-500'>
            <div className='py-5 px-5'>
              <div className='flex flex-col justify-between items-center py-5 px-5'>
                <img
                  src='https://cdn3.iconfinder.com/data/icons/red-icons-1/512/Male-profile-icon-512.png'
                  alt='Profile'
                  className='w-full h-full'
                />
                {/* USER INFO */}
                <div>
                  <div className='flex items-center my-5'>
                    <PermIdentity className='text-lg' />
                    <span className='ml-2.5'>{name}</span>
                  </div>
                  <div className='flex items-center my-5'>
                    <MailOutline className='text-lg' />
                    <span className='ml-2.5'>{email}</span>
                  </div>
                  <div className='flex items-center my-5'>
                    <PhoneAndroid className='text-lg' />
                    <span className='ml-2.5'>{contactNumber}</span>
                  </div>
                  <div className='flex items-center my-5'>
                    <LocationOnOutlined className='text-lg' />
                    <span className='ml-2.5'>{address}</span>
                  </div>
                  <div className='flex items-center my-5'>
                    <Link
                      to={`/editBorrower/${clientId}`}
                      className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-center'
                    >
                      ACTUALIZAR CLIENTE
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LOAN INFO */}
          <LoanInfo />
        </div>
      </div>
    </div>
  );
}
