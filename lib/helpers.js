const ObjectID = require('mongodb').ObjectID;

class _databaseHelpers {
  constructor(db, collection) {
    this.db = db;
    this.collection = collection;
  }

  findOne(_id) {
    var parent = this;

    return new Promise((resolve, reject) => {
      parent.db.collection(parent.collection).findOne({
        _id: new ObjectID(_id)
      }, (err, doc) => {
        if(err) {
          throw err;
        } else {
          resolve(doc);
        }
      });
    });
  }
}

module.exports = _databaseHelpers;
