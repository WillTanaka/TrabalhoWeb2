const express = require('express');
const router = express.Router();

const { ObjectId } = require('mongodb');
const PedidoController = require('../controller/pedidoController');
const pedidoController = new PedidoController();
const ProdutoController = require('../controller/produtoController')
const produtoController = new ProdutoController();
const valida = require('./validacao/validacao')
const validacoes = new valida();

router.get('/novoPedido', (req, res) => {
  res.render('novoPedido');
});

router.get('/editarPedido/:id', (req, res) => {
  res.render('editarPedido');
});

const auth = require('../middleware/auth')
router.use(auth);

router.get('/pedido', async (req, res) => {
  await produtoController.readProdutos()
    .then((produtos) => {
      res.status(200).json({ produtos });
    }).catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao buscar o pedido.' });
    });

});

router.get('/editarPed/:id', async (req, res) => {
  const pedidoId = req.params.id;
  const teste = new ObjectId(pedidoId);
  await pedidoController.findOne(teste)
    .then((pedidos) => {
      produtoController.findOnenome(pedidos.produto)
        .then((produto) => {
          produtoController.readProdutos()
            .then((produtos) => {
              produtos = produtos.filter((produtos) => produtos.nome !== produto.nome);
              res.status(200).json({ pedidos: pedidos, produto: produto, produtos: produtos });
            })
            .catch((error) => {
              res.status(500).json({ error: 'Ocorreu um erro ao buscar o produto.' + error });
            });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Ocorreu um erro ao buscar o produto.' });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao buscar o pedido.' });
    });
});

router.post('/editarPedido', async (req, res) => {
  const clienteId = req.user.clienteId;

  const { id, usina, produto, quantidade, preco, destino } = req.body;
  const novoPedido = {
    usina,
    produto,
    quantidade,
    preco,
    destino,
    clienteId,
    timestamp: new Date().getTime(),
  };
  const { error } = validacoes.validacaoPedidos(novoPedido)

  if (error) {
    res.status(500).json({ error: error });
  } else {
    await pedidoController.updatePedido(id, novoPedido)
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Ocorreu um erro ao atualizar o pedido.' });
      });
  }

});

router.delete('/:id', async (req, res) => {
  const pedidoId = req.params.id;
  const teste = new ObjectId(pedidoId);

  await pedidoController.deletePedido(teste)
    .then((result) => {
      res.status(200).json({ result: result + "Pedido deletado." });
    })
    .catch((error) => {
      res.status(500).json({ error: error + 'Ocorreu um erro ao excluir o pedido.' });
    });
});

router.post('/', async (req, res) => {
  const clienteId = req.user.clienteId;
  const { usina, produto, quantidade, preco, destino } = req.body;
  const novoPedido = {
    usina,
    produto,
    quantidade,
    preco,
    destino,
    clienteId,
    timestamp: new Date().getTime(),
  };
  const { error } = validacoes.validacaoPedidos(novoPedido)
  if (error) {
    res.status(500).json({ error: error });
  } else {
    await pedidoController.createPedido(novoPedido)
      .then((result) => {
        res.status(200).json({ result: result + "Produto cadastrado." });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o pedido.' });
      });
  }

});

module.exports = router;