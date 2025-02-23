import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom"; // 👈 Importa useNavigate

const schema = yup.object().shape({
  nombre: yup.string().min(2).max(50).required("El nombre es obligatorio"),
  apellido: yup.string().min(2).max(50).required("El apellido es obligatorio"),
  cedula: yup.string().matches(/^[0-9]+$/, "Solo números").required("La cédula es obligatoria"),
  fechaNac: yup.date().required("La fecha de nacimiento es obligatoria"),
  direccion: yup.string().required("La dirección es obligatoria"),
  correo: yup.string().email("Correo inválido").required("El correo es obligatorio"),
  contrasena: yup.string().min(10, "Mínimo 10 caracteres").required("La contraseña es obligatoria"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate(); // 👈 Hook para redirigir

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:9090/api/usuarios/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error al registrar usuario");

      setMensaje("Usuario registrado correctamente");

      // 🔥 Redirigir a /Login después de 2 segundos
      setTimeout(() => {
        navigate("/Login");
      }, 2000);
    } catch (error) {
      setMensaje("Error en el registro");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Registro de Usuario</h2>
      {mensaje && <p className="text-center text-green-500">{mensaje}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input {...register("nombre")} className="input" />
          <p className="text-red-500 text-sm">{errors.nombre?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Apellido</label>
          <input {...register("apellido")} className="input" />
          <p className="text-red-500 text-sm">{errors.apellido?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Cédula</label>
          <input {...register("cedula")} className="input" />
          <p className="text-red-500 text-sm">{errors.cedula?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Fecha de Nacimiento</label>
          <input type="date" {...register("fechaNac")} className="input" />
          <p className="text-red-500 text-sm">{errors.fechaNac?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Dirección</label>
          <input {...register("direccion")} className="input" />
          <p className="text-red-500 text-sm">{errors.direccion?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Correo</label>
          <input type="email" {...register("correo")} className="input" />
          <p className="text-red-500 text-sm">{errors.correo?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input type="password" {...register("contrasena")} className="input" />
          <p className="text-red-500 text-sm">{errors.contrasena?.message}</p>
        </div>

        <button type="submit" className="btn-primary">Registrarse</button>
      </form>
    </div>
  );
}
