📔 Agenda G-D-C 

Uma aplicação completa para gerenciamento de contatos, contando com uma interface web (Frontend), uma API REST (Backend) e testes de integração.




🚀 Funcionalidades


Frontend Dinâmico: Interface simples para criar, editar e excluir contatos com persistência local via localStorage.
API REST (Backend): Servidor em Node.js para recebimento e listagem de contatos.
Validação de Dados: O sistema impede a criação de contatos sem informações obrigatórias.
Testes Automatizados: Suíte de testes para garantir que a criação de contatos e as validações funcionem corretamente.




🛠️ Tecnologias Utilizadas
Frontend: HTML5, CSS3 e JavaScript (ES6+).
Backend: Node.js com framework Express.
Testes: Jest e Supertest.



📂 Estrutura do Projeto
text
├── frontend/
│   ├── index.html      # Interface do usuário
│   ├── style.css       # Estilização
│   └── script.js       # Lógica do navegador
├── backend/
│   ├── app.js          # Configuração do servidor Express
│   └── server.js       # Inicialização do servidor (Porta 3000)
└── tests/
    └── contatos.test.js # Testes automatizados de API


⚙️ Como Executar
1. Backend
Navegue até a pasta do backend e instale as dependências:
bash
npm install express
node server.js
Use o código com cuidado.

O servidor estará rodando em http://localhost:3000.
2. Frontend
Basta abrir o arquivo index.html no seu navegador para interagir com a interface.
3. Testes
Para rodar os testes de integração:
bash
npm test


🧪 Exemplos de Testes realizados
Criação com Sucesso: Verifica se o contato é criado e retorna status 201.
Validação de Erro: Garante que a API retorne status 400 caso campos obrigatórios (como e-mail) não sejam enviados.