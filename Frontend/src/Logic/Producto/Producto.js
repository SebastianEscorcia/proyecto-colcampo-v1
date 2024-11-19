import axios from "axios";
export const registrarProducto = async (datos) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/producto/registro",
      datos
    );
    console.log("Producto registrado:", response);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error registrando producto:", error);
    if (error.response && error.response.status === 409) {
      return {
        success: false,
        message: "Este producto con nombre o código ya lo has registrado.",
      };
    } else {
      return {
        success: false,
        message: error.response?.data.message || "Ocurrió un error inesperado.",
      };
    }
  }
};
export const obtenerProductos = async () => {
  try {
    const response = await axios.get("http://localhost:8080/producto/obtener");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    throw error;
  }
};
