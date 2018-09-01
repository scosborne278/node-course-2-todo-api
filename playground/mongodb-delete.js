const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
    if (err) {
      console.log('Unable to connect to MongoDB Server');  
    }
    console.log('Connected to MongoDB');
    
//deleteMany

//db.collection('Todos').deleteMany({
//    
//    text: 'Eat lunch',
//}).then((result) => {
//    console.log("Records Deleted");
//});
    
//deleteOne
    
//db.collection('Todos').deleteOne({
//    
//    text: 'Eat lunch',
//}).then((result) => {
//    console.log("Records Deleted");
//});
    
//findOneAndDelete
    
db.collection('Todos').findOneAndDelete({  
    completed: false,
}).then((result) => {
    console.log("Records Deleted");
    console.log(result);
});    
    
//    db.close();
});