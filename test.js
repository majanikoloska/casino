var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://app:gamanza123@casino.uxwsxap.mongodb.net/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("casinoDB");
  dbo.collection("player").find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});