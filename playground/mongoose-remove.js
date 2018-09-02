const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Todo.remove

//Todo.remove({}).then((result) => {
//    console.log(result);
//});

//Todo.findOneAndRemove

//Todo.findOneAndRemove

//Todo.findByIdAndRemove

Todo.findByIdAndRemove('5b8c4fd74d6913f280546339').then((todo) => {
    console.log(todo);
});