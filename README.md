# Voyager Website

Frontend moderno para assinantes do sistema Voyager, permitindo gerenciamento de preferências, visualização de alertas recebidos e histórico de promoções.

## Stack Tecnológica

- **Frontend**: Next.js 14 (App Router)
- **UI Framework**: shadcn/ui (Radix UI)
- **Styling**: Tailwind CSS
- **Backend**: Convex (alternativa ao Supabase)
- **Database**: PostgreSQL (via Convex)
- **Authentication**: Convex Auth
- **Hosting**: Vercel
- **Deployment**: Docker + Docker Compose

## Funcionalidades

### 1. Autenticação
- Login com email e senha
- Registro de novos usuários
- Recuperação de senha
- Sessão persistente (JWT)

### 2. Dashboard
- Visualização de alertas recebidos
- Filtros por data, origem, destino, companhia
- Estatísticas de promoções recebidas
- Gráficos de tendências de preços
- Exportação de dados (CSV, JSON)

### 3. Gerenciamento de Preferências
- Configuração de origens preferidas
- Faixa de preço máxima
- Companhias aéreas favoritas
- Tipos de viagem preferidos
- Frequência de alertas
- Canais de notificação (Telegram, Email, WhatsApp)

### 4. Histórico de Promoções
- Lista de todas as promoções recebidas
- Detalhes de cada promoção
- Filtros por período
- Comparação de preços
- Marcação de promoções como favoritas

### 5. Páginas Públicas
- Landing page moderna e responsiva
- Página de preços (página de destino)
- Página de companhias
- Página de dicas de viagem

## Estrutura de Diretórios

```
website/
├── app/
│   ├── (auth)/              # Autenticação
│   │   ├── login/          # Página de login
│   │   ├── register/       # Página de registro
│   │   └── forgot-password/ # Recuperação de senha
│   ├── (dashboard)/         # Dashboard
│   │   ├── alerts/         # Visualização de alertas
│   │   ├── statistics/     # Estatísticas
│   │   ├── preferences/     # Preferências
│   │   └── history/        # Histórico
│   ├── (public)/            # Páginas públicas
│   │   ├── landing/        # Landing page
│   │   ├── prices/         # Página de preços
│   │   ├── airlines/       # Página de companhias
│   │   └── tips/           # Página de dicas
│   ├── components/           # Componentes reutilizáveis
│   │   ├── ui/            # Componentes de UI
│   │   ├── layout/         # Layouts
│   │   └── charts/         # Gráficos
│   ├── lib/                 # Bibliotecas compartilhadas
│   │   ├── api/            # Cliente API Convex
│   │   ├── auth/           # Autenticação
│   │   ├── utils/          # Utilitários
│   │   └── types/          # Tipos TypeScript
│   ├── hooks/               # React hooks
│   ├── styles/              # Estilos globais
│   ├── config/              # Configurações
│   ├── public/              # Assets públicos
│   ├── middleware/           # Middleware
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página inicial
│   └── globals.css           # Estilos globais
├── convex/
│   ├── schema.sql            # Schema SQL do banco
│   ├── migrations/           # Migrações do banco
│   ├── seed.sql             # Dados iniciais
│   └── types.ts             # Tipos TypeScript para o schema
├── package.json             # Dependências
├── tsconfig.json           # Configuração TypeScript
├── tailwind.config.ts      # Configuração Tailwind
├── postcss.config.js       # Configuração PostCSS
├── next.config.mjs         # Configuração Next.js
├── Dockerfile              # Dockerfile
├── docker-compose.yml       # Docker Compose
└── .env.example            # Exemplo de variáveis de ambiente
```

## Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Docker e Docker Compose (opcional)

### Passo 1: Clonar o repositório

```bash
git clone https://github.com/seu-usuario/voyager.git
cd voyager/website
```

### Passo 2: Instalar dependências

```bash
npm install
# ou
yarn install
```

### Passo 3: Configurar variáveis de ambiente

```bash
cp .env.example .env
# Editar .env com suas configurações
```

### Passo 4: Iniciar o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

O website estará disponível em `http://localhost:3000`

## Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar servidor de produção
npm start

# Linting
npm run lint

# Type checking
npm run type-check

# Formatação
npm run format
npm run format:check
```

### Estrutura de Componentes

Todos os componentes estão localizados em `app/components/` e seguem o padrão do shadcn/ui.

#### Componentes de UI

- `Button` - Botões primários e secundários
- `Input` - Campos de formulário
- `Card` - Cards de conteúdo
- `Modal` - Modais e diálogos
- `Badge` - Badges e indicadores
- `Alert` - Alertas e notificações
- `Table` - Tabelas de dados
- `Chart` - Gráficos e visualizações
- `Avatar` - Avatares de usuários
- `Icon` - Ícones e símbolos

## Deploy

### Vercel

1. Conectar repositório ao Vercel
2. Configurar variáveis de ambiente
3. Deploy automático em cada push

### Docker

```bash
# Build da imagem
docker build -t voyager-website .

# Executar container
docker run -p 3000:3000 voyager-website

# Usar Docker Compose
docker-compose up -d
```

## Variáveis de Ambiente

### Convex Configuration
- `NEXT_PUBLIC_CONVEX_URL` - URL do projeto Convex
- `NEXT_PUBLIC_CONVEX_ANON_KEY` - Chave anônima do Convex

### Site Configuration
- `NEXT_PUBLIC_SITE_URL` - URL do site (ex: http://localhost:3000)

### Application Configuration
- `NEXT_PUBLIC_APP_NAME` - Nome do aplicativo
- `NEXT_PUBLIC_APP_DESCRIPTION` - Descrição do aplicativo
- `NEXT_PUBLIC_APP_COLOR` - Cor principal
- `NEXT_PUBLIC_APP_ICON` - Ícone do aplicativo

### Social Media
- `NEXT_PUBLIC_APP_SOCIAL_IMAGE` - Imagem para redes sociais
- `NEXT_PUBLIC_APP_TWITTER_HANDLE` - Handle do Twitter
- `NEXT_PUBLIC_APP_FACEBOOK_ID` - ID do Facebook

### Domain
- `NEXT_PUBLIC_APP_DOMAIN` - Domínio do site
- `NEXT_PUBLIC_APP_LOCALE` - Localização (pt-BR)
- `NEXT_PUBLIC_APP_URL` - URL completa do site

### Meta
- `NEXT_PUBLIC_APP_START_YEAR` - Ano de início
- `NEXT_PUBLIC_APP_START_MONTH` - Mês de início
- `NEXT_PUBLIC_APP_AUTHOR` - Autor
- `NEXT_PUBLIC_APP_AUTHOR_URL` - URL do autor

### Support
- `NEXT_PUBLIC_APP_SUPPORT_EMAIL` - Email de suporte
- `NEXT_PUBLIC_APP_SUPPORT_URL` - URL de suporte
- `NEXT_PUBLIC_APP_PRIVACY_URL` - URL de privacidade
- `NEXT_PUBLIC_APP_TERMS_URL` - URL de termos

### SEO
- `NEXT_PUBLIC_APP_ROBOTS_TXT` - Configuração de robots.txt
- `NEXT_PUBLIC_APP_SITEMAP_URL` - URL do sitemap

### Theme
- `NEXT_PUBLIC_APP_THEME_COLOR` - Cor do tema
- `NEXT_PUBLIC_APP_BACKGROUND_COLOR` - Cor de fundo

### Analytics
- `NEXT_PUBLIC_APP_GA_TRACKING_ID` - ID do Google Analytics
- `NEXT_PUBLIC_APP_VERCEL_ANALYTICS_ID` - ID do Vercel Analytics

### Voyager API Integration
- `VOYAGER_API_URL` - URL da API Voyager
- `VOYAGER_API_KEY` - Chave da API Voyager

## Testes

```bash
# Executar testes
npm test

# Executar testes com coverage
npm test:coverage

# Executar testes E2E
npm test:e2e
```

## Contribuição

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Suporte

Para suporte, entre em contato:
- Email: suporte@voyager.com.br
- URL: https://voyager.com.br/suporte

## Links

- [Documentação do Voyager](https://voyager.com.br/docs)
- [API do Voyager](https://voyager.com.br/api)
- [Convex](https://convex.dev)
- [Next.js](https://nextjs.org)
- [shadcn/ui](https://ui.shadcn.com)
