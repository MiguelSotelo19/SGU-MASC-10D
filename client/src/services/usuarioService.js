const ENV = import.meta.env;
const API_URL = `http://${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}${ENV.VITE_API_BASE}/usuarios`;

export const usuarioService = {
  async getAll() {
    const response = await fetch(`${API_URL}/`);
    const result = await response.json();
    // Extrae el array 'data' de la respuesta
    return result.data || [];
  },

  async getById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const result = await response.json();
    // Extrae el usuario del objeto 'user'
    return result.user || result.data;
  },

  async save(usuario) {
    const response = await fetch(`${API_URL}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario)
    });
    const result = await response.json();
    // Verifica si la operación fue exitosa
    return result.error === false;
  },

  async update(usuario) {
    const response = await fetch(`${API_URL}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario)
    });
    const result = await response.json();
    return result.error === false;
  },

  async delete(usuario) {
    const response = await fetch(`${API_URL}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario)
    });
    const result = await response.json();
    return result.error === false;
  }
};