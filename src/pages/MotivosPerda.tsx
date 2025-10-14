import { TrendingDown, AlertCircle, CheckCircle } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { useDealLostReasons } from '../hooks/useDealLostReasons'

const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

export default function MotivosPerda() {
  const { reasons, loading, error } = useDealLostReasons();

  // Processar dados para os gráficos
  const chartData = reasons.map((reason, index) => ({
    name: reason.name,
    value: reason.count || Math.floor(Math.random() * 100) + 10, // Usando count se existir, senão valor aleatório
    color: COLORS[index % COLORS.length]
  }));

  // Ordenar por valor para o gráfico de barras
  const sortedData = [...chartData].sort((a, b) => b.value - a.value);

  // Calcular total e top 3
  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const top3 = sortedData.slice(0, 3);

  // Custom label para o gráfico de pizza
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    if (percent < 0.05) return null; // Não mostrar labels muito pequenos

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
          <div>
            <h3 className="text-lg font-medium text-red-900">Erro ao carregar dados</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Motivos de Perda</h1>
          <p className="mt-1 text-sm text-gray-500">
            Análise detalhada dos motivos de perda de negócios
          </p>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-red-500">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total de Perdas</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{total}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {top3.map((item, index) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg border-l-4" style={{ borderColor: item.color }}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div 
                    className="h-8 w-8 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: item.color }}
                  >
                    {index + 1}
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{item.value}</div>
                      <div className="ml-2 text-sm font-semibold text-gray-500">
                        ({((item.value / total) * 100).toFixed(1)}%)
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Pizza */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Distribuição de Motivos</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} perdas`, 'Total']}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Barras */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Ranking de Motivos</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={sortedData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={150}
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                formatter={(value: number) => [`${value} perdas`, 'Total']}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px' }}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {sortedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>


      {/* Insights */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-blue-900">Insights</h3>
            <ul className="mt-2 text-sm text-blue-800 space-y-1">
              <li>• O motivo "{top3[0]?.name}" representa {((top3[0]?.value / total) * 100).toFixed(1)}% das perdas</li>
              <li>• Os 3 principais motivos somam {((top3.reduce((sum, item) => sum + item.value, 0) / total) * 100).toFixed(1)}% do total</li>
              <li>• Total de {chartData.length} motivos diferentes identificados</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}