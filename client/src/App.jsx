import React, { useState, useEffect } from 'react';
import { usuarioService } from './services/usuarioService';
import FormularioUsuario from './components/FormularioUsuario';
import TablaUsuarios from './components/TablaUsuarios';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [formulario, setFormulario] = useState({
    id: null,
    nombre: '',
    email: '',
    edad: ''
  });
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    setLoading(true);
    try {
      const data = await usuarioService.getAll();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      alert('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = async (id) => {
    try {
      const data = await usuarioService.getById(id);
      setFormulario(data);
      setEditando(true);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      alert('Error al obtener usuario');
    }
  };

  const handleSubmit = async () => {
    if (!formulario.nombre || !formulario.email) {
      alert('Por favor completa nombre y email');
      return;
    }

    try {
      const success = editando 
        ? await usuarioService.update(formulario)
        : await usuarioService.save(formulario);

      if (success) {
        alert(`Usuario ${editando ? 'actualizado' : 'guardado'} exitosamente`);
        limpiarFormulario();
        cargarUsuarios();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar usuario');
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) {
      return;
    }

    try {
      const success = await usuarioService.delete(id);
      if (success) {
        alert('Usuario eliminado exitosamente');
        cargarUsuarios();
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar usuario');
    }
  };

  const limpiarFormulario = () => {
    setFormulario({ id: null, nombre: '', email: '', edad: '' });
    setEditando(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">CRUD de Usuarios</h1>
        
        <FormularioUsuario
          formulario={formulario}
          setFormulario={setFormulario}
          editando={editando}
          onSubmit={handleSubmit}
          onCancelar={limpiarFormulario}
        />

        <TablaUsuarios
          usuarios={usuarios}
          loading={loading}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
          onRecargar={cargarUsuarios}
        />
      </div>
    </div>
  );
}