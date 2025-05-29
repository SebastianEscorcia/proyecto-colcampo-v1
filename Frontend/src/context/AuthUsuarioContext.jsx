import { createContext, useState, useContext, useEffect } from "react";
import { registrarUsuario } from "../Logic/RegisterUserController";
import { obtenerPerfil } from "../Logic/ObtenerPerfil";
import { obtenerPerfilCampesino } from "../Logic/CampesinoPerfilController";
import { obtenerPerfilCliente } from "../Logic/ClientePerfilController"; // 👈 nuevo import

export const AuthUsuarioContext = createContext();

export const usarContexto = () => {
  const context = useContext(AuthUsuarioContext);
  if (!context) {
    throw new Error("Debe usar este componente dentro de un contexto AuthUsuarioContext");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [campesinoPerfil, setCampesinoPerfil] = useState(null);
  const [clientePerfil, setClientePerfil] = useState(null); // 👈 nuevo estado

  const registerUser = async (user) => {
    try {
      const response = await registrarUsuario(user);
      localStorage.setItem('token', response.token);
      setUser(response.usuario);
      setisAuthenticated(true);
      
      if (response.usuario.tipoUsuario === 'campesino') {
        const perfil = await obtenerPerfilCampesino(response.usuario.id);
        setCampesinoPerfil(perfil);
      } else if (response.usuario.tipoUsuario === 'cliente') {
        const perfil = await obtenerPerfilCliente(response.usuario.id); // 👈 nuevo fetch
        setClientePerfil(perfil);
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setisAuthenticated(false);
    setCampesinoPerfil(null);
    setClientePerfil(null); // 👈 limpiar también
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      obtenerPerfil().then(async user => {
        setUser(user);
        setisAuthenticated(true);
        
        if (user.tipoUsuario === 'campesino') {
          const perfil = await obtenerPerfilCampesino(user.id);
          setCampesinoPerfil(perfil);
        } else if (user.tipoUsuario === 'cliente') {
          const perfil = await obtenerPerfilCliente(user.id);
          setClientePerfil(perfil);
        }

      }).catch(error => {
        console.error('Error al obtener el perfil:', error);
        setisAuthenticated(false);
      });
    }
  }, []);

  return (
    <AuthUsuarioContext.Provider value={{
      registerUser,
      user,
      isAuthenticated,
      logout,
      setUser,
      setisAuthenticated,
      campesinoPerfil,
      setClientePerfil,
      setCampesinoPerfil,
      clientePerfil // 👈 exportar también
    }}>
      {children}
    </AuthUsuarioContext.Provider>
  );
};
