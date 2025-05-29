import axios from 'axios';

export const registrarUsuario = async (datosUsuario) => {
    try {
        // Hacer la solicitud POST al servidor para registrar el usuario
        const response = await axios.post('http://localhost:8080/usuarios/registro', datosUsuario);
        const { token, usuario } = response.data;
        
        // Guardar el token en localStorage
        localStorage.setItem('token', token);
        
        console.log('Token guardado:', token);
        console.log('Usuario registrado:', usuario);
        
        // Retornar la respuesta (datos del usuario registrado)
        return response.data;
    } catch (error) {
        // Verificar si el error es de conflicto (409) y manejarlo
        if (error.response && error.response.status === 409) {
            const mensajeError = error.response.data.mensaje; // Acceder al mensaje de error desde el cuerpo de la respuesta
            throw new Error(mensajeError);  // Lanzar el mensaje de error personalizado
        }
        
        // Manejar otros errores
        console.error('Error:', error);
        throw error;
    }
}


