const express = require('express');
const router = express.Router();
require('dotenv').config();
const auth = require('../middleware/auth')

const nodemailer = require('nodemailer');

const PedidoController = require('../controller/pedidoController');
const pedido = new PedidoController();

const ProdutoController = require('../controller/produtoController');
const produto = new ProdutoController();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

router.post('/email', (req, res) => {

  const { email, nome, assunto, mensagem } = req.body;

  const options = {
    from: email,
    to: process.env.EMAIL,
    subject: assunto,
    text: `Nome: ${nome}\nEmail: ${email}\n\n${mensagem}`,
  };

  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Erro ao enviar o e-mail.');
    } else {
      console.log('E-mail enviado: ' + info.response);
      res.send('E-mail enviado com sucesso!');
    }
  });
});

//

router.get('/', (req, res) => {
  res.render('login')
});

router.get('/sobre', (req, res) => {
  res.render('sobre')
});

router.get('/negocio', (req, res) => {
  res.render('negocio')
});

router.get('/somos', (req, res) => {
  res.render('somos')
});

router.get('/novaConta', (req, res) => {
  res.render('novaConta')
});

router.get('/contato', (req, res) => {
  res.render('contato');
});

router.get('/telaprodutos', async (req, res) => {
  res.render('produtos');
});

router.get('/telapedidos', async (req, res) => {
  res.render('pedidos');
});

router.get('/pedidos', auth, async (req, res) => {
  const clienteId = req.user.clienteId;
  await pedido.readPedidos(clienteId)
    .then((pedidos) => {
      res.status(200).json({ pedidos });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Ocorreu um erro ao obter a lista de pedidos.' });
    });
});
router.get('/produtos', auth, async (req, res) => {
  await produto.readProdutos()
    .then((produtos) => {
      res.status(200).json({ produtos });
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ error: 'Ocorreu um erro ao obter a lista de produtos.' });
    });
});

router.get('/home', async (req, res, next) => {
  const token = req.query.token;
  req.headers.authorization = token;
  next();
}, auth, async (req, res) => {
  res.render('home')
});

router.get('/logout', async (req, res) => {
  res.redirect('/');
});

router.get('/automatico', async (req, res) => {
  const produtos = [
    { nome: 'Gasolina', medida: 'L', timestamp: Date.now() },
    { nome: 'Etanol hidratado', medida: 'L', timestamp: Date.now() },
    { nome: 'Diesel', medida: 'L', timestamp: Date.now() },
    { nome: 'Gasolina Aditivado', medida: 'ML', timestamp: Date.now() },
    { nome: 'Etanol', medida: 'ML', timestamp: Date.now() }
  ];

  for (const prod of produtos) {
    await produto.createProduto(prod)
  }

});

router.get('/automatico', async (req, res) => {
  const produtos = [
    { nome: 'Gasolina', medida: 'L', timestamp: Date.now() },
    { nome: 'Etanol hidratado', medida: 'L', timestamp: Date.now() },
    { nome: 'Diesel', medida: 'L', timestamp: Date.now() },
    { nome: 'Gasolina Aditivado', medida: 'ML', timestamp: Date.now() },
    { nome: 'Etanol', medida: 'ML', timestamp: Date.now() }
  ];

  for (const prod of produtos) {
    await produto.createProduto(prod)
  }
  res.status(200).json({sucesso : "ocorreu tudo certo"})
});

module.exports = router;