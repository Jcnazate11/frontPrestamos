import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteForever, VisibilityOutlined } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast, ToastContainer } from 'react-toastify';

import Sidebar from '../../../sidebarUser/SidebarUser';

const Borrowers = ({ setAuth }) => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  // Obtener clientes
  const getClients = async () => {
    try {
      const response = await fetch('http://localhost:8000/allClients', {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      const parseRes = await response.json();
      setClients(parseRes);
    } catch (error) {
      console.error(error);
    }
  };

  // Notificación de eliminación
  const deleteNotif = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      }),
      {
        pending: 'Eliminando cliente...',
        success: 'Cliente eliminado con éxito!',
        error: 'Error al eliminar!',
      },
      { autoClose: 2000 }
    );
  };

  // Función para eliminar cliente
  async function deleteClient(id) {
    try {
      await fetch(`http://localhost:8000/clients/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      deleteNotif();

      setTimeout(() => {
        setClients((prevClients) => prevClients.filter((client) => client.id !== id));
      }, 2000);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getClients();
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    setAuth(false);
    navigate('/login');
  };

  return (
    <div className='text-gray-900 h-[900px] flex'>
      <Sidebar />
      <ToastContainer />

      <div className='w-full h-[900px] mx-auto px-8 py-8 mb-4 border bg-white shadow-md rounded'>
        {/* HEADER */}
        <div className='flex items-center justify-between px-4 py-5 sm:px-6 bg-red-500 rounded shadow-md'>
          <div>
            <h3 className='text-lg font-medium leading-6 text-white'>Prestatarios</h3>
            <p className='mt-1 max-w-2xl text-sm text-white'>Todos los clientes registrados</p>
          </div>

          {/* BOTÓN LOGOUT */}
          <button className='text-white' onClick={handleLogout}>
            <LogoutIcon />
          </button>
        </div>

        {/* TÍTULO Y BOTÓN AÑADIR */}
        <div className='flex items-center justify-between border-y-2 mt-5'>
          <h3 className='text-lg font-medium leading-6 text-gray my-2 px-1 py-2'>Lista de Prestatarios</h3>
          <Link
            to='/addBorrower'
            className='border hover:bg-red-700 bg-red-500 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline w-auto mt-2 mr-5'
          >
            Añadir Prestatario
          </Link>
        </div>

        {/* TABLA DE CLIENTES */}
        <div className='w-full h-[640px] px-4 mt-5 overflow-auto hover:overflow-scroll border rounded shadow-md border-t-4 border-t-red-500'>
          <table className='table-fixed text-center mb-2 w-full'>
            <thead>
              <tr>
                <th className='w-1/6 px-1 py-2 text-gray-600'>ID</th>
                <th className='w-1/4 px-1 py-2 text-gray-600'>Nombre Completo</th>
                <th className='w-1/4 px-1 py-2 text-gray-600'>Contacto</th>
                <th className='w-1/4 px-4 py-2 text-gray-600'>Dirección</th>
                <th className='w-1/4 px-1 py-2 text-gray-600'>Email</th>
                <th className='w-1/6 px-1 py-2 text-gray-600'>Acción</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr className='border px-4 py-2 bg-red-50'>
                  <td colSpan='6' className='px-4 py-2 bg-red-50 text-center'>
                    Sin datos del cliente
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id}>
                    <td className='border px-4 py-2 bg-gray-50'>{client.id}</td>
                    <td className='border px-4 py-2'>{client.firstname + ' ' + client.lastname}</td>
                    <td className='border px-4 py-2 bg-gray-50'>{client.contactNumber}</td>
                    <td className='border px-4 py-2'>{client.address}</td>
                    <td className='border px-4 py-2 bg-gray-50'>{client.email}</td>
                    <td className='border px-4 py-2'>
                      <button
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline w-full text-sm'
                        onClick={() => deleteClient(client.id)}
                      >
                        <DeleteForever className='text-lg' />
                      </button>
                      <Link
                        to={`/BorrowerUser/${client.id}`}
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-sm flex items-center justify-center'
                      >
                        <VisibilityOutlined className='text-sm' />
                      </Link>
                    </td>
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

export default Borrowers;
