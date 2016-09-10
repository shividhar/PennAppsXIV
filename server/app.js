var mongojs = require("mongojs");
var db = mongojs('localhost:27017/penn', ['account', 'event']);
var bcrypt = require('bcryptjs');
var hat = require('hat');
var rack = hat.rack(16, 16, 2);
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

app.post('/events/create', function(req, res){
	console.log("CREATEEVENT: ", req.body);
	var id = createEvent(req.body.username, req.body.name, req.body.location, req.body.time);
	res.json({"id":id});
});

app.post('/events/join/:id', function (req, resp) {
	console.log("CREATEEVENT: ", req.body);
	db.event.find({id:req.params.id}, function(err, res){
		if (res.length > 0){
			newUserList = res[0].users; 
			if (newUserList.indexOf(req.body.username) != -1){
				resp.status(400);
				resp.json({message: "User already joined event " + res[0].name});
			} else {
				newUserList.push(req.body.username);
				db.event.update({
					id: req.params.id
				}, {
					id: res[0].id,
					name: res[0].name,
					location: res[0].location,
					time: res[0].time,
					users: newUserList
				}, function (err) {
					if (err)
						throw err;
					resp.json({message: "Succesfully joined event " + req.params.id});
				});
			}
		} else {
			resp.status(400);
			resp.json({
				message: "Did not find any event with specified id"
			});
		}
	});
});

app.get('/events/:id', function (req, resp) {
	db.event.find({id:req.params.id}, function(err, res){
		if (res.length > 0){
			return resp.json({res: 1, host: res[0].host, name: res[0].name, location: res[0].location, time: res[0].time, users:res[0].users});
		}
		else 
			return resp.json({res: 0})
	});	
});



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
	db.account.insert({username:username, password:hashedPassword, salt:userSalt},function(err){console.log(err)});
}

var createEvent = function(username, name, location, time){
	var id = rack();
	db.event.insert({id:id, host:username, name:name, location: location, time:time, users:[username]});
    return id;
}