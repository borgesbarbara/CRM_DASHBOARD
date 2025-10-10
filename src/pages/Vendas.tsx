import { useState } from 'react'
import { Plus, Search, Filter, Download, Eye } from 'lucide-react'

const mockVendas = [
  {
    id: 1,
    cliente: 'João Silva',
    produto: 'Software Premium',
    valor: 'R$ 2.500',
    data: '2024-01-15',
    status: 'Concluída',
    vendedor: 'Ana Costa'
  },
  {
    id: 2,
    cliente: 'Maria Santos',
    produto: 'Consultoria',
    valor: 'R$ 1.800',
    data: '2024-01-14',
    status: 'Pendente',
    vendedor: 'Carlos Lima'
  },
  {
    id: 3,
    cliente: 'Pedro Oliveira',
    produto: 'Suporte Técnico',
    valor: 'R$ 850',
    data: '2024-01-13',
    status: 'Concluída',
    vendedor: 'Ana Costa'
  },
]

export default function Vendas() {
  const [vendas] = useState(mockVendas)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredVendas = vendas.filter(venda =>
    venda.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venda.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venda.vendedor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluída':
        return 'bg-green-100 text-green-800'
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800'
      case 'Cancelada':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendas</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie todas as vendas e oportunidades
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nova Venda</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl font-bold text-gray-900">R$ 45.231</div>
                <div className="text-sm text-gray-500">Vendas do Mês</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl font-bold text-gray-900">23</div>
                <div className="text-sm text-gray-500">Vendas Concluídas</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl font-bold text-gray-900">5</div>
                <div className="text-sm text-gray-500">Pendentes</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl font-bold text-gray-900">R$ 1.967</div>
                <div className="text-sm text-gray-500">Ticket Médio</div>
              </div>
            </div>
          </div>
        </div>
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
                placeholder="Buscar vendas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Todos os status</option>
            <option>Concluída</option>
            <option>Pendente</option>
            <option>Cancelada</option>
          </select>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Lista de Vendas ({filteredVendas.length})
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Todas as vendas registradas no sistema
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {filteredVendas.map((venda) => (
            <li key={venda.id}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {venda.cliente.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-900">{venda.cliente}</p>
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(venda.status)}`}>
                        {venda.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {venda.produto} • {venda.data}
                    </div>
                    <div className="text-sm text-gray-500">
                      Vendedor: {venda.vendedor}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">{venda.valor}</p>
                    <p className="text-sm text-gray-500">ID: #{venda.id}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
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
