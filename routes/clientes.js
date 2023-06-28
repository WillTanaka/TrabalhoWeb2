const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ClienteController = require('../controller/clienteController');
const clienteController = new ClienteController();
const auth = require('../middleware/auth')
const { ObjectId } = require('mongodb');
router.get('/novoCliente', (req, res) => {
  res.render('novoCliente');
});

router.post('/novoCliente', async (req, res) => {
  const { nome, email, senha } = req.body;

  const novoCliente = {
    nome,
    email,
    senha,
    timestamp: new Date().getTime(),
  };

  await clienteController.createCliente(novoCliente)
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
      const token = jwt.sign({ clienteId: user._id }, process.env.JWT_SENHA, { expiresIn: '1h' });
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

router.get('/editarCliente', auth, async (req, res) => {
  try {
    const clienteId = req.user.clienteId; // Obtenha o clienteId do token (você precisa adicionar a autenticação do token)
    console.log(clienteId)
    const cliente = await clienteController.findOne({ _id: new ObjectId(clienteId) });

    if (cliente) {
      res.render('conta', { cliente });
    } else {
      res.status(404).send('Cliente não encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

router.post('/editarCliente', auth, async (req, res) => {
  try {
    const clienteId = req.user.clienteId; // Obtenha o clienteId do token (você precisa adicionar a autenticação do token)
    const { nome, email, senha } = req.body;

    const filter = { _id: new ObjectId(clienteId) };
    const update = { $set: { nome, email, senha } };

    await clienteController.updateCliente(filter, update);
    res.redirect('/home');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

router.delete('/excluirCliente', auth, async (req, res) => {
  try {
    const clienteId = req.user.clienteId; // Obtenha o clienteId do token (você precisa adicionar a autenticação do token)
    const filter = { _id: new ObjectId(clienteId) };

    await clienteController.deleteCliente(filter);
    res.redirect('/logout')
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;