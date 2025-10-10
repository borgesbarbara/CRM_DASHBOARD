# CRM Dashboard

Um dashboard moderno e responsivo para gerenciamento de relacionamento com clientes (CRM) construído com React, TypeScript e Tailwind CSS.

## 🚀 Funcionalidades

- **Dashboard Principal**: Visão geral com métricas e gráficos
- **Gestão de Clientes**: Cadastro e gerenciamento de clientes
- **Controle de Vendas**: Acompanhamento de vendas e oportunidades
- **Catálogo de Produtos**: Gerenciamento de produtos e serviços
- **Relatórios**: Análise detalhada com gráficos interativos
- **Configurações**: Personalização do sistema

## 🛠️ Tecnologias

- **React 18** - Biblioteca para interface de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool rápido e moderno
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento para aplicações React
- **Recharts** - Biblioteca de gráficos
- **Lucide React** - Ícones modernos

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd CRM_DASHBOARD
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

## 🏗️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout.tsx      # Layout principal
│   ├── Sidebar.tsx     # Barra lateral de navegação
│   └── Header.tsx      # Cabeçalho da aplicação
├── pages/              # Páginas da aplicação
│   ├── Dashboard.tsx   # Página principal
│   ├── Clientes.tsx    # Gestão de clientes
│   ├── Vendas.tsx      # Controle de vendas
│   ├── Produtos.tsx    # Catálogo de produtos
│   ├── Relatorios.tsx  # Relatórios e análises
│   └── Configuracoes.tsx # Configurações do sistema
├── App.tsx             # Componente raiz
├── main.tsx           # Ponto de entrada
└── index.css          # Estilos globais
```

## 🎨 Design System

O projeto utiliza um design system consistente com:
- Cores primárias em azul (#3B82F6)
- Tipografia clara e hierárquica
- Componentes responsivos
- Ícones do Lucide React
- Gráficos interativos com Recharts

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto para configurar variáveis de ambiente:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=CRM Dashboard
```

### Personalização
- Edite `tailwind.config.js` para personalizar o tema
- Modifique `src/index.css` para estilos globais
- Adicione novos componentes em `src/components/`

## 📱 Responsividade

O dashboard é totalmente responsivo e funciona em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Netlify
1. Build: `npm run build`
2. Publish directory: `dist`
3. Configure redirects para SPA

### Build Manual
```bash
npm run build
# Os arquivos estarão em ./dist
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, entre em contato através do email: suporte@empresa.com
