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
    paymentMethod: 'francés', // Método de pago predeterminado (Método Francés)
  });

  const [loanDetails, setLoanDetails] = useState({
    monthlyPayment: 0,
    capital: 0,
    interest: 0,
    insurance: 0,
    totalInterest: 0,
    totalInsurance: 0,
    totalToPay: 0,
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
    paymentMethod,
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
        success: 'Added Successfully!',
        error: 'Error!',
      },
      {
        autoClose: 1000,
      }
    );
  };

  const calculateLoanDetails = () => {
    const loanAmount = parseFloat(gross_loan) || 0;
    const termMonths = parseInt(terms) || 0;
    const interestRate = 0.05; // Tasa de interés referencial del 5%
    let monthlyPayment = 0;
    let totalInterest = 0;

    if (paymentMethod === 'francés') {
      // Método Francés (cuotas fijas)
      monthlyPayment =
        loanAmount * (interestRate / 12) / (1 - Math.pow(1 + interestRate / 12, -termMonths));
      totalInterest = monthlyPayment * termMonths - loanAmount;
    } else {
      // Método Alemán (cuotas decrecientes)
      const monthlyInterest = loanAmount * interestRate / 12;
      const principalRepayment = loanAmount / termMonths;
      monthlyPayment = principalRepayment + monthlyInterest;
      totalInterest = monthlyInterest * termMonths;
    }

    const insurance = loanAmount * 0.01; // Suponiendo un seguro de 1% del capital
    const totalInsurance = insurance * termMonths;
    const totalToPay = loanAmount + totalInterest + totalInsurance;

    // Actualizar el estado con los detalles calculados
    setLoanDetails({
      monthlyPayment: monthlyPayment.toFixed(2),
      capital: loanAmount.toFixed(2),
      interest: totalInterest.toFixed(2),
      insurance: totalInsurance.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalInsurance: totalInsurance.toFixed(2),
      totalToPay: totalToPay.toFixed(2),
    });
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
              Solicita un Préstamo.
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
          className='mt-5 p-8 rounded border shadow-md grid grid-cols-2 gap-6'
          onSubmit={onSubmit}
        >
          {/* Columna derecha - Detalles de Crédito y Botones */}
          <div className='flex flex-col space-y-6'>
            {/* Detalles del préstamo calculado */}
            <div className='p-5 border rounded shadow-md'>
              <h3 className='text-lg font-medium'>Detalles del Crédito</h3>
              <p><strong>Pagos Mensuales:</strong> ${loanDetails.monthlyPayment}</p>
              <p><strong>Capital:</strong> ${loanDetails.capital}</p>
              <p><strong>Interés:</strong> ${loanDetails.interest}</p>
              <p><strong>Duración:</strong> {terms} meses</p>
              <p><strong>Tasa de Interés:</strong> 5%</p>
              <p><strong>Detalle de tu Crédito:</strong></p>
              <p><strong>Capital:</strong> ${loanDetails.capital}</p>
              <p><strong>Total de Interés:</strong> ${loanDetails.totalInterest}</p>
              <p><strong>Total a Pagar:</strong> ${loanDetails.totalToPay}</p>
              <p className='text-xs text-gray-500'>*Valores referenciales, no son considerados como una oferta formal de préstamo. La oferta definitiva está sujeta al cumplimiento de las condiciones y políticas referentes a capacidad de pago.</p>
            </div>

            {/* Botones de Acción */}
            <div className='flex space-x-4'>
              <button
                className='bg-red-500 text-white font-bold py-2 px-4 rounded'
                type='submit'
              >
                Solicitar Préstamo
              </button>
              <button
                className='bg-red-500 text-white font-bold py-2 px-4 rounded'
                onClick={() => navigate('/LoansUser')}
              >
                Volver
              </button>
            </div>
          </div>

          {/* Columna izquierda - Formulario de Solicitud */}
          <div className='space-y-6'>
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
                <option value='Business Loan'>Préstamo Comercial</option>
              </select>
            </div>

            {/* PRÉSTAMO BRUTO */}
            <div>
              <label htmlFor='gross_loan'>Cantidad de Préstamo:</label>
              <input
                type='number'
                className='block border border-grey-500 w-10/12 p-3 rounded mb-4'
                placeholder='Préstamo Bruto'
                name='gross_loan'
                value={gross_loan}
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
                onChange={(e) => onChange(e)}
              >
                <option value='3'>3 meses</option>
                <option value='6'>6 meses</option>
                <option value='12'>12 meses</option>
                <option value='18'>18 meses</option>
                <option value='24'>24 meses</option>
                <option value='36'>36 meses</option>
              </select>
            </div>

            {/* MÉTODO DE PAGO */}
            <div>
              <label htmlFor='paymentMethod'>Método de Pago:</label>
              <select
                className='block border border-grey-500 w-10/12 p-3 rounded mb-4'
                name='paymentMethod'
                value={paymentMethod}
                onChange={(e) => onChange(e)}
              >
                <option value='francés'>Método Francés</option>
                <option value='alemán'>Método Alemán</option>
              </select>
            </div>

            {/* BOTÓN CALCULAR */}
            <div>
              <button
                type='button'
                onClick={calculateLoanDetails}
                className='bg-red-500 text-white font-bold py-2 px-4 rounded'
              >
                Calcular
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLoansUser;
