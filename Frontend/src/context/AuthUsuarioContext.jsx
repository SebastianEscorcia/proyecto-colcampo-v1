import { createContext, useState, useContext, useEffect } from "react";
import { registrarUsuario } from "../Logic/RegisterUserController";
import { obtenerPerfil } from "../Logic/ObtenerPerfil";
import { obtenerPerfilCampesino } from "../Logic/CampesinoPerfilController";

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

  const login = async (user) => {
    try {
      const response = await registrarUsuario(user);
      console.log("Usuario registrado:", response);
      localStorage.setItem('token', response.token);
      setUser(response.usuario);
      setisAuthenticated(true);
      if (response.usuario.tipoUsuario === 'campesino') {
        const perfil = await obtenerPerfilCampesino(response.usuario.id);
        setCampesinoPerfil(perfil);
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setisAuthenticated(false);
    setCampesinoPerfil(null);
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
        }
      }).catch(error => {
        console.error('Error al obtener el perfil:', error);
        setisAuthenticated(false);
      });
    }
  }, []);

  return (
    <AuthUsuarioContext.Provider value={{ login, user, isAuthenticated, logout, setUser, setisAuthenticated, campesinoPerfil }}>
      {children}
    </AuthUsuarioContext.Provider>
  );
};
