const CosmosClient = require("@azure/cosmos").CosmosClient;
const debug = require("debug")("todo:taskDao");
class TaskDao {
  /**
   * Manages reading, adding, and updating Tasks in Cosmos DB
   * @param {CosmosClient} cosmosClient
   * @param {string} databaseId
   * @param {string} containerId
   */
  constructor(cosmosClient, databaseId, containerId) {
    this.client = cosmosClient;
    this.databaseId = databaseId;
    this.collectionId = containerId;

    this.database = null;
    this.container = null;
  }

  async init() {
    debug("Subindo database...");
    const dbResponse = await this.client.databases.createIfNotExists({
      id: this.databaseId
    });
    this.database = dbResponse.database;
    debug("Subindo database...done!");
    debug("Subindo container...");
    const coResponse = await this.database.containers.createIfNotExists({
      id: this.collectionId
    });
    this.container = coResponse.container;
    debug("Subindo container...done!");
  }

  async find(querySpec) {
    debug("Procurando por itens no banco");
    if (!this.container) {
      throw new Error("Colection não foi inicializada.");
    }
    const { result: results } = await this.container.items
     .query(querySpec)
     .toArray();
   return results;
 }

 async addItem(item) {
   debug("Adicionando item na database");
   item.date = Date.now();
   item.completed = false;
   const { body: doc } = await this.container.items.create(item);
   return doc;
 }

 async updateItem(itemId) {
   debug("Atualizando item database");
   const doc = await this.getItem(itemId);
   doc.completed = true;

   const { body: replaced } = await this.container.item(itemId).replace(doc);
   return replaced;
 }

 async getItem(itemId) {
   debug("Get item da database");
   const { body } = await this.container.item(itemId).read();
   return body;
 }
}

module.exports = TaskDao;