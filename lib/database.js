const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DatabaseHelpers = require('./helpers.js');

const DatabaseSymbol = Symbol('H8Database');

class _database {
  constructor() {
    this.config = {
      name: 'default'
    };

    this.isConnecting = true;

    if(global[DatabaseSymbol] !== undefined) {
      this.db = global[DatabaseSymbol];
      this.isConnecting = false;
    }
  }

  database(name) {
    this.config.name = name;

    return this;
  }

  connect(database) {
    var parent = this;

    this.client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true
    });

    this.client.connect((err, dbHandle) => {
      if(err) {
        throw "Unable to connect to database";
      }

      parent.db = parent.client.db(parent.config.name);
      parent.isConnecting = false;

      global[DatabaseSymbol] = parent.db;
    });

    return this;
  }

  awaitConnection() {
    var parent = this;

    return new Promise((resolve, reject) => {
      var waited = 0;

      var interval = setInterval(() => {
        if(!parent.isConnecting) {
          clearInterval(interval);

          return resolve();
        }

        waited += 100;

        if(waited == 10000) {
          clearInterval(interval);

          return reject();
        }
      }, 100);
    });
  }

  cl(collection) {
    return this.db.collection(this.collection);
  }

  collection(collection) {
    return new DatabaseHelpers(this.db, collection);
  }

  objectID(_id) {
    return new ObjectID(_id);
  }

  objectId(_id) {
    return new ObjectID(_id);
  }
}

module.exports = new _database;
