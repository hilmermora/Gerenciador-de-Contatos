const request = require('supertest');
const app = require('../../app');

describe('Testes do Gerenciador de Contatos', () => {

  
  test('Deve criar um contato com sucesso', async () => {
    const res = await request(app)
      .post('/contatos')
      .send({
        nome: "Rodrigo Silva",
        email: "rodrigo@email.com",
        telefone: "1199999999"
      });

   
    expect(res.statusCode).toBe(201);
    
   
    expect(res.body.nome).toBe("Rodrigo Silva");
    expect(res.body).toHaveProperty('id');
  });

 
  test('Deve barrar a criação de contato sem email', async () => {
    const res = await request(app)
      .post('/contatos')
      .send({ nome: "João Sem Email" });

    
    expect(res.statusCode).toBe(400);
    expect(res.body.mensagem).toBe("Nome e Email são obrigatórios!");
  });

});