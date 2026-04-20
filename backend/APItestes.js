const express = require('express');
const app = express();

app.use(express.json()); 

let games = []; 


app.get('/games', (req, res) => {
    res.status(200).json(games);
});


app.post('/games', (req, res) => {
    const { nome, genero } = req.body;


    if (!nome || !genero) {
        return res.status(400).json({ mensagem: "Nome e gênero são obrigatórios" });
    }

    const novoJogo = { nome, genero };
    games.push(novoJogo);

    res.status(201).json(novoJogo);
});


module.exports = app;

if (require.main === module) {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}