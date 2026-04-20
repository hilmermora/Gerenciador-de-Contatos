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



🧪 Exemplos de Testes realizados Criação com Sucesso: Verifica se o contato é criado e retorna status 201.
Validação de Erro: Garante que a API retorne status 400 caso campos obrigatórios (como e-mail) não sejam enviados.

Título: Rota DELETE /games/:id não remove o registro do banco de dados.

Prioridade (P): Alta (P1).

Severidade (S): Crítica (S1) - Função principal não funciona.

Passos para Reproduzir:

Criar um jogo via POST /games.

Anotar o ID gerado.

Chamar a rota DELETE /games/{id}.

Chamar a rota GET /games.

Resultado Esperado: O jogo com o ID deletado não deve constar na lista.

Resultado Obtido: O jogo permanece na lista e a rota DELETE retornou status 200 indevidamente.

Evidências: Print da tela do Postman mostrando o ID ainda presente após o delete.

Ambiente: Localhost / Windows 11 / Node.js v20.


 1. O que um teste automatizado verifica em uma API?
Ele verifica se a "conversa" entre sistemas funciona. Checa se o endereço (rota) existe, se o código de resposta (status) está certo, se os dados enviados chegam corretamente e se o que a API devolve é o que foi pedido.

 2. Qual a diferença entre os erros 400 e 500?

400 (Bad Request): Erro do Cliente. Você enviou algo errado, faltou um campo ou o formato está inválido. É como tentar entrar num cinema sem ingresso.

500 (Internal Server Error): Erro do Servidor. O código da API quebrou, o banco de dados caiu ou houve um "bug" interno. É como se o cinema estivesse com a luz cortada.

3. Por que testes automatizados são importantes?
Porque eles dão segurança e velocidade. Eles evitam que, ao consertar uma coisa, você quebre outra que já funcionava (regressão). Além disso, o computador testa em segundos o que um humano demoraria horas para clicar manualmente.
