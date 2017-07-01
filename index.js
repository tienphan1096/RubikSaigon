var mongoose = require('mongoose');
var fs = require('fs');
var express = require('express');
var credentials = require('./credentials');

var app = express();
var port = process.env.PORT || 3000;

console.log("Port: "+port);

mongoose.connect(credentials.databaseUrl);

var Schema = mongoose.Schema;

var rubikSchema = new Schema({
    name: String,
    price: Number,
    type: String
});

var categorySchema = new Schema({
    id: {type: Number, min: 1, max: 17},
    name: String
})

var Rubik = mongoose.model('Rubik', rubikSchema);
var Category = mongoose.model('Categories', categorySchema);

app.use('/assets', express.static(__dirname+'/assets'));

app.get('/', function(req, res, next){
    var readStream = fs.createReadStream(__dirname+'/home.html');
    readStream.pipe(res);
});

app.get('/api/products', function(req, res, next){
    Rubik.find({}, function(err, rubikList){
        if(err) throw err;
        res.send(rubikList);
    });
});

app.get('/api/products/name', function(req, res, next){
    Rubik.find({}, 'name -_id', function(err, rubikList){
        if(err) throw err;

        var rubikNameList = new Array();
        rubikList.forEach(function(rubik) {
            rubikNameList.push(rubik.name);
        });
        res.send(rubikNameList);
    });
});

app.get('/api/categories', function(req, res, next){
    Category.find({}, function(err, categoryList){
        if(err) throw err;
        res.send(categoryList);
    });
});

app.listen(port);