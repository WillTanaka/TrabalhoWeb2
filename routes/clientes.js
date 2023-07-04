const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ClienteController = require('../controller/clienteController');
const clienteController = new ClienteController();
const auth = require('../middleware/auth')
const { ObjectId } = require('mongodb');
const valida = require('./validacao/validacao')
const validacoes = new valida();

router.get('/conta', (req, res) => {
  res.render('conta')
});

router.post('/novoCliente', async (req, res) => {
  const { nome, email, senha } = req.body;

  const novoCliente = {
    nome,
    email,
    senha,
    timestamp: new Date().getTime(),
  };
  const { error } = validacoes.validacaoClientes(novoCliente)
  if (error) {
    res.status(500).json({ error: error });
  } else {
    await clienteController.createCliente(novoCliente)
      .then((result) => {
        res.status(200).json({ result: result + "Produto cadastrado." });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o cliente.' });
      });
  }

});

router.post('/loginCliente', async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  try {
    const user = await clienteController.findOne({ email, senha });

    if (user) {
      const token = jwt.sign({ clienteId: user._id }, process.env.JWT_SENHA, { expiresIn: '1h' });
      res.status(200).json({ token: token, clienteId: user._id });
    } else {
      res.status(401).json({ error: "Email ou senha incorreta" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

router.get('/editarCliente', auth, async (req, res) => {
  try {
    const clienteId = req.user.clienteId;
    const cliente = await clienteController.findOne({ _id: new ObjectId(clienteId) });

    if (cliente) {
      res.status(200).json({ cliente });
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
    const clienteId = req.user.clienteId;
    const { nome, email, senha } = req.body;
    const novoCliente = {
      nome,
      email,
      senha,
      timestamp: new Date().getTime(),
    };
    console.log(clienteId)

    const { error } = validacoes.validacaoClientes(novoCliente)
    if (error) {
      res.status(500).json({ error: error });
    } else {
      const filter = { _id: new ObjectId(clienteId) };
      const update = { $set: { nome, email, senha } };

      await clienteController.updateCliente(filter, update)
        .then((result) => {
          res.status(200).json({ result: result + "Cliente edita." });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o cliente.' });
        });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

router.delete('/excluirCliente', auth, async (req, res) => {
  try {
    const clienteId = req.user.clienteId;
    const filter = { _id: new ObjectId(clienteId) };
    console.log(clienteId)
    await clienteController.deleteCliente(filter)
      .then((result) => {
        res.status(200).json({ result: result + "Cliente Excluido." });
      }).catch((error) => {
        res.status(500).json({ error: 'Ocorreu um erro ao deletar o cliente.' });
      });

  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;