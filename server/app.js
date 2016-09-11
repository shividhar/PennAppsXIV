var mongojs = require("mongojs");
var db = mongojs('localhost:27017/penn', ['account', 'event']);
var bcrypt = require('bcryptjs');
var hat = require('hat');
var rack = hat.rack(16, 16, 2);
var bodyParser = require('body-parser');
var https = require('https');

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

app.get('/user/:username/events', function(req, resp){
	console.log("USER EVENTS: ", req.params);
	db.event.find({'users': {'$all': [req.params.username]}}, function (err, res) {
		return resp.json(res);
	});
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
					host: res[0].host,
					time: res[0].time,
					users: newUserList
				}, function (err) {
					resp.json({message: "Successfully joined event " + req.params.id});
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

app.post('/events/delete/:id', function (req, resp) {
	db.event.find({id: req.params.id}, function(err, res){
		if (res.length > 0){
			if (req.body.username == res[0].host){
				userList = res[0].users;
				db.event.remove({id : res[0].id}, function(err){
					return resp.json({message: "Event successfully removed"});
				});				
			} else 
				return resp.json({message: "You are not the host of this event"});			
		} else
			resp.json({message: "Event not found"});
	});
});

app.post('/events/leave/:id', function (req, resp){
	var eventId = req.params.id;
	var username = req.body.username;
	db.event.find({id: eventId}, function(err, res){
		if (res.length > 0){
			newUsers = res[0].users;
			var indexToRemove = newUsers.indexOf(username);
			if (indexToRemove == -1) {
				return resp.json({message: "User not in event " + eventId});
			}
			newUsers.splice(indexToRemove, 1);
			db.event.update({
				id: eventId
			}, {
				id: eventId,
				location: res[0].location,
				time: res[0].time,
				users: newUsers,
				host: res[0].host,
				name: res[0].name
			}, function (err) {
				return resp.json({message: "User " + username + " successfully left event " + eventId});
			})			
		} else
			return resp.json({message: "Event not found"});
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
	db.event.insert({id:id, host:username, name:name, location: location, time:time, users:[username]}, function (err) {
		db.account.find({username: username});
	});
    return id;
}