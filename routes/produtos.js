const express = require('express');
const router = express.Router();

const { ObjectId } = require('mongodb');
const ProdutoController = require('../controller/produtoController');
const produtoController = new ProdutoController();
const PedidoController = require('../controller/pedidoController');
const pedidoController = new PedidoController();

const valida = require('./validacao/validacao')
const validacoes = new valida();

router.get('/novoProduto', (req, res) => {
  res.render('novoProduto');
});

router.get('/editarProd/:id', (req, res) => {
  res.render('editarProduto');
});

const auth = require('../middleware/auth')


router.get('/editarProduto/:id', auth, async (req, res) => {
  const produtoId = req.params.id;
  const produto = new ObjectId(produtoId);
  await produtoController.findOne(produto)
    .then((produtos) => {
      res.status(200).json({ produtos });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao buscar o produto.' + error });
    });
});

router.post('/editarProduto', auth, async (req, res) => {
  const { id, nome, medida, antnome } = req.body;
  const novoProduto = {
    nome,
    medida,
    timestamp: new Date().getTime(),
  };

  const { error } = validacoes.validacaoProdutos(novoProduto)
  if (error) {
    res.status(500).json({ error: error });
  } else {
    await produtoController.updateProduto(id, novoProduto)
      .then(() => {
        pedidoController.updatePedidoProduto(antnome, nome)
        res.status(200).json();
      })
      .catch((error) => {
        res.status(500).json({ error: 'Ocorreu um erro ao atualizar o produto.' });
      });
  }

});

router.delete('/:id/:nome', auth, async (req, res) => {
  const produtoId = req.params.id;
  const nome = req.params.nome;
  const produto = new ObjectId(produtoId);

  await produtoController.deleteProduto(produto)
    .then((result) => {
      pedidoController.deletePedidoProduto(nome)
      res.status(200).json({ result: result + "Produto deletado." });
    })
    .catch((error) => {
      res.status(500).json({ error: error + 'Ocorreu um erro ao excluir o produto.' });
    });
});

router.post('/', auth, async (req, res) => {
  const { nome, medida } = req.body;

  const novoProduto = {
    nome,
    medida,
    timestamp: new Date().getTime(),
  };
  const { error } = validacoes.validacaoProdutos(novoProduto)
  if (error) {
    res.status(500).json({ error: error });
  } else {
    await produtoController.createProduto(novoProduto)
      .then((result) => {
        res.status(200).json({ result: result + "Produto cadastrado." });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  }

});

module.exports = router;