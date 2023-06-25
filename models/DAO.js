const { MongoClient } = require('mongodb');
require('dotenv').config();

class DBConnection {
  constructor() {
    const uri = process.env.MONGODB_URI;
    this.client = new MongoClient(uri);
    this.database = null;
  }

  async connect() {
    try {
      await this.client.connect();
      this.database = this.client.db(""+ process.env.DATABASE_NAME);
    } catch (error) {
      console.error("Erro ao conectar ao MongoDB:", error);
    }
  }

  close() {
    this.client.close();
  }
}

module.exports = DBConnection;
