import React from 'react';

export default function FormularioUsuario({ formulario, setFormulario, editando, onSubmit, onCancelar }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">
        {editando ? 'Editar Usuario' : 'Nuevo Usuario'}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre *
          </label>
          <input
            type="text"
            value={formulario.nombre}
            onChange={(e) => setFormulario({...formulario, nombre: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa el nombre"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo *
          </label>
          <input
            type="email"
            value={formulario.correo}
            onChange={(e) => setFormulario({...formulario, correo: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="correo@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefono
          </label>
          <input
            type="number"
            value={formulario.telefono}
            onChange={(e) => setFormulario({...formulario, telefono: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Telefono"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {editando ? 'Actualizar' : 'Guardar'}
          </button>
          
          {editando && (
            <button
              onClick={onCancelar}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}