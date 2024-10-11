const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  
    password: '',  
    database: 'mentaljourney'
});

// Conectando ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados!');
    }
});

// CRUD Paciente
app.get('/pacientes', (req, res) => {
    const sql = 'SELECT * FROM Paciente';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
});

app.post('/pacientes', (req, res) => {
    const { Nome_Completo, Data_Nascimento, CPF, Telefone, Email, Motivo_Consulta, Senha_Pessoal } = req.body;
    const sql = 'INSERT INTO Paciente (Nome_Completo, Data_Nascimento, CPF, Telefone, Email, Motivo_Consulta, Senha_Pessoal) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [Nome_Completo, Data_Nascimento, CPF, Telefone, Email, Motivo_Consulta, Senha_Pessoal], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Paciente criado com sucesso!', id: result.insertId });
        }
    });
});

// CRUD Profissional
app.get('/profissionais', (req, res) => {
    const sql = 'SELECT * FROM Profissional';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
});

app.post('/profissionais', (req, res) => {
    const { Nome_Completo, Data_Nascimento, CPF, Telefone, Email, Formacao_Academica, Instituicao_Ensino, Data_Conclusao, Diploma } = req.body;
    const sql = 'INSERT INTO Profissional (Nome_Completo, Data_Nascimento, CPF, Telefone, Email, Formacao_Academica, Instituicao_Ensino, Data_Conclusao, Diploma) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [Nome_Completo, Data_Nascimento, CPF, Telefone, Email, Formacao_Academica, Instituicao_Ensino, Data_Conclusao, Diploma], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Profissional criado com sucesso!', id: result.insertId });
        }
    });
});

// CRUD Consulta
app.get('/consultas', (req, res) => {
    const sql = 'SELECT * FROM Consulta';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
});

app.post('/consultas', (req, res) => {
    const { ID_Paciente, ID_Profissional, Data_Consulta, Observacoes } = req.body;
    const sql = 'INSERT INTO Consulta (ID_Paciente, ID_Profissional, Data_Consulta, Observacoes) VALUES (?, ?, ?, ?)';
    db.query(sql, [ID_Paciente, ID_Profissional, Data_Consulta, Observacoes], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Consulta criada com sucesso!', id: result.insertId });
        }
    });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
