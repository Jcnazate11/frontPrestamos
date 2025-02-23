import React, { useState } from "react";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar que ambas contraseñas coincidan
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    // Simulación de restablecimiento (puedes conectarlo con un backend real)
    toast.success("Contraseña restablecida exitosamente", { autoClose: 1500 });

    setTimeout(() => {
      navigate("/login"); // Redirigir al login después de restablecer
    }, 2000);
  };

  return (
    <div className="flex flex-col h-auto w-[620px] border rounded-md shadow-md mx-auto my-52 justify-center flex-wrap border-t-4 border-t-red-500">
      <ToastContainer />
      <div className="px-8 pt-6 pb-2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Restablecer Contraseña</h1>
          <Link to="/login">
            <ArrowBackIosNew />
          </Link>
        </div>
        <small className="text-gray-400">
          Ingresa tu nueva contraseña y confírmala
        </small>

        <form onSubmit={handleSubmit} className="bg-white pt-4">
          {/* Nueva contraseña */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Nueva Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirmar contraseña */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirmar Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Botón de Restablecer */}
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
            type="submit"
          >
            Restablecer Contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
