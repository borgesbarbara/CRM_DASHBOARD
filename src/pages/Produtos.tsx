import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react'

const mockProdutos = [
  {
    id: 1,
    nome: 'Software Premium',
    categoria: 'Software',
    preco: 'R$ 2.500',
    estoque: 15,
    status: 'Ativo',
    vendas: 23
  },
  {
    id: 2,
    nome: 'Consultoria Técnica',
    categoria: 'Serviço',
    preco: 'R$ 1.800',
    estoque: '∞',
    status: 'Ativo',
    vendas: 12
  },
  {
    id: 3,
    nome: 'Suporte Técnico',
    categoria: 'Serviço',
    preco: 'R$ 850',
    estoque: '∞',
    status: 'Ativo',
    vendas: 45
  },
  {
    id: 4,
    nome: 'Hardware Básico',
    categoria: 'Hardware',
    preco: 'R$ 1.200',
    estoque: 3,
    status: 'Baixo Estoque',
    vendas: 8
  },
]

export default function Produtos() {
  const [produtos] = useState(mockProdutos)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'bg-green-100 text-green-800'
      case 'Baixo Estoque':
        return 'bg-yellow-100 text-yellow-800'
      case 'Inativo':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie seu catálogo de produtos e serviços
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Novo Produto</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total de Produtos</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{produtos.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl font-semibold text-gray-900">3</div>
                <div className="text-sm text-gray-500">Categorias</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl font-semibold text-gray-900">1</div>
                <div className="text-sm text-gray-500">Baixo Estoque</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-2xl font-semibold text-gray-900">88</div>
                <div className="text-sm text-gray-500">Total de Vendas</div>
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
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Todas as categorias</option>
            <option>Software</option>
            <option>Hardware</option>
            <option>Serviço</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Todos os status</option>
            <option>Ativo</option>
            <option>Baixo Estoque</option>
            <option>Inativo</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Catálogo de Produtos ({filteredProdutos.length})
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Todos os produtos e serviços disponíveis
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {filteredProdutos.map((produto) => (
            <li key={produto.id}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <Package className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-900">{produto.nome}</p>
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(produto.status)}`}>
                        {produto.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {produto.categoria} • Estoque: {produto.estoque}
                    </div>
                    <div className="text-sm text-gray-500">
                      {produto.vendas} vendas realizadas
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">{produto.preco}</p>
                    <p className="text-sm text-gray-500">ID: #{produto.id}</p>
                  </div>
                  <div className="flex space-x-2">
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
