const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DatabaseHelpers = require('./helpers.js');

const DatabaseSymbol = Symbol('H8Database');

class _database {
  constructor() {
    this.config = {
      name: 'default'
    };
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
    });

    return this;
  }

  collection(collection) {
    return new DatabaseHelpers(this.db, collection);
  }
}

module.exports = new _database;
