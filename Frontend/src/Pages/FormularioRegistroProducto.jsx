import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { usarProductoContext } from "../context/ProductContext";
import { AuthUsuarioContext } from "../context/AuthUsuarioContext";
import imagenComprimida from "browser-image-compression";
import "../Styles/formularioRegistroProducto.css";

function FormularioRegistroProducto() {
  const { registroProducto } = usarProductoContext();
  const { user, campesinoPerfil } = useContext(AuthUsuarioContext);
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
      usuarioId: user.id, // Asociar con el usuario
      campesinoId: campesinoPerfil ? campesinoPerfil.id : null, // Asociar con el campesino si el perfil está completo
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
          {...register("nombre", {
            required: "El nombre es obligatorio",
            minLength: {
              value: 3,
              message: "Debe tener al menos 3 caracteres",
            },
            maxLength: {
              value: 10,
              message: "Debe tener máximo 10 caracteres",
            },
          })}
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
            required: "La descripción es obligatoria",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
            maxLength: { value: 30, message: "Máximo 30 caracteres" },
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
          {...register("Precio", {
            required: "El precio es obligatorio",
            required: "El precio es obligatorio",
            min: { value: 100, message: "El precio mínimo es 100" },
            max: { value: 999999, message: "El precio máximo es 999999" },
          })}
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
          {...register("cantidad", {
            required: "La cantidad es obligatoria",
            min: { value: 1, message: "Cantidad mínima es 1" },
            max: { value: 99999, message: "Cantidad máxima es 99999" },
          })}
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
            minLength: {
              value: 5,
              message: "El código debe tener al menos 5 caracteres",
            },
            maxLength: {
              value: 20,
              message: "El código debe tener máximo 20 caracteres",
            },
            pattern: {
              value: /^[A-Za-z0-9]+$/,
              message:
                "Solo se permiten letras y números, sin espacios ni símbolos",
            },
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
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
            maxLength: { value: 13, message: "Máximo 13 caracteres" },
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
