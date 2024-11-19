import { useForm } from "react-hook-form";
import { usarContexto } from "../context/AuthUsuarioContext";
import { useNavigate } from "react-router-dom";
import "../Styles/registroUsuario.css";
import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";

function FormularioRegistro() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("contrasenia");
  const navigate = useNavigate();
  const { login, isAuthenticated } = usarContexto();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values) => {
    try {
      await login(values);
      setErrorMessage(null);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage(
          "El nombre de usuario o correo electrónico ya están en uso."
        );
      } else {
        setErrorMessage("Ocurrió un error inesperado. Inténtalo nuevamente.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <h2>Registro de Usuario</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="input-group">
        <FaUser />
        <input
          type="text"
          {...register("nombreUsuario", { required: true })}
          placeholder="Nombre de usuario"
        />
      </div>
      {errors.nombreUsuario && <span>El nombre de usuario es obligatorio</span>}
      
      <div className="form-row">
        <div className="input-group">
          <FaUserTag />
          <label htmlFor="tipoUsuario">Tipo de Usuario:</label>
          <select
            id="tipoUsuario"
            {...register("tipoUsuario", {
              required: "Selecciona el tipo de usuario",
            })}
          >
            <option value="">Selecciona...</option>
            <option value="campesino">Campesino</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>
        {errors.tipoUsuario && <span>{errors.tipoUsuario.message}</span>}
      </div>
      
      <div className="input-group">
        <FaEnvelope />
        <input
          type="email"
          {...register("correoElectronico", { required: true })}
          placeholder="Correo Electrónico"
        />
      </div>
      {errors.correoElectronico && (
        <span>El correo electrónico es obligatorio</span>
      )}

      <div className="input-group">
        <FaLock />
        <input
          type="password"
          {...register("contrasenia", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "La contraseña debe incluir mayúsculas, minúsculas, un número y un carácter especial",
            },
          })}
          placeholder="Contraseña"
        />
      </div>
      {errors.contrasenia && <span>{errors.contrasenia.message}</span>}

      <div className="input-group">
        <FaLock />
        <input
          type="password"
          {...register("confirmarContraseña", {
            required: "Confirme su contraseña",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          })}
          placeholder="Confirmar Contraseña"
        />
      </div>
      {errors.confirmarContraseña && (
        <span>{errors.confirmarContraseña.message}</span>
      )}

      <div className="checkbox-container">
        <input
          type="checkbox"
          {...register("terminosYCondiciones", {
            required: "Debe aceptar los términos y condiciones",
          })}
        />
        <label>Acepto los términos y condiciones</label>
      </div>
      {errors.terminosYCondiciones && (
        <span>{errors.terminosYCondiciones.message}</span>
      )}

      <button className="registrar" type="submit">Regístrate</button>
    </form>
  );
}

export default FormularioRegistro;
