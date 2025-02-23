import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const AddPayments = ({ loanId, balance, clientId }) => {
  const [inputs, setInputs] = useState({
    amount: '',
    collection_date: '',
    collected_by: '',
    new_balance: '',
    method: '',
    client_id: clientId,
    loan_id: loanId,
  });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const {
    amount,
    collection_date,
    collected_by,
    new_balance,
    method,
    client_id,
    loan_id,
  } = inputs;

  const addSuccessful = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      }),
      {
        pending: 'Adding Payment...',
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
        amount,
        collection_date,
        collected_by,
        new_balance,
        method,
        client_id,
        loan_id,
      };

      const response = await fetch(`http://localhost:8000/payments/${loanId}`, {
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

  useEffect(() => {
    const updatedBalance = balance - inputs.amount;
    setInputs((prevState) => ({
      ...prevState,
      new_balance: updatedBalance,
    }));
  }, [inputs.amount, balance]);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className='flex mt-5 px-4 py-2 h-[530px] rounded border shadow-md border-t-4 border-t-red-500 '>
      <ToastContainer />

      {/* Agregar Pago */}
      <div className='w-full '>
        <div className='flex w-full items-center justify-between border-y-2 mt-5'>
          <h3 className='text-lg font-medium leading-6 text-gray my-2  px-1 py-2 '>
            Pago del Préstamo
          </h3>
        </div>

        {/* FORMULARIO */}
        <form className='grid grid-cols-2 p-2 mt-2 ' onSubmit={onSubmit}>
          <div className='flex w-full '>
            {/* ID DEL CLIENTE */}
            <div className='w-auto'>
              <label htmlFor='client_id'>ID del Cliente:</label>
              <input
                type='number'
                className='block border border-grey-500 p-3 rounded mb-4 mr-5'
                name='client_id'
                value={clientId}
                disabled
              />
            </div>

            {/* COMPROBANTE */}
            <div className='w-auto'>
              <label htmlFor='loan_id'>Comprobante:</label>
              <input
                type='number'
                className='block border border-grey-500 p-3 rounded mb-4'
                placeholder='Número de Comprobante'
                name='loan_id'
                value={loanId}
                disabled
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>

          {/* FECHA DE COBRO */}
          <div>
            <label htmlFor='collection_date'>Fecha de Cobro:</label>
            <input
              type='date'
              className='block border border-grey-500 w-10/12 p-3 rounded mb-4'
              placeholder='Fecha de Cobro'
              name='collection_date'
              value={collection_date}
              onChange={(e) => onChange(e)}
            />
          </div>

          {/* MONTO */}
          <div>
            <label htmlFor='amount'>Monto:</label>
            <input
              type='number'
              className='block border border-grey-500 w-10/12 p-3 rounded mb-4'
              placeholder='Monto'
              name='amount'
              value={amount}
              onChange={(e) => onChange(e)}
            />
          </div>

          {/* COBRADO POR */}
          <div>
            <label htmlFor='collected_by'>Cobrado por:</label>
            <input
              type='text'
              className='block border border-grey-500 w-10/12 p-3 rounded mb-4'
              placeholder='Cobrado por'
              name='collected_by'
              value={collected_by}
              onChange={(e) => onChange(e)}
            />
          </div>

          {/* NUEVO SALDO */}
          <div>
            <label htmlFor='new_balance'>Nuevo Saldo:</label>
            <input
              type='number'
              className='block border border-grey-500 w-10/12 p-3 rounded mb-4'
              name='new_balance'
              value={inputs.new_balance}
              onChange={(e) => onChange(e)}
            />
          </div>

          {/* MÉTODO DE PAGO */}
          <div>
            <label htmlFor='terms'>Método de Pago:</label>
            <select
              className='block border border-grey-500 w-10/12 p-3 rounded mb-4'
              name='method'
              id='method'
              value={method}
              onChange={(e) => {
                onChange(e);
              }}
            >
              <option value='ATM'>Cajero Automático (ATM)</option>
              <option value='OTC'>Pago en Ventanilla (OTC)</option>
              <option value='ONLINE BANK'>Banca en Línea</option>
              <option value='GCASH'>GCASH</option>
            </select>
          </div>

          {/* BOTONES */}
          <div>
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-auto ml-auto '
              type='submit'
            >
              Agregar Pago
            </button>
            <button
              onClick={goBack}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/5 ml-10'
            >
              Regresar
            </button>
          </div>
        </form>
      </div>
    </div>
);

};

export default AddPayments;
