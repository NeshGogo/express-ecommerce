const MongoLib = require('../lib/mongo');

class ProductService {
  constructor() {
    this.collection = 'products';
    this.mongoDb = new MongoLib();
  }

  async getProducts({tags}){
    const query = tags && { tags: {$in: tags}};
    const products = await this.mongoDb.getAll(this.collection, query);
    return products || [];
  }

  async getProduct({productId}){
    const product = await this.mongoDb.get(this.collection, productId);
    return Promise.resolve(product);
  }

  async createProduct({product}){
    const productId = await this.mongoDb.create(this.collection, product);
    product._id = productId;
    return Promise.resolve(product);
  }

  updateProduct({productId, product}){
    return this.mongoDb.update(this.collection, productId, product);
  }

  deleteProduct({productId}){
    return this.mongoDb.delete(this.collection, productId);
  }
}


module.exports = ProductService;