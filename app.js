const fs = require('fs');
var path = require('path');
const { execSync } = require('child_process');
const nodeModulesExists = fs.existsSync(path.join(__dirname, 'node_modules'));
if (!nodeModulesExists) {
  console.log('Pasta node_modules não encontrada. Executando npm install --force-sync...');
  execSync('npm install --force-sync');
}

const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const mustacheExpress = require('mustache-express');

const routes = require('./routes/routes.js');
const clientesRoute = require('./routes/clientes.js');
const pedidosRoute = require('./routes/pedidos.js');
const produtosRoute = require('./routes/produtos.js');

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);
app.use('/produtos', produtosRoute);
app.use('/pedidos', pedidosRoute);
app.use('/clientes', clientesRoute);

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});