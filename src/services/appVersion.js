var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
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

  static findIsSupportedVersion(nameString, version) {
    var returnText = "";
    return AppVersion.getApp(nameString)
    .then(function(result) {
      if (result && result.name) {
        var queryVersion = { "nameId" : result._id.toString() , };
      } else {
        returnText += "Application not found"
      }
      return returnText;
    })
  }

  static addApp() {
    var dataApp = [
      "Adobe Photoshop","Photo Editor",
      "GIMP","Photo Editor",
      "Corel Draw","Vector Editor",
      "Adobe Illustrator","Vector Editor",
      "Notepad","Word processing software",
      "WordPad","Word processing software",
      "MS Word, Microsoft Word","Word processing software",
      "MS Access, Microsoft Access","Database software",
      "Oracle,","Database software",
      "MySQL","Database software",
      "MSSQL, Microsoft SQL","Database software",
      "PostgreSQL, PGSQL","Database software",
      "Microsoft Excel","Spreadsheet software",
      "Apple Numbers,","Spreadsheet software",
      "Real Player,","Multimedia software",
      "Media Player","Multimedia software",
      "Microsoft Power Point,","Presentation Software",
      "Keynotes","Presentation Software",
      "Dictionaries: Encarta","Educational Software",
      "Britannica","Educational Software",
      "Mathematica","Educational Software",
      "MATLAB","Educational Software",
      "Google Earth","Educational Software",      
    ]
    for(var i=0; i < dataApp.length; i+=2){
      self.db.collection("application").insertOne({name:dataApp[i], type:dataApp[i+1] });
    }
  }

  static addVersion() {
    var dataApp = [   
    ];

    for(var i=0; i < dataApp.length; i++){
      self.db.collection("version").insertOne({nameId:dataApp[i][0], version:dataApp[i][1], isSupported: dataApp[i][2]});
    }
  }
}
const self = new AppVersion();