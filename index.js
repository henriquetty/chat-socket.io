var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http)

app.use(express.static('public'));
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('A user connected');
	socket.on('disconnect', function(){
		console.log('A user disconnected');
	});
	socket.on('chat message', function(msg){
		console.log('Message: ' + msg);
		io.emit('chat message', msg);
	});
});

http.listen(3000, function(){
	console.log('Listening on port 3000');
});