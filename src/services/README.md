# 🔌 Services - Integração com APIs

Esta pasta contém todos os serviços de integração com APIs externas.

## 📁 Estrutura

```
services/
└── rdStation.ts    # Serviço do RD Station CRM
```

## 🚀 Como usar

### Importar o serviço:
```typescript
import { rdStationService } from '../services/rdStation';
```

### Usar em um componente:
```typescript
const data = await rdStationService.getDealLostReasons();
```

### Usar com hook customizado (recomendado):
```typescript
import { useDealLostReasons } from '../hooks/useDealLostReasons';

function MeuComponente() {
  const { reasons, loading, error } = useDealLostReasons();
  
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  
  return <div>{reasons.map(r => r.name)}</div>;
}
```

## 🔧 Adicionar novos endpoints

### 1. Adicionar no service (rdStation.ts):
```typescript
export interface Deal {
  id: number;
  name: string;
  amount: number;
}

export const rdStationService = {
  // ... métodos existentes
  
  async getDeals(): Promise<Deal[]> {
    try {
      const url = `${RD_STATION_API_URL}/deals?token=${RD_STATION_TOKEN}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar deals:', error);
      throw error;
    }
  }
};
```

### 2. Criar hook customizado (hooks/useDeals.ts):
```typescript
import { useState, useEffect } from 'react';
import { rdStationService, Deal } from '../services/rdStation';

export function useDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const data = await rdStationService.getDeals();
        setDeals(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  return { deals, loading, error };
}
```

### 3. Usar no componente:
```typescript
import { useDeals } from '../hooks/useDeals';

function DealsPage() {
  const { deals, loading, error } = useDeals();
  
  // ... seu código aqui
}
```

## 🔐 Segurança

⚠️ **IMPORTANTE**: O token está hardcoded no código por simplicidade, mas em produção você deve:

1. Criar arquivo `.env` na raiz:
```env
VITE_RD_STATION_TOKEN=seu_token_aqui
```

2. Usar variável de ambiente:
```typescript
const RD_STATION_TOKEN = import.meta.env.VITE_RD_STATION_TOKEN;
```

3. Adicionar `.env` no `.gitignore` (já está configurado)

## 📚 Endpoints disponíveis do RD Station

Consulte a documentação oficial: https://developers.rdstation.com/

Endpoints comuns:
- `/deal_lost_reasons` - Motivos de perda ✅ (implementado)
- `/deals` - Negócios/Oportunidades
- `/contacts` - Contatos
- `/users` - Usuários
- `/deal_stages` - Estágios do funil
- `/activities` - Atividades

