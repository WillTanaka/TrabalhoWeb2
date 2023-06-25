const DBConnection = require('../models/DAO');
const ClienteModel = require('../models/clienteModel.js');

class ClienteController {
  constructor() {
    this.connection = new DBConnection();
    this.model = null;
  }

  async createCliente(cliente) {
    try {
      await this.connection.connect();
      this.model = new ClienteModel(this.connection);
      await this.model.createCliente(cliente);
    } finally {
      this.connection.close();
    }
  }

  async readClientes() {
    try {
      await this.connection.connect();
      this.model = new ClienteModel(this.connection);
      return(await this.model.readClientes());
    } finally {
      this.connection.close();
    }
  }

  async updateCliente(filter, update) {
    try {
      await this.connection.connect();
      this.model = new ClienteModel(this.connection);
      await this.model.updateCliente(filter, update);
    } finally {
      this.connection.close();
    }
  }

  async deleteCliente(filter) {
    try {
      await this.connection.connect();
      this.model = new ClienteModel(this.connection);
      await this.model.deleteCliente(filter);
    } finally {
      this.connection.close();
    }
  }

  async findOne(query) {
    try {
      await this.connection.connect();
      this.model = new ClienteModel(this.connection);
      return await this.model.findOne(query);
    } finally {
      this.connection.close();
    }
  }
}

module.exports = ClienteController;
