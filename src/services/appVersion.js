var MongoClient = require('mongodb').MongoClient;
import Promise from "bluebird";

export default class AppVersion {
  
  constructor() {
    this.url = "mongodb://localhost:27017/versionapp";

    MongoClient.connect(this.url, (err, db) => {
      if (err) throw err;      
      self.db = db;      
    });    
  }

  static findApplication(nameString) {
    var query = { name: {$regex: nameString} };    
    return Promise.try(function() {
      return self.db.collection("application").findOne(query);
    })
    .then(function (result) {
      if (result && result.name) {
        return result.name;
      }
      return  "No application found on database."
    });
  }

  static findVersion(name, version) {

  }
}
const self = new AppVersion();