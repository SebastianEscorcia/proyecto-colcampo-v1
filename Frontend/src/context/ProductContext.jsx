import { createContext, useState, useContext, useEffect } from "react";
import { registrarProducto } from "../Logic/Producto/Producto";
import { obtenerProductos } from "../Logic/Producto/Producto";

export const ProductoContext = createContext();

export const usarProductoContext = () => {
  const context = useContext(ProductoContext);
  if (!context) {
    throw new Error(
      "usarProductoContext debe ser usado dentro de un ProductoProvider"
    );
  }
  return context;
};

export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [publicoProducto, setPublicoProducto] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      console.log("Cargando productos..."); 
      try {
        const productosObtenidos = await obtenerProductos();
        console.log("Productos obtenidos:", productosObtenidos);
        setProductos(
          Array.isArray(productosObtenidos) ? productosObtenidos : []
        );
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const registroProducto = async (producto) => {
    try {
      const result = await registrarProducto(producto);
      if (result.success) {
        console.log(
          `El producto ${producto.nombre} ha sido registrado correctamente`,
          result.data
        );
        setProductos([...productos, result.data]);
        setPublicoProducto(true);
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error("Error registrando producto:", error);
      return { success: false, message: "Ocurrió un error inesperado." };
    }
  };

  return (
    <ProductoContext.Provider value={{ productos, registroProducto }}>
      {children}
    </ProductoContext.Provider>
  );
};
