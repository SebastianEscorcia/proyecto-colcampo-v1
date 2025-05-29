import axios from 'axios';

export const obtenerPerfil = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No hay token guardado");

    try {
        const response = await axios.get('http://localhost:8080/usuarios/perfil', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
        throw error;
    }
}

