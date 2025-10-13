# 🔧 Configuração da API do RD Station

## ⚠️ Token de API

Atualmente o token está **hardcoded** no arquivo `src/services/rdStation.ts` para facilitar o desenvolvimento inicial.

### Token atual:
```
681cb285978e2f00145fb15d
```

## 🔐 Para produção (recomendado):

### 1. Criar arquivo `.env` na raiz do projeto:

```bash
# Na raiz do projeto (/Users/barbarabborges/CRM_DASHBOARD)
touch .env
```

### 2. Adicionar o token no arquivo `.env`:

```env
VITE_RD_STATION_TOKEN=681cb285978e2f00145fb15d
VITE_RD_STATION_API_URL=https://crm.rdstation.com/api/v1
```

### 3. Atualizar o arquivo `src/services/rdStation.ts`:

```typescript
// Trocar estas linhas:
const RD_STATION_TOKEN = '681cb285978e2f00145fb15d';
const RD_STATION_API_URL = 'https://crm.rdstation.com/api/v1';

// Por estas:
const RD_STATION_TOKEN = import.meta.env.VITE_RD_STATION_TOKEN;
const RD_STATION_API_URL = import.meta.env.VITE_RD_STATION_API_URL;
```

### 4. Reiniciar o servidor de desenvolvimento:

```bash
npm run dev
```

## 📝 Nota sobre .gitignore

O arquivo `.env` já está configurado no `.gitignore`, então seu token **não será** enviado para o GitHub.

## 🚀 Como obter um novo token

1. Acesse: https://crm.rdstation.com/
2. Vá em **Configurações** → **Integrações** → **API**
3. Gere um novo token de acesso
4. Substitua no arquivo `.env`

## 🔍 Verificar se está funcionando

Após configurar, acesse a aba **Relatórios** no dashboard e você verá os dados reais do RD Station sendo carregados!

