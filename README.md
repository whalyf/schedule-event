# Schedule Event

## Descrição

O projeto **schedule-event** é uma aplicação para gerenciar eventos e programações. Ele fornece uma interface fácil e intuitiva de usar para os usuários agendarem e acompanhar eventos, seja para reuniões, conferências, ou qualquer outro tipo de evento programado pelo anfitrião.

## Funcionalidades Principais

- Agendamento de eventos
- Visualização de agenda
- Edição e Remoção de Eventos
- Visual intuitivo

## Tecnologias Utilizadas

- Frontend: [React](https://reactjs.org/)
- Backend: [Node.js](https://nodejs.org/),[NestJS](https://nestjs.com/)
- Banco de Dados: [SQLite](https://www.sqlite.org/) com PRISMA ORM


## Instalação

Para configurar o projeto localmente, siga estas instruções:

1. Clone o repositório: `git clone https://github.com/whalyf/schedule-event.git`
2. Instale as dependências do frontend: `cd react-app && npm install`
3. Instale as dependências do backend: `cd api && npm install`
4. Configure as variáveis de ambiente (crie um arquivo `.env` por exemplo com a chave `DATABASE_URL = 'file:./dev.db`)
5. Execute o backend: `npm start`
6. Execute o frontend: `npm dev`

## Sugestões de Melhorias
1. Implementar GraphQL para as chamadas
2. Utilizar react-query para manipulação dos dados em cache e melhor fluidez do app
3. Utilizar postgreSQL para melhor manipulação dos dados
