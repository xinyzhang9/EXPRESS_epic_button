var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname,'./static')));
app.set('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');

app.get('/',function(req,res){
	res.render('index');
})


var server = app.listen(8000,function(){
	console.log('listening on port 8000...');
});

var io = require('socket.io').listen(server);
var counter = 0;

io.sockets.on('connection',function(socket){
	console.log('Socket ' + socket.id + ' has connected to the chatroom.');

	socket.on('button:clicked',function(data){
		counter += data.update;
		io.emit('counter:update',{counter: counter});
	})

	socket.on('disconnect',function(socket){
		console.log('Socket ' + socket.id + ' has disconencted from the chatroom.')
	})

	socket.on('reset:clicked',function(data){
		counter = 0;
		io.emit('counter:update',{counter: counter});
	})

})



