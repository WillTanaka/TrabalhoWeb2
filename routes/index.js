var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});
router.get('/cliente', function(req, res, next) {
  res.render('cliente', { title: 'Express' });
});
router.get('/contato', function(req, res, next) {
  res.render('contato', { title: 'Express' });
});
router.get('/negocio', function(req, res, next) {
  res.render('negocio', { title: 'Express' });
});
router.get('/pedidos', function(req, res, next) {
  res.render('pedidos', { title: 'Express' });
});
router.get('/sobre', function(req, res, next) {
  res.render('sobre', { title: 'Express' });
});
router.get('/somos', function(req, res, next) {
  res.render('somos', { title: 'Express' });
});
module.exports = router;
