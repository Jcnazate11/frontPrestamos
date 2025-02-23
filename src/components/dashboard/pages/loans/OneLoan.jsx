import { DeleteForever, Edit, Update } from '@mui/icons-material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PaymentsInfo from '../payments/ListPayments';

const OneLoan = () => {
  const [loans, setLoans] = useState([]);

  const location = useLocation();

  const loanID = location.pathname.split('/')[2];

  const GetLoans = async () => {
    try {
      const response = await fetch(`http://localhost:8000/loan/${loanID}`, {
        method: 'GET',
        headers: { Authorization: localStorage.getItem('token') },
      });

      const parseRes = await response.json();

      setLoans(parseRes);
      console.log(loans);
      // console.log(loanId);
    } catch (error) {
      console.log(error.message);
    }
  };
  // console.log(loanId);

  useEffect(() => {
    GetLoans();
  }, []);

  return (
    <div>
      {/* Información del Préstamo */}
      <div className='mt-5 px-4 py-2 h-[180px] rounded border shadow-md border-t-4 border-t-red-500 '>
        {/* Préstamos Activos */}
        <div>
          <div className='flex items-center justify-between border-y-2 '>
            <h3 className='text-lg font-medium leading-6 text-gray my-2 px-1 py-2 '>
              Información del Préstamo
            </h3>
          </div>
          <table className='table-fixed text-center '>
            <thead>
              <tr>
                <th className='w-1/1 px-1 py-2 text-gray-600'>Comprobante</th>
                <th className='w-1/6 px-1 py-2 text-gray-600'>Tipo de Préstamo</th>
                <th className='w-1/6 px-1 py-2 text-gray-600'>Saldo Pendiente</th>
                <th className='w-1/6 px-4 py-2 text-gray-600'>Préstamo Bruto</th>
                <th className='w-1/6 px-4 py-2 text-gray-600'>Amortización</th>
                <th className='w-1/6 px-4 py-2 text-gray-600'>Plazo</th>
                <th className='w-1/6 px-4 py-2 text-gray-600'>Fecha de Desembolso</th>
                <th className='w-1/6 px-4 py-2 text-gray-600'>Estado</th>
              </tr>
            </thead>
            <tbody>
              {loans.length <= 0 ? (
                <tr className='border px-4 py-2 bg-red-50'>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className='px-4 py-2 bg-red-50'>No hay datos de préstamo</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ) : (
                <tr>
                  <td className='border px-4 py-2 bg-gray-50'>{loans.id}</td>
                  <td className='border px-4 py-2'>{loans.type}</td>
                  <td className='border px-4 py-2 bg-gray-50'>
                    ₱ {loans.balance}
                  </td>
                  <td className='border px-4 py-2 '>₱ {loans.gross_loan}</td>
                  <td className='border px-4 py-2 bg-gray-50'>
                    ₱ {loans.amort}
                  </td>
                  <td className='border px-4 py-2 '>{loans.terms} mes(es)</td>
                  <td className='border px-4 py-2 bg-gray-50'>
                    {new Date(loans.date_released).toDateString()}
                  </td>
                  <td className='border px-4 py-2 '>
                    {loans.status === 'Approved' ||
                    loans.status === 'Fully Paid' ? (
                      <span className=' bg-green-500 text-white px-4 py-1 rounded-md'>
                        {loans.status === 'Approved' ? 'Aprobado' : 'Pagado en su Totalidad'}
                      </span>
                    ) : loans.status === 'Declined' ? (
                      <span className=' bg-red-400 text-white px-4 py-1 rounded-md'>
                        Rechazado
                      </span>
                    ) : loans.status === 'Pending' ? (
                      <span className=' bg-yellow-300 text-white px-4 py-1 rounded-md'>
                        Pendiente
                      </span>
                    ) : (
                      <span className=' bg-orange-300 text-white px-4 py-1 rounded-md'>
                        {loans.status}
                      </span>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
);

};

export default OneLoan;
