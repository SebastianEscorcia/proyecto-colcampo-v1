// PAGES
import HomePage from "./Pages/HomePage";
import Registro from "./Pages/Registro";
import Vender from './Pages/Vender'
import Login from './Pages/Login'
import PerfilPage from './Pages/PerfilPage'
import Productos from './Pages/Productos'

//Componets
import Perfil from './components/Perfil'



import { Routes, Route, useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "./Styles/barraProgreso.css";

import { useEffect } from "react";
import { usarContexto } from "./context/AuthUsuarioContext";
//Logic
import { obtenerPerfil } from "./Logic/ObtenerPerfil";
import Carrito from "./Pages/Carrito";
import { useCart } from "./Logic/useCart";

NProgress.configure({ showSpinner: false });

function ProgressBar() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [location]);

  return null;
}

function App() {
  const { isAuthenticated, setUser, setisAuthenticated } = usarContexto();
  const {addToCart,removeFromCart,increaseQuantity,decreaseQuantity,cart}=useCart()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      obtenerPerfil().then(user => {
        setUser(user);
        setisAuthenticated(true);
      }).catch(error => {
        console.error('Error al obtener el perfil:', error);
        setisAuthenticated(false);
      });
    }
  }, [isAuthenticated]);

  

  return (
    <>
      <ProgressBar />
      <Routes>
        <Route path="/" element={<HomePage addToCart={addToCart} cart={cart}/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/carrito" element={<Carrito removeFromCart={removeFromCart} cart={cart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}/>} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/productos" element={<Productos/>} />
        <Route path="/ofertas" element={<h1>Ofertas</h1>} />
        <Route path="/productos/:nombre" element={<h1>Buscar Producto</h1>} />
        <Route path="/perfil" element={<PerfilPage></PerfilPage>}/>
        <Route path="/vender" element={<Vender/>} />
        <Route path="/perfil/datos" element={<Perfil/>} />
        <Route
          path="*"
          element={<h1>404 Not Found página no encontrada</h1>}
        />
      </Routes>
    </>
  );
}

export default App;
