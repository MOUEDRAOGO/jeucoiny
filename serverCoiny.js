

/********************************************

 ******      CHARGEMENT DES MODULES    ******

 ********************************************/


// const fs = require('fs');
const http = require('http');
const fs = require('fs');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
// const url = "mongodb://localhost:27017/playersdb";
const url = "mongodb://admin:Djunguy7@ds231941.mlab.com:31941/playersdb";

var dbo = null;


MongoClient.connect(url, function(err, db) {
    dbo = db.db("playersdb");
    dbo.createCollection("users", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
    });
});


const express = require('express');
const app = express();

const server = http.createServer(app);

// const path = require('path')
const io = require('socket.io')(server, { origins: '*:*'});

//app.use("/musique", express.static(__dirname + '../public/Assets/musique'));
//app.use("/cv", express.static(__dirname + '../public/Assets/CV'));
//app.use(express.static(__dirname + '/public/Assets/images'));
//app.use("/css", express.static(__dirname + '../public/css'));
//app.use("/js", express.static(__dirname + '../public/js'));
app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
    res.sendFile('indexCoiny.html', { root: 'html' });
});

var nbPlayer = 0;

io.on('connection', function(socket){
    nbPlayer++; // qd un joueur de connecte on incremente le nbre de joueurs
    console.log("Nombre joueurs = " + nbPlayer);
    socket.on('pseudo', function (pseudo) {
        var obj = { username: pseudo }; // on recupere le pseudo du joueur
        dbo.collection("users").insertOne(obj, function(err, res) {
            if (err) throw err;
            console.log("1 new user inserted");
        });

        // on insere ds une table de pseudo du joueur
        dbo.collection("users").find({}).toArray(function(err, result) {
                if (err) throw err;
                console.log('result');
              });
    });
    socket.on('clickRules', function(msg){

        // document.getElementById('formPseudoCoiny1').addEventListener('click', function () {
        //     // compteARebours display block
        //     document.getElementById('compteARebours').style.display = "block";
        // });


        if(nbPlayer == 2) { // on verifie le nbre de joueurs connectes ; si = 2, on lance le jeu
            io.emit('startGame');
            setTimeout(function() { 
                io.emit('endGame')
            }, 30000); // definit la duree de creation de pieces et dc la duree du jeu
        } else {
            io.emit('wait'); // si pas 2joueurs connectés, on attend
        }
    });
    socket.on('nbCoinsClicked', function(nbCoinsClicked) {
        console.log("result = " + nbCoinsClicked);
    });
    socket.on('disconnect', function(){
        nbPlayer--; // qd un joueur se deconnecte, on le decremente
        console.log("Nombre joueurs = " + nbPlayer);
    });
});



/********************************************/

// Ecoute serveur

/********************************************/

server.listen(process.env.PORT || 8888, function () {
    console.log('CONNECTED TO serverCoiny.js !');
});
