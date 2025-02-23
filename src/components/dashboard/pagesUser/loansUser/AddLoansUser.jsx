import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';

import SidebarUser from '../../../sidebarUser/SidebarUser';

const AddLoansUser = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    client_id: '',
    status: '',
    type: '',
    gross_loan: '',
    balance: '',
    amort: '',
    terms: '',
    date_released: '',
    maturity_date: '',
  });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const {
    client_id,
    status,
    type,
    gross_loan,
    balance,
    amort,
    terms,
    date_released,
    maturity_date,
  } = inputs;

  const navigate = useNavigate();
  const addSuccessful = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      }),
      {
        pending: 'Adding Loan...',
        success: 'Added Succesfully!',
        error: 'Error!',
      },
      {
        autoClose: 1000,
      }
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const timenow = new Date();
      const formatTime = (t) => {
        const x = new Date(t);
        let hour = x.getHours();

        if (hour < 10) {
          hour = '0' + hour;
        }
        let min = x.getMinutes();
        if (min < 10) {
          min = '0' + min;
        }

        let sec = x.getSeconds();
        if (sec < 10) {
          sec = '0' + sec;
        }

        return hour + ':' + min + ':' + sec;
      };

      console.log(formatTime(timenow));
      const timestamp = date_released + ' ' + formatTime(timenow);

      const body = {
        client_id,
        type,
        status,
        gross_loan,
        balance,
        amort,
        terms,
        date_released,
        maturity_date,
      };

      const response = await fetch(`http://localhost:8000/loans`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      addSuccessful();

      setTimeout(() => {
        navigate(`/Borrower/${client_id}`);
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='h-[900px] flex'>
      <SidebarUser />
      <ToastContainer />
      <div className='w-full h-[900px] mx-auto px-8 py-8 mb-4 border bg-white shadow-md rounded '>
        {/* ENCABEZADO */}
        <div className='flex items-center justify-between px-4 py-5 sm:px-6 bg-red-500 rounded shadow-md'>
          <div>
            <h3 className='text-lg font-medium leading-6 text-white'>
              Agregar Nuevo Préstamo
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-white'>
              Registre un préstamo para un cliente.
            </p>
          </div>

          {/* BOTÓN DE CERRAR SESIÓN */}
          <div className='text-white'>
            <button
              className=''
              onClick={(e) => {
                setAuth(false);
              }}
            >
              <Link to='/login'>
                <Logout />
              </Link>
            </button>
          </div>
        </div>

        {/* FORMULARIO */}
        <form
          className='mt-5 p-8 rounded border shadow-md grid grid-cols-2 border-t-4 border-t-red-500'
          onSubmit={onSubmit}
        >
          {/* ID DEL CLIENTE */}
          <div>
            <label htmlFor='client_id'>ID del Cliente:</label>
            <input
              type='number'
              className='block border border-grey-500 w-10/12 p-3 rounded mb-4'
              placeholder='ID del Cliente'
              name='client_id'
              value={client_id}
              onChange={(e) => onChange(e)}
            />
          </div>

          {/* TIPO DE PRÉSTAMO */}
          <div>
            <label htmlFor='type'>Tipo de Préstamo:</label>
            <select
              className='block border border-grey-500 w-10/12 p-3 rounded mb-4'
              name='type'
              id='type'
              value={type}
              onChange={(e) => {
                onChange(e);
              }}
            >
              <option value='Personal Loan'>Préstamo Personal</option>
              <option value='Salary Loan'>Préstamo de Salario</option>
              <option value='Business Loan'>Préstamo Comercial</option>
            </select>
          </div>

          {/* ESTADO */}
          <div>
            <label htmlFor='status'>Estado:</label>
            <select
              className='block border border-grey-500 w-10/12 p-3 rounded mb-4'
              name='status'
              id='status'
              value={status}
              onChange={(e) => {
                onChange(e);
              }}
            >
              <option value='Approved'>Aprobado</option>
              <option value='Fully Paid'>Pagado</option>
              <option value='Disbursed'>Desembolsado</option>
              <option value='Pending'>Pendiente</option>
              <option value='Declined'>Rechazado</option>
            </select>
          </div>

          {/* PRÉSTAMO BRUTO */}
          <div>
            <label htmlFor='gross_loan'>Préstamo Bruto:</label>
            <input
              type='number'
              className='block border border-grey-500 w-10/12 p-3 rounded mb-4'
              placeholder='Préstamo Bruto'
              name='gross_loan'
              value={gross_loan}
              onChange={(e) => onChange(e)}
            />
          </div>

          {/* BALANCE */}
          <div>
            <label htmlFor='balance'>Balance:</label>
            <input
              type='number'
              className='block border border-grey-500 w-10/12 p-3 rounded mb-4'
              placeholder='Balance'
              name='balance'
              value={balance}
              onChange={(e) => onChange(e)}
            />
          </div>

          {/* AMORTIZACIÓN */}
          <div>
            <label htmlFor='amort'>Amortización:</label>
            <input
              type='number'
              className='block border border-grey-500 w-10/12 p-3 rounded mb-4'
              placeholder='Amortización'
              name='amort'
              value={amort}
              onChange={(e) => onChange(e)}
            />
          </div>

          {/* PLAZO */}
          <div>
            <label htmlFor='terms'>Plazo:</label>
            <select
              className='block border border-grey-500 w-10/12 p-3 rounded mb-4'
              name='terms'
              id='terms'
              value={terms}
              onChange={(e) => {
                onChange(e);
              }}
            >
              <option value='1'>1 Mes</option>
              <option value='2'>2 Meses</option>
              <option value='3'>3 Meses</option>
              <option value='4'>4 Meses</option>
              <option value='5'>5 Meses</option>
              <option value='6'>6 Meses</option>
              <option value='12'>12 Meses</option>
            </select>
          </div>

          {/* FECHA DE DESEMBOLSO */}
          <div>
            <label htmlFor='date_released'>Fecha de Desembolso:</label>
            <input
              type='datetime-local'
              className='block border border-grey-500 w-10/12 p-3 rounded mb-4'
              placeholder='Fecha de Desembolso'
              name='date_released'
              value={date_released}
              onChange={(e) => onChange(e)}
            />
          </div>

          {/* FECHA DE VENCIMIENTO */}
          <div>
            <label htmlFor='maturity_date'>Fecha de Vencimiento:</label>
            <input
              type='date'
              className='block border border-grey-500 w-10/12 p-3 rounded mb-4'
              placeholder='Fecha de Vencimiento'
              name='maturity_date'
              value={maturity_date}
              onChange={(e) => onChange(e)}
            />
          </div>

          {/* BOTONES */}
          <div className='mt-10'>
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-auto ml-auto'
              type='submit'
            >
              Agregar Nuevo Préstamo
            </button>
            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/5 ml-10'>
              <Link to={`/loansUser`}>Cancelar</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
);

};

export default AddLoansUser;
