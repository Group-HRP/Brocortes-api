# BroCortes API - Agendamentos para Barbearia 🚀✂️

API para gerenciamento de agendamentos e notificações da barbearia BroCortes

## 📋 Visão Geral

API desenvolvida em NestJS para:
- Gestão de agendamentos
- Cadastro de clientes e barbeiros
- Envio de notificações automáticas
- Integração com serviços externos

## 🛠 Tecnologias Utilizadas

- **NestJS** (Framework Node.js)
- **Prisma** (ORM)
- **PostgreSQL** (Banco de dados)
- **Nodemailer** (Envios de e-mail)
- **JWT** (Autenticação)
- **Swagger** (Documentação de API)

## 🔧 Configuração do Ambiente

### Pré-requisitos

- Node.js v16+
- PostgreSQL
- Yarn ou NPM

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/brocortes-api.git
   cd brocortes-api
   ```

2. Instale as dependências:
   ```bash
   yarn install
   # ou
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
   Edite o `.env` com suas configurações

4. Execute as migrações do banco de dados:
   ```bash
   yarn prisma migrate dev
   ```

5. Inicie o servidor:
   ```bash
   yarn start:dev
   ```

## 🌐 Endpoints Principais

### Agendamentos
- `POST /appointments` - Criar novo agendamento
- `GET /appointments` - Listar agendamentos
- `PUT /appointments/:id` - Atualizar agendamento
- `DELETE /appointments/:id` - Cancelar agendamento

### Clientes
- `POST /clients` - Cadastrar novo cliente
- `GET /clients` - Listar clientes

### Barbeiros
- `POST /barbers` - Cadastrar barbeiro
- `GET /barbers/available` - Listar barbeiros disponíveis

### Notificações
- `POST /notifications` - Enviar notificação
- `GET /notifications/user/:userId` - Listar notificações do usuário

## 📧 Configuração de Notificações

Configure no `.env` as credenciais SMTP para envio de lembretes:

```env
SMTP_HOST=seu.servidor.smtp
SMTP_PORT=587
SMTP_USER=seu_email
SMTP_PASSWORD=sua_senha
SMTP_FROM_EMAIL=contato@brocortes.com
SMTP_FROM_NAME="BroCortes"
```

## 📊 Banco de Dados

Diagrama simplificado:

```
Clientes ────◄ Agendamentos ►─── Barbeiros
                │
                ▼
           Notificações
```

## 🚀 Deploy

Para ambiente de produção:

```bash
yarn build
yarn start:prod
```

Recomendado usar PM2 ou Docker para produção.

## 📄 Documentação da API

Acesse a documentação Swagger em:
`http://localhost:3000/api` (em desenvolvimento)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie sua branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📧 Contato

Equipe BroCortes - pedrodesenvolvedor06@gmail.com

---

**© 2025 BroCortes API** - Todos os direitos reservados