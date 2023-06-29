const express = require('express');
const router = express.Router();

const { ObjectId } = require('mongodb');
const ProdutoController = require('../controller/produtoController');
const produtoController = new ProdutoController();
const PedidoController = require('../controller/pedidoController');
const pedidoController = new PedidoController();
const auth = require('../middleware/auth')
router.use(auth);
const valida = require('./validacao/validacao')
const validacoes = new valida();

router.get('/novoProduto', (req, res) => {
  res.render('novoProduto');
});

router.get('/editarProduto/:id', async (req, res) => {
  const produtoId = req.params.id;
  const produto = new ObjectId(produtoId);
  await produtoController.findOne(produto)
    .then((produtos) => {
      console.log(produtos);
      res.render('editarProduto', { produtos });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao buscar o produto.' + error });
    });
});

router.post('/editarProduto', async (req, res) => {
  const { id, nome, medida, antnome } = req.body;
  const novoProduto = {
    nome,
    medida,
    timestamp: new Date().getTime(),
  };
  const { error } = validacoes.validacaoProdutos(novoProduto)
  if (error) {
    const produto = new ObjectId(id);
    await produtoController.findOne(produto)
      .then((produtos) => {
        console.log(produtos);
        res.render('editarProduto', { produtos });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Ocorreu um erro ao buscar o produto.' + error });
      });
  } else {
    await produtoController.updateProduto(id, novoProduto)
      .then(() => {
        pedidoController.updatePedidoProduto(antnome, nome)
        res.redirect('/produtos');
      })
      .catch((error) => {
        res.status(500).json({ error: 'Ocorreu um erro ao atualizar o produto.' });
      });
  }

});

router.delete('/:id/:nome', async (req, res) => {
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

router.post('/', async (req, res) => {
  const { nome, medida } = req.body;

  const novoProduto = {
    nome,
    medida,
    timestamp: new Date().getTime(),
  };
  const { error } = validacoes.validacaoProdutos(novoProduto)
  if (error) {
    res.render('novoProduto', { error: error });
  } else {
    await produtoController.createProduto(novoProduto)
      .then(() => {
        produtoController.readProdutos()
          .then((produtos) => {
            res.redirect('/produtos');
          })
          .catch((error) => {
            res.status(500).json({ error: 'Ocorreu um erro ao obter a lista de produtos.' });
          });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o produto.' });
      });
  }

});

module.exports = router;