class ClienteDAO {
    constructor(connection) {
        this.connection = connection;
        this.collection = this.connection.database.collection("clientes");
    }

    async createCliente(cliente) {
        try {
            cliente.timestamp = new Date(); // Adiciona o timestamp atual
            const result = await this.collection.insertOne(cliente);
            console.log('Cliente criado:', result.insertedId);
        } catch (error) {
            console.error('Erro ao criar o cliente:', error);
        }
    }

    async readClientes() {
        try {
            const clientes = await this.collection.find().toArray();
            console.log('Clientes encontrados:', clientes);
            return(clientes)
        } catch (error) {
            console.error('Erro ao ler os clientes:', error);
        }
    }

    async updateCliente(filter, update) {
        try {
            const result = await this.collection.updateOne(filter, update);
            console.log('Cliente atualizado:', result.modifiedCount);
        } catch (error) {
            console.error('Erro ao atualizar o cliente:', error);
        }
    }

    async deleteCliente(filter) {
        try {
            const result = await this.collection.deleteOne(filter);
            console.log('Cliente removido:', result.deletedCount);
        } catch (error) {
            console.error('Erro ao remover o cliente:', error);
        }
    }

    async findOne(query) {
        try {
            const result = await this.collection.findOne(query);
            return (result);
        } catch (error) {
            console.error('Erro ao logar', error);
        }
      }

}

module.exports = ClienteDAO;