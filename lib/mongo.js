const { config } = require('../config');
const { MongoClient, ObjectID } = require('mongodb');


const MONGO_URI = `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}` // prettier-ignore

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = config.dbName;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect((err) => {
        if (err) {
          reject(err);
          return false;
        }
        console.log('Connected succesfully to mongo');
        resolve(this.client.db(this.dbName));
      })
    })
  }

  getAll(collection, query) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).find(query).toArray();
      });
  }

  get(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).findOne({ _id: ObjectID(id) });
      });
  }

  create(collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data);
      })
      .then(result => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection)
          .updateOne(
            { _id: ObjectID(id) },
            { $set: data },
            { upsert: true }
          )
          .then(result => result.upsertedId || id)
      })
  }

  delete(collection, id) {
    return this.connect()
    .then(db => {
      return db.collection(collection)
        .deleteOne(
          { _id: ObjectID(id) }
        )
        .then(result => result.upsertedId || id)
    })
  }
}

module.exports = MongoLib;