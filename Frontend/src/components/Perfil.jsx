import {
  registrarCampesino,
  actualizarCampesino,
  obtenerPerfilCampesino,
} from "../Logic/CampesinoPerfilController";
import { useForm } from "react-hook-form";
import { usarContexto } from "../context/AuthUsuarioContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import imageCompression from 'browser-image-compression';

export function Perfil() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { user } = usarContexto();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      // Establecer los datos del user
      setValue("id", user.id);
      setValue("nombreUsuario", user.nombreUsuario);
      setValue("correoElectronico", user.correoElectronico);
      setValue("contrasenia", user.contrasenia);
      setValue("tipoUsuario", user.tipoUsuario);
      setValue("terminosYCondiciones", user.terminosYCondiciones);

      // Obtener datos del perfil del campesino si existe
      obtenerPerfilCampesino(user.id)
        .then((response) => {
          if (response) {
            setIsUpdating(true);
            setValue("nombre", response.nombre);
            setValue("apellido", response.apellido);
            setValue("direccion", response.direccion);
            setValue("numeroDocumento", response.numeroDocumento);
          }
        })
        .catch((error) => {
          console.error("Error al obtener el perfil del campesino:", error);
        });
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    if (data.foto[0]) {
      data.foto = await convertirABase64(data.foto[0]);
    } else {
      data.foto = user.foto;
    }
    data.tipoUsuario = "campesino";

    const usuario = {
      id: data.id,
      nombreUsuario: data.nombreUsuario,
      correoElectronico: data.correoElectronico,
      contrasenia: data.contrasenia,
      tipoUsuario: data.tipoUsuario,
      terminosYCondiciones: data.terminosYCondiciones,
    };
    const perfilCampesino = {
      id: data.id,
      nombre: data.nombre,
      apellido: data.apellido,
      direccion: data.direccion,
      numeroDocumento: data.numeroDocumento,
      foto: data.foto,
      usuario: usuario,
    };

    try {
      const response = isUpdating
        ? await actualizarCampesino(perfilCampesino)
        : await registrarCampesino(perfilCampesino);

      console.log("Campesino registrado/actualizado:", response);
      navigate("/vender");
    } catch (error) {
      console.error("Error al registrar/actualizar campesino:", error);
    }
  };

  const convertirABase64 = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    
    try {
      const imagenComprimida = await imageCompression(file, options);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imagenComprimida);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    } catch (error) {
      console.error("Error comprimiendo la imagen:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <h2>Mi perfil</h2>
      <input
        type="text"
        {...register("nombreUsuario", { required: true })}
        placeholder="Nombre de usuario"
        disabled
      />
      {errors.nombreUsuario && <span>El nombre de usuario es obligatorio</span>}
      <input
        type="email"
        {...register("correoElectronico", { required: true })}
        placeholder="Correo Electrónico"
        disabled
      />
      {errors.correoElectronico && (
        <span>El correo electrónico es obligatorio</span>
      )}
      <input
        type="text"
        {...register("nombre", { required: true })}
        placeholder="Nombre"
      />
      {errors.nombre && <span>El nombre es obligatorio</span>}
      <input
        type="text"
        {...register("apellido", { required: true })}
        placeholder="Apellido"
      />
      {errors.apellido && <span>El apellido es obligatorio</span>}
      <input
        type="text"
        {...register("direccion", { required: true })}
        placeholder="Dirección"
      />
      {errors.direccion && <span>La dirección es obligatoria</span>}
      <input
        type="text"
        {...register("numeroDocumento", { required: true })}
        placeholder="Número de Documento"
      />
      {errors.numeroDocumento && (
        <span>El número de documento es obligatorio</span>
      )}
      <input type="file" {...register("foto", { required: !isUpdating })} />{" "}
      {errors.foto && <span>La foto es obligatoria</span>}
      <input type="hidden" {...register("id", { required: false })} />
      <button type="submit">
        {isUpdating ? "Actualizar Perfil" : "Guardar Perfil"}
      </button>
    </form>
  );
}

export default Perfil;
