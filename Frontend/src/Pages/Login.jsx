import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { usarContexto } from "../context/AuthUsuarioContext";
import { iniciarSesion } from "../Logic/LoginController";


export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser, setisAuthenticated } = usarContexto();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await iniciarSesion(data);
      localStorage.setItem("token", response.token);
      setUser(response.usuario);
      setisAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión. Por favor, verifique sus credenciales.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <h2>Inicia Sesión</h2>

      <div className="input-group">
        <FontAwesomeIcon icon={faUser} />
        <input
          type="text"
          {...register("nombreUsuario", { required: true })}
          placeholder="Nombre de usuario"
        />
      </div>
      {errors.nombreUsuario && <span>El nombre de usuario es obligatorio</span>}
      
      <div className="input-group">
        <FontAwesomeIcon icon={faLock} />
        <input
          type="password"
          {...register("contrasenia", { required: true })}
          placeholder="Contraseña"
        />
      </div>
      {errors.contrasenia && <span>La contraseña es obligatoria</span>}

      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

export default Login;
