const express = require('express');
const router = express.Router();

const { ObjectId } = require('mongodb');
const ProdutoController = require('../controller/produtoController');
const produtoController = new ProdutoController();

const auth = require('../middleware/auth')
router.use(auth);
router.get('/', (req, res) => {

});

router.get('/novoProduto', (req, res) => {
  res.render('novoProduto');
});

router.get('/editarProduto/:id', (req, res) => {
  const produtoId = req.params.id;
  const teste = new ObjectId(produtoId);
  produtoController.findOne(teste)
    .then((produtos) => {
      console.log(produtos);
      res.render('editarProduto', { produtos });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao buscar o produto.' });
    });
});

router.post('/editarProduto', (req, res) => {
  const { id, nome, medida } = req.body;
  console.log(id)
  const novoProduto = {
    nome,
    medida,
    timestamp: new Date().getTime(), // Adicionar o timestamp
  };

  produtoController.updateProduto(id, novoProduto)
    .then(() => {
      res.redirect('/produtos');
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao atualizar o produto.' });
    });
});

router.delete('/:id', (req, res) => {
  const produtoId = req.params.id;
  const teste = new ObjectId(produtoId);

  produtoController.deleteProduto(teste)
    .then((result) => {
      res.status(200).json({ result: result + "Produto deletado." });
    })
    .catch((error) => {
      res.status(500).json({ error: error + 'Ocorreu um erro ao excluir o produto.' });
    });
});

router.post('/', (req, res) => {
  const { nome, medida} = req.body;

  const novoProduto = {
    nome,
    medida,
    timestamp: new Date().getTime(), // Adicionar o timestamp
  };

  produtoController.createProduto(novoProduto)
    .then(() => {
      produtoController.readProdutos()
        .then((produtos) => {
          res.render('produtos', { produtos });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Ocorreu um erro ao obter a lista de produtos.' });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o produto.' });
    });
});
module.exports = router;
