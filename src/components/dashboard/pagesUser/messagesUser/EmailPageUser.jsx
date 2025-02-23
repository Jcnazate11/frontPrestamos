import React, { useState, useEffect } from 'react';
import SidebarUser from '../../../sidebarUser/SidebarUser';
import { Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const EmailPageUser = ({ setAuth }) => {
  const [amortization, setAmortization] = useState([]);

  // Function to fetch amortization data (example API call)
  const GetAmortization = async () => {
    try {
      const response = await fetch('http://localhost:8000/amortizationData/', {
        method: 'GET',
        headers: { Authorization: localStorage.getItem('token') },
      });

      const parseRes = await response.json();
      setAmortization(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    GetAmortization();
  }, []);

  return (
    <div className='flex h-[900px]'>
      <SidebarUser />
      <div className='w-full h-[900px] mx-auto px-8 py-8 mb-4 border bg-white shadow-md rounded'>
        {/* HEADER */}
        <div className='flex items-center justify-between px-4 py-5 sm:px-6 bg-red-500 rounded shadow-md'>
          {/* TITLE */}
          <div>
            <h3 className='text-lg font-medium leading-6 text-white'>
              Tabla de Amortización
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-white'>
              Visualice los detalles de su Préstamo
            </p>
          </div>

          {/* LOGOUT BUTTON */}
          <div className='text-white'>
            <button
              onClick={() => {
                setAuth(false);
              }}
            >
              <Link to='/login'>
                <Logout />
              </Link>
            </button>
          </div>
        </div>

        {/* AMORTIZATION TABLE */}
        <div className='w-full h-[650px] px-4 overflow-auto mt-5 border rounded shadow-md border-t-4 border-t-red-500'>
          <table className='table-fixed w-full text-center'>
            <thead>
              <tr>
                <th className='w-1/6 px-4 py-2 text-gray-600'>Cuotas</th>
                <th className='w-1/6 px-4 py-2 text-gray-600'>Fecha de Pago</th>
                <th className='w-1/6 px-4 py-2 text-gray-600'>Capital</th>
                <th className='w-1/6 px-4 py-2 text-gray-600'>Interés</th>
                <th className='w-1/6 px-4 py-2 text-gray-600'>Valor de la Cuota</th>
                <th className='w-1/6 px-4 py-2 text-gray-600'>Saldo</th>
                <th className='w-1/6 px-4 py-2 text-gray-600'>Acción</th>
              </tr>
            </thead>
            <tbody>
              {amortization.length <= 0 ? (
                <tr className='border px-4 py-2 bg-red-50'>
                  <td colSpan="6" className='px-4 py-2 bg-red-50'>No hay datos de amortización</td>
                </tr>
              ) : (
                amortization.map((amort, index) => (
                  <tr key={index}>
                    <td className='border px-4 py-2 bg-gray-50'>{amort.cuotas}</td>
                    <td className='border px-4 py-2'>{new Date(amort.fecha_pago).toDateString()}</td>
                    <td className='border px-4 py-2'>₱ {amort.capital}</td>
                    <td className='border px-4 py-2'>{amort.interes}</td>
                    <td className='border px-4 py-2 bg-gray-50'>₱ {amort.valor_cuota}</td>
                    <td className='border px-4 py-2'>{amort.saldo}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmailPageUser;
