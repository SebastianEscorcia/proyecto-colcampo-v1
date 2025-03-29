import axios from "axios";
const API = "http://localhost:8080/clientes/perfil";

export const obtenerPerfilCliente = async (usuarioId) => {
  const response = await axios.get(`${API}/${usuarioId}`);
  return response.data;
};

export const registrarCliente = async (cliente) => {
  const response = await axios.post(`${API}`, cliente);
  return response.data;
};

export const actualizarCliente = async (cliente) => {
  const response = await axios.put(`${API}/actualizar`, cliente);
  return response.data;
};
