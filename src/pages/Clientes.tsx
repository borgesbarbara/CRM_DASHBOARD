import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'

const mockClientes = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '(11) 99999-9999',
    empresa: 'Tech Corp',
    status: 'Ativo',
    ultimaVenda: '2024-01-15',
    totalVendas: 'R$ 15.250'
  },
  {
    id: 2,
    nome: 'Maria Santos',
    email: 'maria@email.com',
    telefone: '(11) 88888-8888',
    empresa: 'Design Studio',
    status: 'Ativo',
    ultimaVenda: '2024-01-10',
    totalVendas: 'R$ 8.750'
  },
  {
    id: 3,
    nome: 'Pedro Oliveira',
    email: 'pedro@email.com',
    telefone: '(11) 77777-7777',
    empresa: 'Marketing Plus',
    status: 'Inativo',
    ultimaVenda: '2023-12-20',
    totalVendas: 'R$ 3.200'
  },
]

export default function Clientes() {
  const [clientes] = useState(mockClientes)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie sua base de clientes
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Novo Cliente</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Todos os status</option>
            <option>Ativo</option>
            <option>Inativo</option>
          </select>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Lista de Clientes ({filteredClientes.length})
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Todos os clientes cadastrados no sistema
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {filteredClientes.map((cliente) => (
            <li key={cliente.id}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {cliente.nome.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-900">{cliente.nome}</p>
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        cliente.status === 'Ativo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {cliente.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {cliente.email} • {cliente.telefone}
                    </div>
                    <div className="text-sm text-gray-500">
                      {cliente.empresa}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{cliente.totalVendas}</p>
                    <p className="text-sm text-gray-500">Última venda: {cliente.ultimaVenda}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
