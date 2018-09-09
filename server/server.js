//Library loads
require('./config/config');

const _ = require('lodash');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const http = require('http');

//Local file loads

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
const {ObjectID} = require('mongodb');

const publicPath = path.join(__dirname, '/../public');

var app = express();
const port = process.env.PORT;

//Create Socket Connections

var server = http.createServer(app);
var io = socketIO(server);

app.use(bodyParser.json());

//Socket Connection Verifiers

io.on('connection', (socket) => {
    console.log('New User Connected');
    socket.on('disconnecting', (socket) => {
    console.log('User Disconnected');
    });
});

//Socket event listeners

//Start webpage

app.use(express.static(publicPath));

//API Routes

var postTodo = function (req, res) {app.post('/todos', (req,res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) =>{
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});};
postTodo();

var getTodos = function (req, res) {app.get('/todos', (req,res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});};
getTodos();

var getId = function (req, res) {app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  } 
    
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
    
});};
getId();

var deleteTodo = function (req, res) {app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  } 
    
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
    
});};
deleteTodo();

var updateTodo = function (req, res) {app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  } 
    
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});};
updateTodo();


var createUser = function (req, res) {app.post('/users', (req,res) => {
    var body = _.pick(req.body, ['email','password']);
    var user = new User(body);
    
    user.save().then(() =>{
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth',token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});};
createUser();

var getUser = function (req, res) {app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});};
getUser();

server.listen(port, () => {
    console.log('Started on port ' + port);
});

module.exports = {app};