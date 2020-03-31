var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var register = require('./routes/register');


app.use('/', require('./routes/register'));
app.use('/', require('./routes/listings'));
app.use('/', require('./routes/signIn'));
app.use('/', require('./routes/update'));
//app.use('/', require('./routes/account'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/public/" + "index.html");
});

app.get('/listings', (req,res) => {
    res.sendFile(__dirname + "/public/" + "listings.html");
});

app.get('/signIn', (req,res) => {
    res.sendFile(__dirname + "/public/" + "SignIn.html")
});

app.get('/account', (req,res) => {
    res.sendFile(__dirname + "/public/" + "account.html")
});

app.get('/update', (req,res) => {
    res.sendFile(__dirname + "/public/" + "update.html")
});



var server = app.listen(3030, function () {
    var host = server.address().address
    var port = server.address().port   
    console.log("Example app listening at http://localhost", host, port)
 })