# 📈 Home Broker – Plataforma de Negociação de Ativos

Este projeto é uma plataforma de Home Broker que permite aos usuários comprarem, venderem e acompanharem ativos financeiros em tempo real. A aplicação é construída com **Nest.js** no backend e **Next.js** no frontend, **Kafka** para mensageria e **GoLang** para simular uma bolsa de valores com integração via **WebSockets** para atualização em tempo real.

---

## 📚 Sumário

- [🔧 Tecnologias](#tecnologias)
- [📐 Arquitetura](#arquitetura)
- [✅ Casos de Uso](#casos-de-uso)
- [📊 Diagrama ER](#diagrama-er)
- [🛠️ Backend (Nest.js)](#backend-nestjs)
- [💻 Frontend (Next.js)](#frontend-nextjs)
- [🔌 Integração em Tempo Real (WebSocket)](#websocket)
- [📡 GoLang e Kafka](#comunicacao)
- [🤸 Início Rápido](#inicio)
- [📦 Estrutura de Pastas](#pastas)

---

## <a name="tecnologias"> 🔧 Tecnologias </a>

### Backend

- Nest.js
- MongoDB
- WebSockets
- Docker

### Frontend

- Next.js
- Tailwind CSS
- React
- WebSockets

---

## <a name="arquitetura"> 📐 Arquitetura </a>

O sistema é dividido em três principais partes:

- **Client (Next.js)**: onde os usuários interagem com o sistema.
- **API Gateway (Nest.js)**: orquestra requisições entre o cliente, banco de dados e microserviços.
- **Serviços de mensageria e persistência**: banco de dados (MongoDB), Kafka e WebSocket para tempo real.

---

## <a name="casos-de-uso"> ✅ Casos de Uso</a>

1. Criar ordens de compra e venda
2. Consultar ordens de compra e venda
3. Consultar ativos (preços e outras informações)
4. Consultar ativos na carteira

**Implícitos:**

- Criar ativos
- Criar carteira
- Realizar autenticação

---

## <a name="diagrama-er"> 📊 Diagrama ER </a>

As principais entidades do sistema incluem:

- **Usuário**
- **Carteira**
- **Ativo**
- **Ordem**
- **Negociação**

As relações entre essas entidades garantem a integridade das operações de compra e venda, bem como o rastreamento das carteiras dos usuários.

---

## <a name="backend-nestjs"> 🛠️ Backend (Nest.js)</a>

- Estruturado em **módulos, serviços e controllers**.
- Utiliza **WebSockets** para comunicação em tempo real.
- Suporte a autenticação e autorização.
- Responsável por persistência e regras de negócio.

## <a name="frontend-nextjs"> 💻 Frontend (Next.js) </a>

- Interface moderna com Tailwind CSS.
- Utiliza SSR/SSG para melhor performance e SEO.
- Integração com WebSocket Client para dados em tempo real.
- Componentes separados por domínio (Ex: Carteira, Ordens, Ativos).

---

## <a name="websocket"> 🔌 Integração em Tempo Real (WebSocket) websocket </a>

- WebSockets são utilizados para comunicação bidirecional entre cliente e servidor.
- Permite atualizações instantâneas sobre ordens, negociações e cotações de ativos.
- Implementado tanto no lado do servidor (Nest.js) quanto no cliente (Next.js).

### Eventos suportados:

- `send_order`
- `match_orders`
- `update_prices`
- `order_status`

---

## <a name="comunicacao"> 📡 Comunicação com Kafka e Simulação da Bolsa (Go) </a>

### Kafka

O projeto utiliza **Apache Kafka** como intermediário de mensagens entre os serviços para garantir comunicação assíncrona, escalabilidade e tolerância a falhas.

- Publicação de ordens realizadas pelo cliente
- Processamento e match de ordens
- Notificações de negociações concluídas

### Simulador da Bolsa (Go)

Foi desenvolvido um serviço em **Golang** que simula o comportamento da bolsa de valores. Este serviço:

- Consome mensagens de ordens do Kafka
- Realiza o matching de ordens de compra e venda
- Publica os resultados (negociações) de volta no Kafka
- Atua como mecanismo central de negociação

### Fluxo de Mensagens

1. Cliente envia ordem via frontend
2. Backend (Nest.js) publica a ordem no Kafka
3. Simulador (Go) consome e processa a ordem
4. Resultado da negociação é enviado de volta ao Kafka
5. Backend escuta o resultado e envia via WebSocket ao cliente

---

## <a name="inicio"> 🚀 Como executar localmente </a>

### Pré-requisitos

- Docker e Docker Compose
- Node.js 18+
- Yarn ou NPM

### Comandos

```bash
# Clone o repositório
git clone https://github.com/Joclelsonr/full-stack-home-broker.git

# Acesse a pasta
cd full-stack-home-broker

# Suba os containers
docker-compose up -d

# Acesse o frontend
http://localhost:3000

# Acesse o backend
http://localhost:3001
```

---

## <a name="pastas"> 📦 Estrutura de Serviços </a>

```
/full-stack-home-broker/
├── backend/               # API Nest.js
├── frontend/              # Front-end Next.js
├── golang/                # Serviço em Go (simulação da bolsa)
├── golang/docker-compose  # Configuração do Kafka com Docker
├── docker-compose.yml
```
