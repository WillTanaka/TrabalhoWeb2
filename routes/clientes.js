const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ClienteController = require('../controller/clienteController');
const clienteController = new ClienteController();


router.get('/novoCliente', (req, res) => {
  res.render('novoCliente');
});

router.post('/novoCliente', (req, res) => {
  const { nome, email, senha } = req.body;

  const novoCliente = {
    nome,
    email,
    senha,
    timestamp: new Date().getTime(),
  };

  clienteController.createCliente(novoCliente)
    .then(() => {
      res.render('login');
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o cliente.' });
    });
});

router.post('/loginCliente', async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  try {
    const user = await clienteController.findOne({ email, senha });

    if (user) {
      const token = jwt.sign({ clienteId: user._id }, process.env.JWT_SENHA, { expiresIn: '10m' });
      res.cookie('token', token, { httpOnly: true });
      res.redirect('/home');
    } else {
      res.status(400).json({ error: 'Email ou senha inválidos' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});


module.exports = router;
