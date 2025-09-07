const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises; // Usaremos a versão com promessas para facilitar o código
const path = require('path');

const app = express();
const PORT = 3000;
const BD_PATH = path.join(__dirname, 'data', 'bd.json');

// Middleware para processar requisições
app.use(cors());
app.use(bodyParser.json());

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(__dirname));

// Endpoint para obter todos os lançamentos
app.get('/lancamentos', async (req, res) => {
    try {
        const data = await fs.readFile(BD_PATH, 'utf8');
        const lancamentos = JSON.parse(data);
        res.json(lancamentos);
    } catch (error) {
        // Se o arquivo não existir ou houver erro, retorna um array vazio
        res.status(200).json([]);
    }
});

// Endpoint para adicionar um novo lançamento
app.post('/lancamentos', async (req, res) => {
    try {
        const newLancamento = req.body;
        const data = await fs.readFile(BD_PATH, 'utf8');
        const lancamentos = JSON.parse(data);
        
        lancamentos.push(newLancamento);

        await fs.writeFile(BD_PATH, JSON.stringify(lancamentos, null, 2), 'utf8');
        res.status(201).json(newLancamento);
    } catch (error) {
        console.error('Erro ao salvar o lançamento:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});