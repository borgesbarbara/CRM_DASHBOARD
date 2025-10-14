import { TrendingUp, TrendingDown, DollarSign, Users, Target, AlertCircle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useDealPipelines } from '../hooks/useDealPipelines'

const STAGE_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function Vendas() {
  const { pipelines, loading, error } = useDealPipelines();

  // Pegar o primeiro funil (ou você pode adicionar seletor depois)
  const pipeline = pipelines && pipelines.length > 0 ? pipelines[0] : null;
  const stages = pipeline?.stages || [];
  
  // Se não houver stages, não mostrar nada até carregar
  const hasData = stages.length > 0;

  // Calcular métricas
  const totalDeals = stages.reduce((sum, stage) => sum + (stage.deal_count || 0), 0);
  const totalValue = stages.reduce((sum, stage) => sum + (stage.total_value || 0), 0);
  const closedDeals = stages[stages.length - 1]?.deal_count || 0;
  const conversionRate = totalDeals > 0 ? ((closedDeals / (stages[0]?.deal_count || 1)) * 100) : 0;

  // Preparar dados para o gráfico
  const chartData = stages.map((stage, index) => ({
    name: stage.name,
    deals: stage.deal_count || 0,
    value: stage.total_value || 0,
    color: STAGE_COLORS[index % STAGE_COLORS.length],
    conversion: index > 0 ? ((stage.deal_count || 0) / (stages[index - 1]?.deal_count || 1) * 100) : 100
  }));

  // Calcular taxa de conversão entre etapas
  const conversionRates = stages.map((stage, index) => {
    if (index === 0) return { stage: stage.name, rate: 100 };
    const prevCount = stages[index - 1]?.deal_count || 1;
    const currentCount = stage.deal_count || 0;
    return {
      stage: stage.name,
      rate: (currentCount / prevCount) * 100,
      lost: prevCount - currentCount
    };
  });

  // Formatar valores em reais
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando análise de conversão...</p>
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

  if (!loading && !hasData) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center">
          <AlertCircle className="h-6 w-6 text-yellow-600 mr-3" />
          <div>
            <h3 className="text-lg font-medium text-yellow-900">Nenhum dado disponível</h3>
            <p className="text-sm text-yellow-700 mt-1">Não foi possível carregar os dados do funil de vendas. Verifique a conexão com a API.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Análise de Conversão - Vendas</h1>
        <p className="mt-1 text-sm text-gray-500">
          Acompanhe o desempenho do funil de vendas e taxas de conversão
        </p>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-blue-500">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total de Oportunidades</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{totalDeals}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-green-500">
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

        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-purple-500">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Taxa de Conversão</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{conversionRate.toFixed(1)}%</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-yellow-500">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Negócios Fechados</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{closedDeals}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Funil de Vendas - Gráfico de Barras Verticais */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Funil de Vendas</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={100} 
                style={{ fontSize: '12px' }} 
              />
              <YAxis />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  name === 'deals' ? `${value} negócios` : formatCurrency(value),
                  name === 'deals' ? 'Negócios' : 'Valor'
                ]}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #ccc', 
                  borderRadius: '8px' 
                }}
              />
              <Bar dataKey="deals" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>


      {/* Análise de Conversão Detalhada */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Análise de Conversão por Etapa
          </h3>
          <div className="space-y-4">
            {conversionRates.map((item, index) => (
              <div key={item.stage} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-900">{item.stage}</span>
                      {index > 0 && (
                        <>
                          {item.rate >= 50 ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                        </>
                      )}
                    </div>
                    {index > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.lost} oportunidades perdidas nesta etapa
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${
                      item.rate >= 50 ? 'text-green-600' : 
                      item.rate >= 30 ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {item.rate.toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-500">taxa de conversão</p>
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      item.rate >= 50 ? 'bg-green-500' : 
                      item.rate >= 30 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`}
                    style={{ width: `${item.rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <Target className="h-6 w-6 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-blue-900">Insights e Recomendações</h3>
            <ul className="mt-2 text-sm text-blue-800 space-y-1">
              <li>• Taxa de conversão geral: {conversionRate.toFixed(1)}% (de {stages[0]?.name} até {stages[stages.length - 1]?.name})</li>
              <li>• Etapa com maior perda: {conversionRates.slice(1).reduce((prev, curr) => 
                (curr.lost || 0) > (prev.lost || 0) ? curr : prev, conversionRates[1] || {stage: 'N/A', lost: 0}).stage} ({conversionRates.slice(1).reduce((prev, curr) => 
                Math.max(prev, curr.lost || 0), 0)} oportunidades)</li>
              <li>• Valor médio por oportunidade: {formatCurrency(totalValue / (totalDeals || 1))}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}