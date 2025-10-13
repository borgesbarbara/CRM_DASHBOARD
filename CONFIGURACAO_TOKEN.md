# Configuração do Token RD Station

## Como configurar o token

Para que as campanhas exibam métricas reais (contatos, negócios, conversões), você precisa configurar o token do RD Station.

### Passo 1: Criar arquivo .env

Na raiz do projeto, crie um arquivo chamado `.env` (sem extensão adicional):

```bash
# Token do RD Station CRM
VITE_RD_TOKEN=681cb285978e2f00145fb15d
```

### Passo 2: Reiniciar o servidor

Após criar o arquivo `.env`, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Como funciona

O sistema agora:

1. **Busca todas as campanhas** do RD Station
2. **Busca todos os negócios** e filtra por `campaign_id`
3. **Busca todos os contatos** e filtra por `campaign_id`
4. **Identifica negócios ganhos/perdidos** através dos stages (etapas)
5. **Calcula as métricas**:
   - Total de contatos
   - Total de negócios
   - Negócios ganhos
   - Negócios perdidos
   - Taxa de conversão
   - Valor total e valor ganho

## Observações

- O token já está no código como fallback: `681cb285978e2f00145fb15d`
- Se você criar o `.env`, ele terá prioridade
- O arquivo `.env` está no `.gitignore` e não será commitado
- As métricas são calculadas em tempo real a partir dos dados da API

## Endpoints utilizados

- `/campaigns` - Lista de campanhas
- `/deals` - Todos os negócios (filtramos por campaign_id)
- `/contacts` - Todos os contatos (filtramos por campaign_id)
- `/deal_stages` - Etapas para identificar ganhos/perdas

## Troubleshooting

Se as métricas continuarem zeradas:

1. Verifique no console do navegador se há erros
2. Confirme que os negócios/contatos têm o campo `campaign_id` preenchido
3. Teste os endpoints manualmente:

```bash
curl -H 'accept: application/json' \
  'https://crm.rdstation.com/api/v1/campaigns?token=SEU_TOKEN'

curl -H 'accept: application/json' \
  'https://crm.rdstation.com/api/v1/deals?token=SEU_TOKEN'

curl -H 'accept: application/json' \
  'https://crm.rdstation.com/api/v1/contacts?token=SEU_TOKEN'
```

