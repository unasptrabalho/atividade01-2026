const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: 'benserverplex.ddns.net',
  user: 'alunos',
  password: 'senhaAlunos',
  database: 'web_03mc', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/produtos', (req, res) => {
  const { nome, preco, categoria, descricao } = req.body;

  if (!nome || !preco || !categoria || !descricao) {
    return res.status(400).json({ message: 'Por favor, envie nome, preco, categoria e descricao.' });
  }

  const query = 'INSERT INTO products_geovanna (name, price, category, description) VALUES (?, ?, ?, ?)';

  pool.query(query, [nome, preco, categoria, descricao], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro interno ao cadastrar.' });
    }
    if (result.affectedRows > 0) {
      return res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
    }
  });
});

app.get('/produtos', (req, res) => {
  const query = 'SELECT id, name AS nome, price AS preco, category AS categoria, description AS descricao FROM products_geovanna';

  pool.query(query, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro interno ao buscar.' });
    }
    if (rows.length > 0) {
      return res.json(rows);
    }
    return res.status(404).json({ message: 'Nenhum produto encontrado.' });
  });
});

app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products_geovanna WHERE id = ?';

  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro interno ao deletar.' });
    }
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Produto apagado com sucesso!' });
    }
    return res.status(404).json({ message: 'Produto não encontrado.' });
  });
});

app.listen(3333, () => {
  console.log('Server started on http://localhost:3333');
});