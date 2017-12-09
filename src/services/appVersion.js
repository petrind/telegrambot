var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
import Promise from "bluebird";
import config from '../config';

export default class AppVersion {
  
  constructor() {
    this.url = config.mongodb.url;

    MongoClient.connect(this.url, (err, db) => {
      if (err) throw err;      
      self.db = db;      
    });    
  }

  static findApplication(nameString) {
    return AppVersion.getApp(nameString)
    .then(function (result) {
      if (result && result.name) {
        var returnText = "supported version for " + result.name + "\n" ;
        return Promise.try(function getVersions() {          
          var queryVersion = {"nameId": result._id.toString()};
          var sort = {_id: -1};
          return self.db.collection("version").find(queryVersion).limit(5).sort(sort).toArray();
        })
        .then(function processVersion(resultVersions) {
          if(resultVersions && resultVersions.length > 0){
            resultVersions.forEach(function(version) {
              if(!version.isSupported 
                  || (version.isSupported
                      && version.isSupported.toLowerCase() != "no")){
                returnText += "version "+ version.version + "\n";
              }
            });
          }
          else {
            returnText += "Unknown supported version."
          }          
        })
        .then(function getSimilarApp() {
          var querySimilar = {"type": result.type};          
          return self.db.collection("application").find(querySimilar).toArray();
        })
        .then(function processSimilarApp(similarApps) {
          if(similarApps && similarApps.length > 0) {
            returnText +="\nSimilar Application are\n";
            similarApps.forEach(function (app) {
              return returnText += "- "+app.name + "\n";
            })
          }
          return returnText;
        })
      }
      return  "No application found on database."
    });
  }

  static getApp(nameString) {
    var query = { name: {$regex: new RegExp(nameString, "i")} };
    return self.db.collection("application").findOne(query);
  }  
}
const self = new AppVersion();