import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  nombre: yup.string().min(2, "Mínimo 2 caracteres").max(50, "Máximo 50 caracteres").required("El nombre es obligatorio"),
  apellido: yup.string().min(2, "Mínimo 2 caracteres").max(50, "Máximo 50 caracteres").required("El apellido es obligatorio"),
  cedula: yup.string().matches(/^[0-9]{10}$/, "Debe tener exactamente 10 dígitos").required("La cédula es obligatoria"),
  fechaNac: yup.date().required("La fecha de nacimiento es obligatoria"),
  direccion: yup.string().min(5, "Dirección demasiado corta").required("La dirección es obligatoria"),
  correo: yup.string().email("Correo inválido").required("El correo es obligatorio"),
  contrasena: yup.string().min(10, "Mínimo 10 caracteres").required("La contraseña es obligatoria"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const usuarioData = { ...data, rol: "USUARIO" };

      const response = await fetch("http://localhost:8080/api/usuarios/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioData),
      });

      if (!response.ok) throw new Error("Error al registrar usuario");

      toast.success("Usuario registrado correctamente!");

      setTimeout(() => {
        navigate("/Login");
      }, 2000);
    } catch (error) {
      toast.error("Error en el registro");
    }
  };

  return (
    <div className="flex flex-col h-auto w-[620px] border rounded-md shadow-md mx-auto my-24 justify-center flex-wrap border-t-4 border-t-red-500 bg-white">
      <ToastContainer />
      <div className="px-8 py-6">
        <div className="flex justify-between items-center pb-2">
          <div>
            <h1 className="text-xl font-semibold">Crea tu cuenta</h1>
            <small className="text-gray-400">Por favor ingresa tus datos</small>
          </div>
          <div className="ml-8">
            <Link to="/">
              <ArrowBackIosNew />
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white space-y-4">
          {/* NOMBRE */}
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input {...register("nombre")} className="shadow border rounded w-full py-2 px-3" />
            <p className="text-red-500 text-sm">{errors.nombre?.message}</p>
          </div>

          {/* APELLIDO */}
          <div>
            <label className="block text-sm font-medium">Apellido</label>
            <input {...register("apellido")} className="shadow border rounded w-full py-2 px-3" />
            <p className="text-red-500 text-sm">{errors.apellido?.message}</p>
          </div>

          {/* CÉDULA */}
          <div>
            <label className="block text-sm font-medium">Cédula</label>
            <input {...register("cedula")} className="shadow border rounded w-full py-2 px-3" />
            <p className="text-red-500 text-sm">{errors.cedula?.message}</p>
          </div>

          {/* FECHA DE NACIMIENTO */}
          <div>
            <label className="block text-sm font-medium">Fecha de Nacimiento</label>
            <input type="date" {...register("fechaNac")} className="shadow border rounded w-full py-2 px-3" />
            <p className="text-red-500 text-sm">{errors.fechaNac?.message}</p>
          </div>

          {/* DIRECCIÓN */}
          <div>
            <label className="block text-sm font-medium">Dirección</label>
            <input {...register("direccion")} className="shadow border rounded w-full py-2 px-3" />
            <p className="text-red-500 text-sm">{errors.direccion?.message}</p>
          </div>

          {/* CORREO */}
          <div>
            <label className="block text-sm font-medium">Correo</label>
            <input type="email" {...register("correo")} className="shadow border rounded w-full py-2 px-3" />
            <p className="text-red-500 text-sm">{errors.correo?.message}</p>
          </div>

          {/* CONTRASEÑA */}
          <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <input type="password" {...register("contrasenaHash")} className="shadow border rounded w-full py-2 px-3" />
            <p className="text-red-500 text-sm">{errors.contrasenaHash?.message}</p>
          </div>

          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
