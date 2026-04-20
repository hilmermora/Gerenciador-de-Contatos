const request = require('supertest');
const app = require('./ApiTestes'); 

describe('Suíte de Testes da API de Jogos', () => {


    test('Exercício 1 e 2: Listar jogos e validar tipo', async () => {
        const res = await request(app).get('/games');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });


    test('Exercício 3: Criar um jogo válido', async () => {
        const novoJogo = { nome: "Elden Ring", genero: "RPG" };
        const res = await request(app).post('/games').send(novoJogo);
        expect([200, 201]).toContain(res.statusCode);
    });

    test('Exercício 4: Validar erro 400 ao enviar corpo vazio', async () => {
        const res = await request(app).post('/games').send({});
        expect(res.statusCode).toBe(400);
    });

    test('Exercício 5: Buscar jogo por ID', async () => {
  
        const criado = await request(app).post('/games').send({ nome: "Zelda", genero: "Aventura" });
        const id = criado.body.id;

        const res = await request(app).get(`/games/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.nome).toBe("Zelda");
    });


    test('Exercício 6: Fluxo completo (POST -> GET -> DELETE -> GET 404)', async () => {
    
        const criado = await request(app).post('/games').send({ nome: "Doom", genero: "FPS" });
        const id = criado.body.id;
        expect(criado.statusCode).toBe(201);

     
        const busca = await request(app).get(`/games/${id}`);
        expect(busca.statusCode).toBe(200);

    
        const removido = await request(app).delete(`/games/${id}`);
        expect(removido.statusCode).toBe(200); // ou 204


        const buscaFinal = await request(app).get(`/games/${id}`);
        expect(buscaFinal.statusCode).toBe(404);
    });
});