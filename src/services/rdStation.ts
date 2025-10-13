// RD Station API Service
const RD_STATION_TOKEN = import.meta.env.VITE_RD_TOKEN || '681cb285978e2f00145fb15d'; // Token do RD Station
const USE_PROXY = true; // Usar proxy do Vite para evitar CORS
const USE_MOCK_PIPELINES = false;
const BASE_URL = USE_PROXY ? '/api/rdstation' : 'https://crm.rdstation.com/api/v1';

export interface DealLostReason {
  id: number;
  name: string;
  count?: number;
}

export interface DealPipeline {
  id: number;
  name: string;
  stages?: DealStage[];
}

export interface DealStage {
  id: number;
  name: string;
  deal_count?: number;
  total_value?: number;
}

export interface Campaign {
  id: string;
  _id?: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  contacts_count?: number;
  deals_count?: number;
  won_deals_count?: number;
  lost_deals_count?: number;
  total_value?: number;
  won_value?: number;
}

interface Deal {
  id: string;
  name?: string;
  amount?: number;
  amount_total?: number;
  deal_stage_id?: string;
  deal_stage?: {
    id: string;
    name: string;
  };
  stage_name?: string;
  status?: string;
  win?: boolean | null;
  closed_at?: string | null;
  campaign?: {
    id: string;
    _id: string;
    name: string;
  };
  campaign_id?: string;
  contacts?: Array<{
    name?: string;
    emails?: Array<{ email?: string }> | any[];
    phones?: Array<{ phone?: string }> | any[];
  }>;
}

interface Contact {
  id: string;
  name?: string;
  email?: string;
  campaign?: {
    id: string;
    _id: string;
    name: string;
  };
  campaign_id?: string;
}

// Dados mock para fallback
const mockDealLostReasons: DealLostReason[] = [
  { id: 1, name: 'Preço muito alto', count: 45 },
  { id: 2, name: 'Prazo de entrega incompatível', count: 32 },
  { id: 3, name: 'Concorrente ofereceu melhor proposta', count: 28 },
  { id: 4, name: 'Falta de orçamento do cliente', count: 25 },
  { id: 5, name: 'Produto não atende necessidades', count: 18 },
  { id: 6, name: 'Cliente não respondeu', count: 15 },
  { id: 7, name: 'Mudança de prioridades', count: 12 },
  { id: 8, name: 'Questões de qualidade', count: 10 },
];

const mockDealPipelines: DealPipeline[] = [
  {
    id: 1,
    name: 'Vendas Principal',
    stages: [
      { id: 1, name: 'Novo Lead', deal_count: 150, total_value: 450000 },
      { id: 2, name: 'Qualificação', deal_count: 95, total_value: 380000 },
      { id: 3, name: 'Proposta Enviada', deal_count: 60, total_value: 300000 },
      { id: 4, name: 'Negociação', deal_count: 35, total_value: 210000 },
      { id: 5, name: 'Fechado', deal_count: 20, total_value: 150000 },
    ]
  }
];

// Helper para fazer requisições
async function fetchJSON(path: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${path}${path.includes('?') ? '&' : '?'}token=${RD_STATION_TOKEN}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      accept: 'application/json',
      ...options.headers,
    }
  });
  
  if (!response.ok) {
    throw new Error(`API retornou status ${response.status}`);
  }
  
  return response.json();
}

// Buscar todos os negócios (com paginação)
async function fetchAllDeals(): Promise<Deal[]> {
  try {
    const data = await fetchJSON('/deals');
    
    let deals: Deal[] = [];
    if (Array.isArray(data)) {
      deals = data;
    } else if (data.deals && Array.isArray(data.deals)) {
      deals = data.deals;
    }
    
    console.log(`✅ ${deals.length} negócios carregados da API`);
    if (deals.length > 0) {
      console.log('📋 Exemplo de negócio:', JSON.stringify(deals[0], null, 2));
    }
    return deals;
  } catch (error) {
    console.error('Erro ao buscar negócios:', error);
    return [];
  }
}

// Buscar todos os contatos (com paginação)
async function fetchAllContacts(): Promise<Contact[]> {
  try {
    const data = await fetchJSON('/contacts');
    
    let contacts: Contact[] = [];
    if (Array.isArray(data)) {
      contacts = data;
    } else if (data.contacts && Array.isArray(data.contacts)) {
      contacts = data.contacts;
    }
    
    console.log(`✅ ${contacts.length} contatos carregados da API`);
    if (contacts.length > 0) {
      console.log('📋 Exemplo de contato:', JSON.stringify(contacts[0], null, 2));
    }
    return contacts;
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    return [];
  }
}

// Buscar stages para identificar negócios ganhos/perdidos
async function fetchDealStagesMap(): Promise<Map<string, { name: string; isWon: boolean; isLost: boolean }>> {
  try {
    const data = await fetchJSON('/deal_stages');
    
    let stages = [];
    if (Array.isArray(data)) {
      stages = data;
    } else if (data.deal_stages && Array.isArray(data.deal_stages)) {
      stages = data.deal_stages;
    } else if (data.stages && Array.isArray(data.stages)) {
      stages = data.stages;
    }
    
    const stagesMap = new Map();
    stages.forEach((stage: any) => {
      const name = (stage.name || '').toLowerCase();
      stagesMap.set(stage.id, {
        name: stage.name,
        isWon: name.includes('ganho') || name.includes('won') || name.includes('fechado') || name.includes('closed'),
        isLost: name.includes('perdido') || name.includes('lost')
      });
    });
    
    return stagesMap;
  } catch (error) {
    console.error('Erro ao buscar stages:', error);
    return new Map();
  }
}

export const rdStationService = {
  // Buscar motivos de perda
  async getDealLostReasons(): Promise<DealLostReason[]> {
    try {
      const data = await fetchJSON('/deal_lost_reasons');
      const reasons = data.deal_lost_reasons || data || [];
      
      if (!reasons || reasons.length === 0) {
        console.warn('API não retornou dados, usando dados mock');
        return mockDealLostReasons;
      }
      
      return reasons;
    } catch (error) {
      console.error('Erro ao buscar motivos de perda, usando dados mock:', error);
      return mockDealLostReasons;
    }
  },

  // Buscar etapas do funil
  async getDealStages(): Promise<DealStage[]> {
    try {
      const data = await fetchJSON('/deal_stages');
      
      let stages = [];
      if (Array.isArray(data)) {
        stages = data;
      } else if (data.deal_stages && Array.isArray(data.deal_stages)) {
        stages = data.deal_stages;
      } else if (data.stages && Array.isArray(data.stages)) {
        stages = data.stages;
      }
      
      console.log('✅ Etapas carregadas da API:', stages);
      return stages;
    } catch (error) {
      console.error('Erro ao buscar etapas:', error);
      return [];
    }
  },

  // Buscar funis de venda (combinando com stages)
  async getDealPipelines(): Promise<DealPipeline[]> {
    if (USE_MOCK_PIPELINES) {
      console.log('🎯 Usando dados mock de funis (USE_MOCK_PIPELINES = true)');
      return Promise.resolve(mockDealPipelines);
    }

    try {
      const pipelinesData = await fetchJSON('/deal_pipelines');
      
      let pipelines = [];
      if (Array.isArray(pipelinesData)) {
        pipelines = pipelinesData;
      } else if (pipelinesData.deal_pipelines && Array.isArray(pipelinesData.deal_pipelines)) {
        pipelines = pipelinesData.deal_pipelines;
      } else if (pipelinesData.pipelines && Array.isArray(pipelinesData.pipelines)) {
        pipelines = pipelinesData.pipelines;
      }
      
      if (!pipelines || pipelines.length === 0) {
        console.warn('API não retornou funis, usando dados mock');
        return mockDealPipelines;
      }

      const stages = await this.getDealStages();
      
      if (!stages || stages.length === 0) {
        console.warn('API não retornou stages, usando dados mock');
        return mockDealPipelines;
      }

      const pipelinesWithStages = pipelines.map((pipeline: any) => {
        const pipelineStages = stages.filter((stage: any) => 
          stage.deal_pipeline_id === pipeline.id || 
          stage.pipeline_id === pipeline.id
        );
        
        return {
          id: pipeline.id,
          name: pipeline.name,
          stages: pipelineStages.map((stage: any) => ({
            id: stage.id,
            name: stage.name,
            deal_count: stage.deal_count || stage.deals_count || 0,
            total_value: stage.total_value || stage.amount || 0
          }))
        };
      });

      const validPipelines = pipelinesWithStages.filter((p: DealPipeline) => p.stages && p.stages.length > 0);
      
      if (validPipelines.length === 0) {
        console.warn('Nenhum pipeline com stages encontrado, usando dados mock');
        return mockDealPipelines;
      }
      
      console.log('✅ Funis com etapas carregados:', validPipelines);
      return validPipelines;
    } catch (error) {
      console.error('Erro ao buscar funis de venda, usando dados mock:', error);
      return mockDealPipelines;
    }
  },

  // Buscar campanhas com métricas agregadas
  async getCampaigns(): Promise<Campaign[]> {
    try {
      console.log('🔍 Buscando campanhas...');
      
      // Buscar campanhas básicas
      const data = await fetchJSON('/campaigns');
      
      let campaigns: Campaign[] = [];
      if (Array.isArray(data)) {
        campaigns = data;
      } else if (data.campaigns && Array.isArray(data.campaigns)) {
        campaigns = data.campaigns;
      }
      
      if (!campaigns || campaigns.length === 0) {
        console.warn('⚠️ Nenhuma campanha encontrada');
        return [];
      }
      
      console.log(`✅ ${campaigns.length} campanhas encontradas, buscando métricas...`);
      if (campaigns.length > 0) {
        console.log('📋 Exemplo de campanha:', JSON.stringify(campaigns[0], null, 2));
      }
      
      // Buscar todos os negócios e contatos em paralelo
      const [allDeals, _allContactsUnused, stagesMap] = await Promise.all([
        fetchAllDeals(),
        fetchAllContacts(),
        fetchDealStagesMap()
      ]);
      
      // Enriquecer cada campanha com métricas
      const enrichedCampaigns = campaigns.map((campaign) => {
        // Filtrar negócios desta campanha (verificar campaign.id ou campaign._id)
        const campaignDeals = allDeals.filter(deal => {
          if (!deal.campaign) return false;
          return deal.campaign.id === campaign.id || 
                 deal.campaign._id === campaign.id ||
                 String(deal.campaign.id) === String(campaign.id) ||
                 String(deal.campaign._id) === String(campaign.id);
        });
        
        // Contatos desta campanha: somar contatos vindos dos negócios e deduplicar por email/telefone
        const contactsFromDeals = (campaignDeals || []).flatMap(d => d.contacts || []);
        const uniqueContactsSet = new Set<string>();
        contactsFromDeals.forEach((c: any) => {
          const email = Array.isArray(c.emails) && c.emails[0]?.email ? String(c.emails[0].email).toLowerCase() : '';
          const phone = Array.isArray(c.phones) && c.phones[0]?.phone ? String(c.phones[0].phone).replace(/\D/g, '') : '';
          const key = email || phone || (c.name ? `name:${String(c.name).toLowerCase()}` : 'anon');
          uniqueContactsSet.add(key);
        });
        
        console.log(`📊 Campanha "${campaign.name}" (ID: ${campaign.id}):`, {
          negócios: campaignDeals.length,
          contatos: uniqueContactsSet.size
        });
        
        // Calcular métricas de negócios
        let wonDeals = 0;
        let lostDeals = 0;
        let totalValue = 0;
        let wonValue = 0;
        
        campaignDeals.forEach(deal => {
          const amount = Number(deal.amount_total || deal.amount) || 0;
          totalValue += amount;
          
          // Verificar status pelo stage (usar deal_stage.id se disponível)
          const stageId = deal.deal_stage?.id || deal.deal_stage_id;
          if (stageId && stagesMap.has(stageId)) {
            const stageInfo = stagesMap.get(stageId);
            if (stageInfo?.isWon) {
              wonDeals++;
              wonValue += amount;
            } else if (stageInfo?.isLost) {
              lostDeals++;
            }
          }

          // Fallback adicional: marcar como ganho/perdido por flags diretas
          if (deal.win === true) {
            wonDeals++;
            wonValue += amount;
          }
          if (deal.win === false || (deal.closed_at && amount === 0)) {
            lostDeals++;
          }
        });
        
        return {
          ...campaign,
          contacts_count: uniqueContactsSet.size,
          deals_count: campaignDeals.length,
          won_deals_count: wonDeals,
          lost_deals_count: lostDeals,
          total_value: totalValue,
          won_value: wonValue,
        };
      });
      
      console.log('✅ Campanhas com métricas carregadas:', enrichedCampaigns);
      return enrichedCampaigns;
      
    } catch (error) {
      console.error('❌ Erro ao buscar campanhas:', error);
      return [];
    }
  },
};
