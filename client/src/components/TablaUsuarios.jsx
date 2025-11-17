import React from 'react';

export default function TablaUsuarios({ usuarios, loading, onEditar, onEliminar, onRecargar }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Lista de Usuarios</h2>
        <button
          onClick={onRecargar}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Recargar
        </button>
      </div>
      
      {loading ? (
        <p className="text-center py-4 text-gray-500">Cargando...</p>
      ) : usuarios.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No hay usuarios registrados</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nombre</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Correo</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Telefono</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{usuario.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{usuario.nombre}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{usuario.correo}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{usuario.telefono}</td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => onEditar(usuario.id)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onEliminar(usuario.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}