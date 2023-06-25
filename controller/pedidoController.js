const DBConnection = require('../models/DAO');
const PedidoModel = require('../models/pedidoModel.js');

class PedidoController {
    constructor() {
        this.connection = new DBConnection();
        this.model = null;
    }

    async createPedido(pedido) {
        try {
            await this.connection.connect();
            this.model = new PedidoModel(this.connection);
            await this.model.createPedido(pedido);
        } finally {
            this.connection.close();
        }
    }

    async readPedidos(clienteId) {
        try {
            await this.connection.connect();
            this.model = new PedidoModel(this.connection);
            return (await this.model.readPedidos(clienteId));
        } finally {
            this.connection.close();
        }
    }

    async updatePedido(pedidoId, novoPedido) {
        try {
            await this.connection.connect();
            this.model = new PedidoModel(this.connection);
            await this.model.updatePedido(pedidoId, novoPedido);
        } finally {
            this.connection.close();
        }
    }

    async updatePedidoProduto(nome, novoproduto) {
        try {
            await this.connection.connect();
            this.model = new PedidoModel(this.connection);
            await this.model.updatePedidoProduto(nome, novoproduto);
        } finally {
            this.connection.close();
        }
    }

    async deletePedido(filter) {
        try {
            await this.connection.connect();
            this.model = new PedidoModel(this.connection);
            await this.model.deletePedido(filter);
        } finally {
            this.connection.close();
        }
    }

    async deletePedidoProduto(nome) {
        try {
            await this.connection.connect();
            this.model = new PedidoModel(this.connection);
            await this.model.deletePedidoProduto(nome);
        } finally {
            this.connection.close();
        }
    }

    async findOne(query) {
        try {
            await this.connection.connect();
            this.model = new PedidoModel(this.connection);
            return await this.model.findOne(query);
        } finally {
            this.connection.close();
        }
    }
}

module.exports = PedidoController;
