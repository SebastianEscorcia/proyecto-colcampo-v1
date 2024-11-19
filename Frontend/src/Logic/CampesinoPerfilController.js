import axios from "axios";
export const registrarCampesino = async (datos) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/campesinos/perfil",
      datos
    );
    return response.data;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};
export const actualizarCampesino = async (datos) => {
  try {
    const response = await axios.put(
      "http://localhost:8080/campesinos/perfil/actualizar",
      datos
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar campesino:", error);
    throw error;
  }
};
export const obtenerPerfilCampesino = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/campesinos/perfil/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el perfil del campesino:", error);
    throw error;
  }
};
