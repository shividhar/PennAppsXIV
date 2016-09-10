var mongojs = require("mongojs");
var db = mongojs('localhost:27017/penn', ['account', 'event']);
var bcrypt = require('bcryptjs');

var bodyParser = require('body-parser');

var express = require('express');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var serv = require('http').Server(app);

app.post('/signup', function(req, res){
	console.log("SIGNUP: ", req.body);
	if (req.body.username && req.body.password) 
		isUsernameTaken(req.body.username, req.body.password, res);
});

app.post('/signin', function(req, res){
	console.log("SIGNIN: ", req.body);
	if (req.body.username && req.body.password)
		isValidPassword(req.body.username, req.body.password, res);
});

app.post('/createevent', function(req, res){
	console.log("CREATEEVENT: ", req.body);
	isIdTaken(generateID(), req.body.username, res);
})

app.listen(3000, function(){
	console.log("server init");
})

var isValidPassword = function(username, password, resp){
	db.account.find({username:username},function(err,res){
		if (res.length){
			var userSalt = res[0].salt;
			var hashedPassword = bcrypt.hashSync(password, userSalt);
			return resp.json({"res": hashedPassword == res[0].password});
		}else return resp.json({"res": 0});
	});
}

var isUsernameTaken = function(username, password, resp){
	db.account.find({username:username},function(err,res){
		if(res.length > 0)
			return resp.json({"res": 0});
		else{
			addUser(username, password);
			return resp.json({"res": 1});
		}
	});
}

var addUser = function(username, password){
	var userSalt = bcrypt.genSaltSync(10);
	var hashedPassword = bcrypt.hashSync(password, userSalt);
	db.account.insert({username:username, password:hashedPassword, salt:userSalt},function(err){});
}

var generateID = function(){
	var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var isIdTaken = function(id, username, resp){
	db.event.find({id:id}, function(err, res){
		if (res.length>0){
			isIdTaken(generateID(), resp);
		}
		else{
			createEvent(id, username);
		}
	});
}

var createEvent = function(id, username){
	db.event.insert({id:id, host:username}, function(err){});
}
