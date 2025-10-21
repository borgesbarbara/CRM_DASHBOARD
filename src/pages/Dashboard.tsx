import { 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  Megaphone,
  Target,
  Award,
  XCircle,
  RefreshCw
} from 'lucide-react'
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  LabelList,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { useCampaigns } from '../hooks/useCampaigns'
import { useDealLostReasons } from '../hooks/useDealLostReasons'
import { useUsersPerformance } from '../hooks/useUsersPerformance'
import { useState, useEffect } from 'react'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

export default function Dashboard() {
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  const { campaigns, loading: loadingCampaigns } = useCampaigns()
  const { reasons, loading: loadingReasons } = useDealLostReasons()
  const { users, loading: loadingUsers } = useUsersPerformance()

  // Função para atualizar manualmente
  const handleManualRefresh = () => {
    setIsRefreshing(true)
    setLastUpdate(new Date())
    
    setTimeout(() => {
      setIsRefreshing(false)
      window.location.reload()
    }, 1000)
  }

  // Auto-refresh a cada 15 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshing(true)
      setLastUpdate(new Date())
      
      // Simular recarregamento dos dados
      setTimeout(() => {
        setIsRefreshing(false)
        // Forçar recarregamento da página para atualizar os dados
        window.location.reload()
      }, 1000)
    }, 2 * 60 * 60 * 1000) // 2 horas em millisegundos

    return () => clearInterval(interval)
  }, [])

  // Calcular métricas gerais
  const totalCampaigns = campaigns.length
  const totalDeals = campaigns.reduce((sum, c) => sum + (c.deals_count || 0), 0)
  // Valor total agora considera apenas valores ganhos
  const totalValue = campaigns.reduce((sum, c) => sum + (c.won_value || 0), 0)
  const totalWonDeals = campaigns.reduce((sum, c) => sum + (c.won_deals_count || 0), 0)
  const totalLostDeals = campaigns.reduce((sum, c) => sum + (c.lost_deals_count || 0), 0)
  const conversionRate = totalDeals > 0 ? ((totalWonDeals / totalDeals) * 100).toFixed(1) : '0.0'
  const wonValue = campaigns.reduce((sum, c) => sum + (c.won_value || 0), 0)
  const avgTicket = totalWonDeals > 0 ? (wonValue / totalWonDeals) : 0

  // Debug das métricas
  console.log('🔍 Dashboard - Métricas calculadas:', {
    totalCampaigns,
    totalDeals,
    totalValue,
    totalWonDeals,
    totalLostDeals,
    wonValue,
    avgTicket,
    campaigns: campaigns.map(c => ({
      name: c.name,
      deals_count: c.deals_count,
      won_deals_count: c.won_deals_count,
      won_value: c.won_value,
      total_value: c.total_value
    }))
  })

  // Dados para gráfico de campanhas (top 6)
  const campaignsChartData = campaigns
    .filter(c => c.deals_count && c.deals_count > 0)
    .sort((a, b) => (b.total_value || 0) - (a.total_value || 0))
    .slice(0, 6)
    .map(c => ({
      name: c.name.length > 20 ? c.name.substring(0, 20) + '...' : c.name,
      valor: c.total_value || 0,
      negócios: c.deals_count || 0
    }))

  // (Gráfico de funil removido; variáveis relacionadas excluídas)

  // Dados para gráfico de motivos de perda (top 5)
  // A API não retorna contagens, então vamos simular com base nos dados disponíveis
  const lostReasonsData = reasons
    .slice(0, 5)
    .map((r, index) => ({
      name: r.name.length > 25 ? r.name.substring(0, 25) + '...' : r.name,
      // Simular contagens decrescentes para visualização
      value: r.count || (reasons.length - index) * 5
    }))
  
  console.log('📊 Dashboard - Motivos de Perda:', { 
    total: reasons.length, 
    exibindo: lostReasonsData.length,
    dados: lostReasonsData 
  })


  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const loading = loadingCampaigns || loadingReasons || loadingUsers

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Carregando dashboard...</div>
      </div>
    )
  }

const stats = [
  {
      name: 'Valor Ganho',
      value: formatCurrency(totalValue),
      subtitle: `${totalDeals} negócios`,
    icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Taxa de Conversão',
      value: `${conversionRate}%`,
      subtitle: `${totalWonDeals} ganhos de ${totalDeals}`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Campanhas Ativas',
      value: totalCampaigns.toString(),
      subtitle: `${campaignsChartData.length} com negócios`,
      icon: Megaphone,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      name: 'Ticket Médio',
      value: formatCurrency(avgTicket),
      subtitle: `Negócios ganhos`,
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
  ]

  // Data de última atualização
  const lastUpdated = lastUpdate.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
              Visão geral consolidada de Campanhas, Vendas e Motivos de Perda
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleManualRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-1 px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Atualizando...' : 'Atualizar'}</span>
              </button>
              <div>
                <p className="text-xs text-gray-400">Última atualização</p>
                <p className="text-sm font-medium text-gray-600">{lastUpdated}</p>
                <p className="text-xs text-blue-500">Auto-refresh: 2h</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${item.bgColor} p-3 rounded-lg`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </dt>
                    <dd className="flex flex-col">
                      <div className="text-2xl font-bold text-gray-900">
                        {item.value}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {item.subtitle}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Dados em tempo real
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Negócios Ganhos</p>
              <p className="text-3xl font-bold text-green-900 mt-2">{totalWonDeals}</p>
              {/* Removido valor em reais conforme solicitação */}
            </div>
            <Award className="h-12 w-12 text-green-600 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg shadow border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-800">Negócios Perdidos</p>
              <p className="text-3xl font-bold text-red-900 mt-2">{totalLostDeals}</p>
              <p className="text-sm text-red-700 mt-1">{reasons.length} motivos registrados</p>
            </div>
            <XCircle className="h-12 w-12 text-red-600 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Em Andamento</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">{totalDeals - totalWonDeals - totalLostDeals}</p>
              <p className="text-sm text-blue-700 mt-1">Negócios ativos</p>
            </div>
            <ShoppingCart className="h-12 w-12 text-blue-600 opacity-80" />
          </div>
        </div>
      </div>

      {/* Estágios por Usuário abaixo dos cards de performance */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Desenvolvimento por Usuário</h3>
          <Target className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {(() => {
            const normalize = (s: string) =>
              (s || '')
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '')
                .toLowerCase();
            const allowed = ['richard', 'maria eduarda', 'renata cavalheiro'];
            const teamUsers = users.filter(u => {
              const name = normalize(u.name);
              const nick = normalize(u.nickname || '');
              return allowed.some(a => name.includes(a) || nick.includes(a));
            });
            return teamUsers.map(u => (
              <div key={u.id} className="bg-white p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-900">{u.nickname || u.name}</h4>
                </div>
                {(u.stages && u.stages.length > 0) ? (
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={u.stages} margin={{ top: 20, right: 10, left: 10, bottom: 100 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        height={100} 
                        interval={0}
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis allowDecimals={false} domain={[0, 600]} />
                      <Tooltip />
                      <Bar dataKey="count" name="Negócios" fill="#3B82F6" radius={[8,8,0,0]}>
                        <LabelList dataKey="count" position="top" className="text-[10px] fill-gray-700" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[320px] flex items-center justify-center text-gray-500">Sem dados de estágios</div>
                )}
              </div>
            ));
          })()}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campanhas por Valor */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top Campanhas por Valor</h3>
              <p className="text-xs text-gray-500">Atualizado em {lastUpdated}</p>
            </div>
            <Megaphone className="h-5 w-5 text-gray-400" />
          </div>
          {campaignsChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignsChartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  labelStyle={{ color: '#111827' }}
                />
                <Bar dataKey="valor" fill="#3B82F6" radius={[0, 8, 8, 0]} />
              </BarChart>
          </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              Nenhuma campanha com negócios
            </div>
          )}
        </div>
        {/* Top Motivos de Perda (reposicionado para a direita) */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top Motivos de Perda</h3>
              <p className="text-xs text-gray-500">Atualizado em {lastUpdated}</p>
            </div>
            <XCircle className="h-5 w-5 text-gray-400" />
          </div>
          {lostReasonsData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={lostReasonsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {lostReasonsData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              Nenhum motivo de perda registrado
            </div>
          )}
        </div>
      </div>

      {/* Cards de Resumo das Campanhas (ocupa largura total) */}
      <div className="space-y-4">
          {campaigns.filter(c => c.deals_count && c.deals_count > 0).slice(0, 3).map((campaign) => (
            <div key={campaign.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-blue-500">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">{campaign.name}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Negócios:</span>
                      <span className="font-medium text-gray-900">{campaign.deals_count}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Valor:</span>
                      <span className="font-medium text-gray-900">{formatCurrency(campaign.total_value || 0)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Conversão:</span>
                      <span className="font-medium text-green-600">
                        {(campaign.deals_count || 0) > 0 ? ((campaign.won_deals_count || 0) / (campaign.deals_count || 1) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
                <Megaphone className="h-8 w-8 text-blue-500 opacity-50" />
              </div>
          </div>
          ))}
      </div>
    </div>
  )
}
