const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
let db; 

// let elementsFromToDoList = [];

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

MongoClient.connect('mongodb://localhost:27017',
    { useUnifiedTopology: true },
    function(err,database){
    if (err) {
       console.log(err);
    }
    db = database.db('mytodolist');
    // db.createCollection('customers',function (err, res) {
    //     if (err) throw err;
    //     console.log('colection created');
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
    // const filteredElementsFromToDo = elementsFromToDoList.filter( el => el == req.body.item);
    //  if (filteredElementsFromToDo.length == 0) {
    //     elementsFromToDoList.push(req.body.item);
    const listItem = req.body;
    const customers = db.collection('customers');
    customers.find().toArray(function (err, result) {
        const filterResult = result.filter(el => el.item == req.body.item);
        console.log(filterResult, result)
        if (filterResult.length == 0){
            db.collection('customers').insertOne(listItem, err => {
                if (err) throw err;
                res.send('Item Added')
            })
        } else {
            res.send('Already added')
        }
    })
})

