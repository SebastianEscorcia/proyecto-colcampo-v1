import { useState } from "react";
import { useForm } from "react-hook-form";
import { usarProductoContext } from "../context/ProductContext";
import imagenComprimida from "browser-image-compression";
import "../Styles/formularioRegistroProducto.css";

function FormularioRegistroProducto() {
  const { registroProducto } = usarProductoContext();
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const convertirABase64 = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imagenComprimida(file, options);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    } catch (error) {
      console.error("Error comprimiendo la imagen:", error);
    }
  };

  const onSubmit = async (values) => {
    if (values.Foto && values.Foto[0]) {
      values.Foto = await convertirABase64(values.Foto[0]);
    } else {
      setErrorMessage("Debes seleccionar una foto para tu producto");
      return;
    }

    const productoData = {
      nombre: values.nombre,
      descripcion: values.Descripcion,
      precio: parseFloat(values.Precio),
      unidadDeMedida: values.unidadDeMedida,
      cantidad: parseInt(values.cantidad, 10),
      codigoProducto: values.CodigoProducto,
      categoria: values.Categoria,
      foto: values.Foto,
    };

    const result = await registroProducto(productoData);
    if (result?.success) {
      setErrorMessage(null);
      alert("Producto registrado exitosamente!");
      reset();
    } else {
      setErrorMessage(
        result?.message || "Ocurrió un error al registrar el producto."
      );
      alert(result?.message || "Ocurrió un error al registrar el producto.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-producto-container">
      <h2 className="form-title">Registrar Producto</h2>
      {errorMessage && <p className="form-error">{errorMessage}</p>}
      <div className="form-group">
        <label>Nombre de tu producto:</label>
        <input
          type="text"
          {...register("nombre", { required: "El nombre es obligatorio" })}
          className="form-input"
        />
        {errors.nombre && <p className="form-error">{errors.nombre.message}</p>}
      </div>
      <div className="form-group">
        <label>Descripción:</label>
        <input
          type="text"
          {...register("Descripcion", {
            required: "La descripción es obligatoria",
          })}
          className="form-input"
        />
        {errors.Descripcion && (
          <p className="form-error">{errors.Descripcion.message}</p>
        )}
      </div>
      <div className="form-group">
        <label>Precio:</label>
        <input
          type="number"
          {...register("Precio", { required: "El precio es obligatorio" })}
          className="form-input"
        />
        {errors.Precio && <p className="form-error">{errors.Precio.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor={"unidadDeMedida"}>
          Cómo deseas vender tus productos (unidad):
        </label>
        <select
          id="unidadDeMedida"
          {...register("unidadDeMedida", {
            required: "Selecciona una unidad de medida ",
          })}
        >
          <option value="">Selecciona...</option>
          <option value="kilogramos">Kilogramos</option>
          <option value="libras">Libras</option>
          <option value="unidades">Unidades</option>
          <option value="bulto">Bulto</option>
        </select>
        {errors.unidadDeMedida && (
          <p className="form-error">{errors.unidadDeMedida.message}</p>
        )}
      </div>
      <div className="form-group">
        <label>Cantidad en tu almacén:</label>
        <input
          type="number"
          {...register("cantidad", { required: "La cantidad es obligatoria" })}
          className="form-input"
        />
        {errors.cantidad && (
          <p className="form-error">{errors.cantidad.message}</p>
        )}
      </div>
      <div className="form-group">
        <label>Código para registrar tu producto:</label>
        <input
          type="text"
          {...register("CodigoProducto", {
            required: "El código del producto es obligatorio",
          })}
          className="form-input"
        />
        {errors.CodigoProducto && (
          <p className="form-error">{errors.CodigoProducto.message}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor={"Categoria"}>
          Selecciona una categoría para tus productos:
        </label>
        <select
          id="Categoria"
          {...register("Categoria", {
            required: "Selecciona una categoría ",
          })}
        >
          <option value="">Selecciona...</option>
          <option value="carbohidratos">Carbohidratos</option>
          <option value="lacteos">Lácteos</option>
          <option value="verduras">Verduras</option>
          <option value="frutas">Frutas</option>
        </select>
        {errors.Categoria && (
          <p className="form-error">{errors.Categoria.message}</p>
        )}
      </div>
      <div className="form-group">
        <label>Elige una foto para tu producto:</label>
        <input
          type="file"
          {...register("Foto", { required: "La foto es obligatoria" })}
          className="form-input"
        />
        {errors.Foto && <p className="form-error">{errors.Foto.message}</p>}
      </div>
      <button type="submit" className="form-button">
        Registrar Producto
      </button>
    </form>
  );
}

export default FormularioRegistroProducto;
