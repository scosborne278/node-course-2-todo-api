const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
    if (err) {
      console.log('Unable to connect to MongoDB Server');  
    }
    console.log('Connected to MongoDB');
    
db.collection('Todos').findOneAndUpdate({
   _id: new ObjectID('5b8ac5f09523c27d14e405e3'), 
},{
$set:{
    completed: false,
    } 
}).then((result) => {
    console.log(result);
});    
//    db.close();
});