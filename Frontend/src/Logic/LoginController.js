import axios from 'axios';
export const iniciarSesion = async (data) => {
  try {
    const response = await axios.post(`/usuarios/login`, data);
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};
