import { Megaphone, Calendar, RefreshCw, Users, TrendingUp, DollarSign, Target, Award, XCircle } from 'lucide-react'
import { useCampaigns } from '../hooks/useCampaigns'

export default function Produtos() {
  const { campaigns, loading, error } = useCampaigns()

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatCurrency = (value?: number) => {
    if (!value) return 'R$ 0,00'
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const calculateConversionRate = (won?: number, total?: number) => {
    if (!total || total === 0) return '0%'
    const rate = ((won || 0) / total) * 100
    return `${rate.toFixed(1)}%`
  }

  // Calcular totais
  const totalContacts = campaigns.reduce((sum, c) => sum + (c.contacts_count || 0), 0)
  const totalDeals = campaigns.reduce((sum, c) => sum + (c.deals_count || 0), 0)
  const totalValue = campaigns.reduce((sum, c) => sum + (c.total_value || 0), 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
          <p className="text-gray-600">Carregando campanhas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campanhas</h1>
          <p className="mt-1 text-sm text-gray-500">
            Desempenho das campanhas de marketing do RD Station
          </p>
        </div>
      </div>

      {/* Stats Cards - Visão Geral */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Megaphone className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total de Campanhas</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{campaigns.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total de Contatos</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{totalContacts}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total de Negócios</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{totalDeals}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Valor Total</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{formatCurrency(totalValue)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns List with Performance */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Desempenho por Campanha ({campaigns.length})
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Métricas detalhadas de cada campanha
          </p>
        </div>
        
        {campaigns.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <Megaphone className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma campanha encontrada</h3>
            <p className="mt-1 text-sm text-gray-500">
              Não há campanhas cadastradas no momento
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="px-4 py-6 hover:bg-gray-50 transition-colors">
                {/* Header da Campanha */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                        <Megaphone className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h4 className="text-lg font-semibold text-gray-900">{campaign.name}</h4>
                        <span className="ml-3 inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Ativa
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        Criada em: {formatDate(campaign.created_at)}
                        {campaign.updated_at && (
                          <span className="ml-4">
                            • Atualizada em: {formatDate(campaign.updated_at)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">ID</p>
                    <p className="text-sm font-medium text-gray-900">#{campaign.id}</p>
                  </div>
                </div>

                {/* Métricas de Desempenho */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
                  {/* Contatos */}
                  <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                    <div className="flex items-center justify-between">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-purple-900 mt-2">
                      {campaign.contacts_count || 0}
                    </p>
                    <p className="text-xs text-purple-600 font-medium">Contatos</p>
                  </div>

                  {/* Total de Negócios */}
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <div className="flex items-center justify-between">
                      <Target className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-blue-900 mt-2">
                      {campaign.deals_count || 0}
                    </p>
                    <p className="text-xs text-blue-600 font-medium">Negócios</p>
                  </div>

                  {/* Negócios Ganhos */}
                  <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                    <div className="flex items-center justify-between">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-green-900 mt-2">
                      {campaign.won_deals_count || 0}
                    </p>
                    <p className="text-xs text-green-600 font-medium">Ganhos</p>
                  </div>

                  {/* Negócios Perdidos */}
                  <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                    <div className="flex items-center justify-between">
                      <XCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <p className="text-2xl font-bold text-red-900 mt-2">
                      {campaign.lost_deals_count || 0}
                    </p>
                    <p className="text-xs text-red-600 font-medium">Perdidos</p>
                  </div>

                  {/* Taxa de Conversão */}
                  <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                    <div className="flex items-center justify-between">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                    </div>
                    <p className="text-2xl font-bold text-orange-900 mt-2">
                      {calculateConversionRate(campaign.won_deals_count, campaign.deals_count)}
                    </p>
                    <p className="text-xs text-orange-600 font-medium">Conversão</p>
                  </div>

                  {/* Valor Total */}
                  <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                    <div className="flex items-center justify-between">
                      <DollarSign className="h-5 w-5 text-emerald-600" />
                    </div>
                    <p className="text-lg font-bold text-emerald-900 mt-2">
                      {formatCurrency(campaign.total_value)}
                    </p>
                    <p className="text-xs text-emerald-600 font-medium">Valor Total</p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
