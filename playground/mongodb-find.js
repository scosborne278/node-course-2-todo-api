const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
    if (err) {
      console.log('Unable to connect to MongoDB Server');  
    }
    console.log('Connected to MongoDB');
    
//    db.collection('Todos').find({
//        
//        _id: new ObjectID("5b8aaef29523c27d14e3ff2a"),
//        
//    }).toArray().then((docs) =>{
//        console.log("Todos");
//    console.log(JSON.stringify(docs, undefined, 2));
//    }, (err) => {
//        console.log("Unable to find",err);
//    });
    
//db.collection('Todos').find().count().then((count) =>{
//        console.log("Todos count:  "+count);
//    }, (err) => {
//        console.log("Unable to find",err);
//    });
    
db.collection('Users').find({
    
    name: "Steven",
    
}).toArray().then((docs) =>{
    console.log(JSON.stringify(docs,undefined,2));
});
    
//    db.close();
});