var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID
var db = require('./db')

var app = express();
var db;





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var artists = [
    {
      id: 1,
      name: 'Metallica'  
    },
    {
       id: 2,
       name: 'Iron Maiden'
    },
    {
       id: 3,
       name: 'Deep Purple'
    }
];

app.get('/artists', function(req, res){
    db.collection('artists').find().toArray(function (err, docs){
        if (err) {
            console.log(err);
           return res.sendStatus(500);
        }
        res.send(docs)
    });
})

app.get('/artists/:id', function(req,res){
   db.collection('artists').findOne({_id: ObjectID(req.params.id)}, function (err, doc){
       if(err) {
           console.log(err);
           return res.sendStatus(500);
       }
       res.send(doc);
   })
    // var artist = artists.find(function (artist) {
    //     return artist.id === Number(req.params.id)
    // });
    //console.log(findArtist(req.params.id))
    //res.send(findArtist(req.params.id));
})



app.get('/', function (req, res) {
    res.send('Hello API');
})


app.post('/artists', function(req,res){
    var artist = {
        name: req.body.name
    };

    db.collection('artists').insert(artist, function (err, result){
        if (err) {
            console.log(err);
           return res.sendStatus(500);
        }
        res.send(artist)
    })
    //res.send(artist);
    
})


app.put('/artists/:id', (req, res) => {
    db.collection('artists').update(
        {_id: ObjectID(req.params.id)},
        { name: req.body.name},
        function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500)
            }
            res.sendStatus(200)
        }
    )
    // const resultArtist = artists.find(artist => artist.id == req.params.id);
    //const resultArtist = findArtist(req.params.id);
    //resultArtist.name = req.body.name;
    //res.send(resultArtist)
})

app.delete('/artists/:id', (req,res) => {
    db.collection('artists').deleteOne(
        {_id: ObjectID(req.params.id)},
        {name: req.body.name},
        function(err, result) {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            res.sendStatus(500)
        }
    )
    //artists = artists.filter(artist => artist.id != req.params.id);
    //res.sendStatus(200);
})



//function findArtist(id){
   // const resultArtist = artists.find(artist => artist.id == id);
    //if (resultArtist == undefined) {
     //   return 'Artist doesn\'t found';
    //};

//return resultArtist;
//}


MongoClient.connect('mongodb://localhost:27017',
    { useUnifiedTopology: true },
    function(err,client){
    if (err) {
       return console.log(err);
    }
    db = client.db('myapi');
    app.listen(3012, function() {
        console.log('API app started');
      })
})




