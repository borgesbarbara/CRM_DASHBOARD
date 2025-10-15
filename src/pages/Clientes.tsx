import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Award,
  Target,
  RefreshCw,
  Trophy,
  TrendingDown
} from 'lucide-react'
import { 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts'
import { useUsersPerformance } from '../hooks/useUsersPerformance'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export default function Clientes() {
  const { users, loading, error } = useUsersPerformance()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  // Filtrar apenas os 3 usuários solicitados
  const normalize = (s?: string) => (s || '')
    .normalize('NFD')
    // @ts-ignore – usar unicode property para remover acentos quando suportado
    .replace(/\p{Diacritic}/gu, '')
    .trim()
    .toLowerCase()

  const allowedNames = ['richard', 'maria eduarda', 'renata cavalheiro']
  const teamUsers = users.filter(u => {
    const name = normalize(u.name)
    const nick = normalize(u.nickname)
    return allowedNames.some(n => name.includes(n) || nick.includes(n))
  })

  // Métricas gerais
  const totalUsers = teamUsers.length
  const totalDeals = teamUsers.reduce((sum, u) => sum + u.deals_count, 0)
  const totalValue = teamUsers.reduce((sum, u) => sum + u.total_value, 0)
  const totalWon = teamUsers.reduce((sum, u) => sum + u.won_deals_count, 0)
  const avgConversion = totalDeals > 0 ? (totalWon / totalDeals * 100) : 0

  // Top performers
  // const topByDeals = [...teamUsers].sort((a, b) => b.deals_count - a.deals_count).slice(0, 5)

  // Dados para gráficos (removidos os gráficos de barras)

  

  // Distribuição de negócios por status
  const statusDistribution = [
    { name: 'Ganhos', value: teamUsers.reduce((sum, u) => sum + u.won_deals_count, 0) },
    { name: 'Perdidos', value: teamUsers.reduce((sum, u) => sum + u.lost_deals_count, 0) },
    { name: 'Em Andamento', value: teamUsers.reduce((sum, u) => sum + u.in_progress_count, 0) }
  ].filter(item => item.value > 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
          <p className="text-gray-600">Carregando performance dos usuários...</p>
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Performance da Equipe</h1>
        <p className="mt-1 text-sm text-gray-500">
          Exibindo apenas: Richard, Maria Eduarda e Renata Cavalheiro
        </p>
        <p className="mt-1 text-xs text-gray-500">
          📊 Exibindo todos os funis
        </p>
      </div>

      {/* Layout Otimizado: Gráfico à esquerda, Cards à direita */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Pizza - Lado Esquerdo */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Distribuição de Negócios</h3>
            <Award className="h-5 w-5 text-gray-400" />
          </div>
          {statusDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              Nenhum dado disponível
            </div>
          )}
        </div>

        {/* Cards de Métricas - Lado Direito (2x2) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
            <div className="p-4 h-full flex flex-col items-center justify-center text-center">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <dl>
                <dt className="text-base font-medium text-gray-500 mb-1">Total de Usuários</dt>
                <dd className="text-2xl font-bold text-gray-900">{totalUsers}</dd>
              </dl>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
            <div className="p-4 h-full flex flex-col items-center justify-center text-center">
              <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg mb-3">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <dl>
                <dt className="text-base font-medium text-gray-500 mb-1">Total de Negócios</dt>
                <dd className="text-2xl font-bold text-gray-900">{totalDeals}</dd>
              </dl>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
            <div className="p-4 h-full flex flex-col items-center justify-center text-center">
              <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg mb-3">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <dl>
                <dt className="text-base font-medium text-gray-500 mb-1">Valor Total</dt>
                <dd className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</dd>
              </dl>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
            <div className="p-4 h-full flex flex-col items-center justify-center text-center">
              <div className="flex-shrink-0 bg-orange-100 p-3 rounded-lg mb-3">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <dl>
                <dt className="text-base font-medium text-gray-500 mb-1">Conversão Média</dt>
                <dd className="text-2xl font-bold text-gray-900">{avgConversion.toFixed(1)}%</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Estágios por Usuário */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {teamUsers.map((u) => (
          <div key={u.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{u.nickname || u.name}</h3>
              <Target className="h-5 w-5 text-gray-400" />
            </div>
            {(u.stages && u.stages.length > 0) ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={u.stages}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-30} textAnchor="end" height={70} interval={0} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" name="Negócios" fill="#3B82F6" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[280px] flex items-center justify-center text-gray-500">Sem dados de estágios</div>
            )}
          </div>
        ))}
      </div>

      {/* Ranking Detalhado */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
            Ranking Completo de Performance
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Negócios
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ganhos
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Perdidos
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversão
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor Ganho
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket Médio
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...teamUsers]
                  .sort((a, b) => b.won_value - a.won_value)
                  .map((user, index) => (
                    <tr key={user.id} className={index < 3 ? 'bg-yellow-50' : 'hover:bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index === 0 && <span className="text-yellow-500">🥇</span>}
                        {index === 1 && <span className="text-gray-400">🥈</span>}
                        {index === 2 && <span className="text-orange-600">🥉</span>}
                        {index > 2 && <span className="text-gray-500">{index + 1}</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                              {user.nickname || user.name.substring(0, 2).toUpperCase()}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                        {user.deals_count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {user.won_deals_count}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {user.lost_deals_count}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-900">
                            {user.conversion_rate.toFixed(1)}%
                          </span>
                          {user.conversion_rate >= avgConversion ? (
                            <TrendingUp className="ml-1 h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="ml-1 h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                        {formatCurrency(user.won_value)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                        {formatCurrency(user.avg_ticket)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
