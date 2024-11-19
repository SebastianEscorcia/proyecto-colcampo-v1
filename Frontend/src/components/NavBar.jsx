import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NProgress from "nprogress";
import "../Styles/navbar.css";
import Logo from "../assets/Logo.jpeg";
import { usarContexto } from "../context/AuthUsuarioContext";
import { ShoppingBasket, Search } from "lucide-react";


function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { isAuthenticated, logout } = usarContexto();
  
  

  const handleLogoClick = () => {
    NProgress.start();
    navigate("/", { replace: true });
    NProgress.done();
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/productos/${searchTerm}`, { replace: true });
    console.log("Buscando:", searchTerm);
  };

  const handleLinkClick = () => {
    NProgress.start();
  };

  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="button-logo">
          <button onClick={handleLogoClick}>
            <img src={Logo} alt="ColCampo Logo" />
          </button>
        </div>
        <div className="navegacion-page">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
          </form>
          <Link
            to="/productos"
            className="navbar-link"
            onClick={handleLinkClick}
          >
            Ver productos
          </Link>
          <Link to="/ofertas" className="navbar-link" onClick={handleLinkClick}>
            Ofertas
          </Link>
          <Link
            to="/carrito"
            className="relative p-2  text-black cursor-pointer transform hover:scale-105 hover:shadow-lg hover:text-white hover:bg-green-600"
            onClick={handleLinkClick}
          >
            <ShoppingBasket className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Link>
          {isAuthenticated   ? (
            <>
              
              <Link
                to="/vender"
                className="navbar-link"
                onClick={handleLinkClick}
              >
                ¿Vender Productos?
              </Link>
              <button onClick={logout} className="navbar-link">
                Cerrar sesión
              </button>
              <Link
                to="/perfil"
                className="navbar-link"
                onClick={handleLinkClick}
              >
                Perfil
              </Link>
              
            </>
          ) : (
            <>
              
              <Link
                to="/registro"
                className="navbar-link"
                onClick={handleLinkClick}
              >
                Registrate
              </Link>
              <Link
                to="/login"
                className="navbar-link"
                onClick={handleLinkClick}
              >
                Iniciar sesión
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
