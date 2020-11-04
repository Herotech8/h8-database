const ObjectID = require('mongodb').ObjectID;

class _databaseHelpers {
  constructor(db, collection) {
    this.db = db;
    this.collection = collection;
  }

  export() {
    return this.db.collection(this.collection);
  }

  findOne(_id) {
    var parent = this;

    return new Promise((resolve, reject) => {
      var query = {};

      if(_id.constructor == {}.constructor) {
        query = _id;
      } else {
        query = {
          _id: new ObjectID(_id)
        };
      }

      parent.db.collection(parent.collection).findOne(query, (err, doc) => {
        if(err) {
          throw err;
        } else {
          resolve(doc);
        }
      });
    });
  }

  insertOne(query) {
    return this.db.collection(this.collection).insertOne(query);
  }
}

module.exports = _databaseHelpers;
