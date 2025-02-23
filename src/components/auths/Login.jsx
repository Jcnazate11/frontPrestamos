import React, { useState } from "react";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Datos quemados de usuarios para autenticación
const mockUsers = [
  { username: "admin", password: "admin123" },
  { username: "user1", password: "password1" },
  { username: "elonmusk", password: "spacex2024" },
];

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const loginSuccessful = (redirectPath) => {
    toast.success("Iniciado sesión exitosamente!", { autoClose: 1000 });

    setTimeout(() => {
      setAuth(true);
      navigate(redirectPath); // Redirige según el usuario
    }, 1500);
  };

  const loginFailed = () => {
    toast.error("Credenciales equivocadas!", { autoClose: 1000 });
  };

  const { username, password } = inputs;

  const onSubmit = (e) => {
    e.preventDefault();

    // Buscar usuario en la lista de usuarios quemados
    const foundUser = mockUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("token", "fake-jwt-token");

      // Redirigir según el usuario
      if (username === "user1") {
        loginSuccessful("/homeUser");
      } else {
        loginSuccessful("/home");
      }
    } else {
      loginFailed();
    }
  };

  return (
    <div className="flex flex-col h-auto w-[620px] border rounded-md shadow-md mx-auto my-52 justify-center flex-wrap border-t-4 border-t-red-500">
      <ToastContainer />
      <div>
        <div className="flex justify-between items-center px-8 pt-6 pb-2">
          {/* GREETINGS */}
          <div>
            <h1 className="text-xl font-semibold">Bienvenido</h1>
            <small className="text-gray-400">
              ¡Bienvenido! Por favor ingresa tus datos
            </small>
          </div>

          {/* BACK ARROW */}
          <div className="ml-8">
            <Link to="/">
              <ArrowBackIosNew />
            </Link>
          </div>
        </div>

        <form onSubmit={onSubmit} className="bg-white px-8 pt-6 pb-8">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-5">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Iniciar Sesión
            </button>

            {/* Enlace de "¿Olvidaste tu contraseña?" */}
            <Link to="/forgot-password" className="text-sm text-red-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
            <Link to="/registro" className="text-sm text-red-500 hover:underline">
              ¿No tienes una cuenta?, Registrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
