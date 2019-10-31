var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID
var db = require('./db')

let elementsFromToDoList = [];

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

MongoClient.connect('mongodb://localhost:27017',
    { useUnifiedTopology: true },
    function(err,database){
    if (err) {
       return console.log(err);
    }
    db = database.db('mytodolist');
    // db.createCollection('customers',function (err, res) {
    //     if (err) throw err;
    //         return console.log(err); 
    //     console.log('colection created');
    //     client.close();
        
    // }) 
    app.listen(3012, function() {
        console.log('API app started');
      })
})

app.get('/', function (req, res) {
    res.sendFile('main.html', {root: __dirname + '/public'});
    console.log(__dirname);
})

app.post('/api/todo', (req, res) => {
    const filteredElementsFromToDo = elementsFromToDoList.filter( el => el == req.body.item);
     if (filteredElementsFromToDo.length == 0) {
        elementsFromToDoList.push(req.body.item);
        res.send('Item Added')
    } else {
        res.send('Already added')
        
    }
})

