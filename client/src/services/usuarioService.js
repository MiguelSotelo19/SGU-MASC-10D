const ENV = import.meta.env;
const API_URL = `http://${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}${ENV.VITE_API_BASE}`;

export const usuarioService = {
  async getAll() {
    const response = await fetch(API_URL);
    return await response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return await response.json();
  },

  async save(usuario) {
    const response = await fetch(`${API_URL}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario)
    });
    return response.ok;
  },

  async update(usuario) {
    const response = await fetch(`${API_URL}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario)
    });
    return response.ok;
  },

  async delete(id) {
    const response = await fetch(`${API_URL}/delete?id=${id}`, {
      method: 'DELETE'
    });
    return response.ok;
  }
};