import { Link } from "react-router-dom";
import { usarContexto } from "../context/AuthUsuarioContext";
import "../Styles/PerfilPage.css";

function PerfilPage() {
  const { user, campesinoPerfil } = usarContexto();
  return (
    <div className="perfil-page-container">
      <div className="perfil-header">
        <img
          src={campesinoPerfil?.foto || "default-profile.png"}
          alt="Foto de perfil"
          className="perfil-foto"
        />
        <h1 className="perfil-username">{user?.nombreUsuario}</h1>
      </div>
      <div className="perfil-navigation">
        <Link to="/perfil/datos" className="perfil-link">
          Mis Datos
        </Link>
        {user?.tipoUsuario === "campesino" && (
          <>
            <Link to="/perfil/mis-productos" className="perfil-link">
              Mis Productos
            </Link>
            <Link to="/perfil/informes-ventas" className="perfil-link">
              Informes de Ventas
            </Link>
            <Link to="/perfil/pedidos" className="perfil-link">
              Pedidos
            </Link>
          </>
        )}
        {user?.tipoUsuario === "cliente" && (
          <>
            <Link to="/perfil/historial-compras" className="perfil-link">
              Historial de Compras
            </Link>
            <Link to="/perfil/mis-pedidos" className="perfil-link">
              Mis Pedidos
            </Link>
          </>
        )}
      </div>
      <div className="perfil-content"></div>
    </div>
  );
}

export default PerfilPage;
