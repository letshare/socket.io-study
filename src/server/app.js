var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

io.of('chat').on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('receive chat', msg);
    socket.emit('chat message', msg);
  });
});

io.of('news').on('connection', function(socket){
  socket.on('news message', function(msg){
    console.log('receive news', msg);
    socket.emit('news message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});