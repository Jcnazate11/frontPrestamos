import React, { useState } from "react";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email); // Expresión regular para validar emails
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Por favor, ingresa tu correo");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Ingresa un correo válido");
      return;
    }

    // Simulación de envío de recuperación (puedes conectarlo con un backend real)
    toast.success("Correo de recuperación enviado", { autoClose: 2000 });

    setTimeout(() => {
      navigate("/reset-password"); // Redirige a la página de restablecimiento de contraseña
    }, 2500);
  };

  return (
    <div className="flex flex-col h-auto w-[620px] border rounded-md shadow-md mx-auto my-52 justify-center flex-wrap border-t-4 border-t-red-500">
      <ToastContainer />
      <div className="px-8 pt-6 pb-2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Recuperar Contraseña</h1>
          <Link to="/login">
            <ArrowBackIosNew />
          </Link>
        </div>
        <small className="text-gray-400">
          Ingresa tu correo para recuperar tu contraseña
        </small>

        <form onSubmit={handleSubmit} className="bg-white pt-4">
          {/* Input de Correo */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Botón de Enviar */}
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
            type="submit"
          >
            Enviar Correo de Recuperación
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
