//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
    if (err) {
      console.log('Unable to connect to MongoDB Server');  
    }
    console.log('Connected to MongoDB');
    
//    db.collection('Users').insertOne({
   
//    }, (err, result) => {
//        if (err) {
//            return console.log("unable to insert", err);
//        }
//        console.log(JSON.stringify(result.ops, undefined, 2))
//    });
    db.collection('Users').insertOne({
        name: "Steven",
        age: 21,
        location: "Washington, DC"
    }, (err,result) => {
        if (err) {
            return console.log("Unable to insert", err);
        }
 console.log(JSON.stringify(result.ops, undefined, 2))
        
    })
    
    db.close();
});