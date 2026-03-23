const express = require('express');
const app = express();

app.use(express.json()); 

let contatos = [];


app.post('/contatos', (req, res) => {
    const novoContato = req.body;
    contatos.push(novoContato);
    console.log("Contato recebido:", novoContato);
    res.status(201).json(novoContato);
});

const PORT = 3000;
app.get('/contatos', (req, res) => {
    res.status(200).json(contatos);
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);

    module.exports = app;
});