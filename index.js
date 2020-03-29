var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var register = require('./routes/register');


app.use('/', require('./routes/register'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/public/" + "index.html");
});

app.get('/listings', (req,res) => {
    res.sendFile(__dirname + "/public/" + "listings.html");
});



var server = app.listen(3030, function () {
    var host = server.address().address
    var port = server.address().port   
    console.log("Example app listening at http://localhost", host, port)
 })