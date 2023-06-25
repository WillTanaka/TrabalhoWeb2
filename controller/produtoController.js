const DBConnection = require('../models/DAO');
const ProdutoModel = require('../models/produtoModel.js');

class ProdutoController {
  constructor() {
    this.connection = new DBConnection();
    this.model = null;
  }

  async createProduto(produto) {
    try {
      await this.connection.connect();
      this.model = new ProdutoModel(this.connection);
      await this.model.createProduto(produto);
    } finally {
      this.connection.close();
    }
  }

  async readProdutos() {
    try {
      await this.connection.connect();
      this.model = new ProdutoModel(this.connection);
      return (await this.model.readProdutos());
    } finally {
      await this.connection.close();
    }
  }

  async updateProduto(produtoId, novoProduto) {
    try {
      await this.connection.connect();
      this.model = new ProdutoModel(this.connection);
      await this.model.updateProduto(produtoId, novoProduto);
    } finally {
      this.connection.close();
    }
  }

  async deleteProduto(filter) {
    try {
      await this.connection.connect();
      this.model = new ProdutoModel(this.connection);
      await this.model.deleteProduto(filter);
    } finally {
      this.connection.close();
    }
  }

  async findOne(query) {
    try {
      await this.connection.connect();
      this.model = new ProdutoModel(this.connection);
      return await this.model.findOne(query);
    } finally {
      this.connection.close();
    }
  }

  async findOnenome(query) {
    try {
      await this.connection.connect();
      this.model = new ProdutoModel(this.connection);
      return await this.model.findOnenome(query);
    } finally {
      this.connection.close();
    }
  }
}

module.exports = ProdutoController;
