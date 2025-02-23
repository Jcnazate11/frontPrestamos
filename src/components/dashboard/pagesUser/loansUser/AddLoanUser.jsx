import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';

import SidebarUser from '../../../sidebarUser/SidebarUser';

const AddLoanUser = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
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
    type,
    gross_loan,
    balance,
    amort,
    terms,
    date_released,
    maturity_date,
  } = inputs;

  const navigate = useNavigate();
  const location = useLocation();

  const clientId = location.pathname.split('/')[2];

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
      const body = {
        type,
        gross_loan,
        balance,
        amort,
        terms,
        date_released,
        maturity_date,
      };

      const response = await fetch(`http://localhost:8000/loans/${clientId}`, {
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
        navigate(-1);
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };


    return (
      <div className='flex h-[900px]'>
        <SidebarUser />
        <ToastContainer />
  
        {/* Agregar Préstamo */}
        <div className='w-full h-[900px] mx-auto px-8 py-8 mb-4 border bg-white shadow-md rounded'>
          {/* TÍTULO */}
          <div className='flex items-center justify-between px-4 py-5 sm:px-6 bg-red-500 rounded shadow-md '>
            <div>
              <h3 className='text-lg font-medium leading-6 text-white'>
                Agregar préstamo para el cliente #{clientId}
              </h3>
              <p className='mt-1 max-w-2xl text-sm text-white'>
                Llene todos los campos obligatorios.
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
            className='grid grid-cols-2 mt-5 p-8 h-[650px] rounded border shadow-md border-t-4 border-t-red-500 '
            onSubmit={onSubmit}
          >
            {/* TIPO DE PRÉSTAMO */}
            <div>
              <label htmlFor='type'>Tipo de préstamo:</label>
              <select
                className='block border border-grey-500 w-10/12 p-3 rounded'
                name='type'
                id='type'
                value={type}
                onChange={(e) => {
                  onChange(e);
                }}
              >
                <option value='Personal Loan'>Préstamo personal</option>
                <option value='Salary Loan'>Préstamo de salario</option>
                <option value='Business Loan'>Préstamo comercial</option>
              </select>
            </div>
  
            {/* ESTADO */}
            <div>
              <label htmlFor='maturity_date'>Estado:</label>
              <input
                className='block border border-grey-500 w-10/12 p-3 rounded'
                name='status'
                id='status'
                value='Pendiente'
                disabled
              />
            </div>
  
            {/* PRÉSTAMO BRUTO */}
            <div>
              <label htmlFor='gross_loan'>Préstamo Bruto:</label>
              <input
                type='number'
                className='block border border-grey-500 w-10/12 p-3 rounded'
                placeholder='Préstamo Bruto'
                name='gross_loan'
                value={gross_loan}
                onChange={(e) => onChange(e)}
              />
            </div>
  
            {/* BALANCE */}
            <div>
              <label htmlFor='gross_loan'>Balance:</label>
              <input
                type='number'
                className='block border border-grey-500 w-10/12 p-3 rounded'
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
                className='block border border-grey-500 w-10/12 p-3 rounded '
                placeholder='Amortización'
                name='amort'
                value={amort}
                onChange={(e) => onChange(e)}
              />
            </div>
  
            {/* PLAZOS */}
            <div>
              <label htmlFor='terms'>Plazo:</label>
              <select
                className='block border border-grey-500 w-10/12 p-3 rounded '
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
              <label htmlFor='date_released'>Fecha de desembolso:</label>
              <input
                type='datetime-local'
                className='block border border-grey-500 w-10/12 p-3 rounded '
                placeholder='Fecha de desembolso'
                name='date_released'
                value={date_released}
                onChange={(e) => onChange(e)}
              />
            </div>
  
            {/* FECHA DE VENCIMIENTO */}
            <div>
              <label htmlFor='maturity_date'>Fecha de vencimiento:</label>
              <input
                type='date'
                className='block border border-grey-500 w-10/12 p-3 rounded '
                placeholder='Fecha de vencimiento'
                name='maturity_date'
                value={maturity_date}
                onChange={(e) => onChange(e)}
              />
            </div>
  
            {/* BOTONES */}
            <div>
              <button
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-auto ml-auto '
                type='submit'
              >
                Agregar Nuevo Préstamo
              </button>
              <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/5 ml-10'>
                <Link to={`/borrowerUser/${clientId}`}>Cancelar</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
  );
  
};

export default AddLoanUser;
