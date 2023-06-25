const { ObjectId } = require('mongodb');
class PedidoModel {
    constructor(connection) {
        this.connection = connection;
        this.collection = this.connection.database.collection("pedidos");
    }

    async createPedido(pedido) {
        try {
            pedido.timestamp = new Date(); // Adiciona o timestamp atual
            const result = await this.collection.insertOne(pedido);
            console.log('Pedido criado:', result.insertedId);
        } catch (error) {
            console.error('Erro ao criar o pedido:', error);
        }
    }

    async readPedidos(clienteId) {
        try {
          const pedidos = await this.collection.find({ clienteId }).toArray();
          return pedidos;
        } catch (error) {
          console.error('Erro ao ler os pedidos:', error);
        }
      }
      

    async updatePedido(pedidoId, novoPedido) {
        try {
            const query = { _id: new ObjectId(pedidoId) };
            const update = { $set: novoPedido };
            console.log(query)
            const result = await this.collection.updateOne(query, update);
            console.log('Pedido atualizado :', result.modifiedCount);
        } catch (error) {
            console.error('Erro ao atualizar o pedido:', error);
            throw error;
        }
    }

    async updatePedidoProduto(nome, novoprod) {
        try {
          const query = { produto: nome };
          const update = { $set: { produto: novoprod } };
          const result = await this.collection.updateMany(query, update);
          console.log('Pedidos atualizados:', result.modifiedCount);
        } catch (error) {
          console.error('Erro ao atualizar os pedidos:', error);
          throw error;
        }
      }

    async deletePedido(pedidoId) {
        try {
            const result = await this.collection.deleteOne({ _id: pedidoId });
            console.log(pedidoId)
            console.log('Pedido removido:', result.deletedCount);
        } catch (error) {
            console.error('Erro ao remover o pedido:', error);
        }
    }

    async deletePedidoProduto(nome) {
        try {
            const result = await this.collection.deleteMany({ produto: nome });
            console.log('Pedido removido:', result.deletedCount);
        } catch (error) {
            console.error('Erro ao remover o pedido:', error);
        }
    }

    async findOne(query) {
        try {
            const result = await this.collection.findOne(query);
            return (result);
        } catch (error) {
            console.error('Erro ao buscar', error);
        }
    }
}

module.exports = PedidoModel;
