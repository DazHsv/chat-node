var express = require('express');
var http = require('http');
var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use('/a', express.static( __dirname.concat('/public/') ));

app.get('/',function(req,res){
    res.render('index');
});

io.on('connection',function(socket){
    io.emit('message', {
        date: new Date(),
        body: "User in"
    });

    socket.on('message',function(msg){
        io.emit('message',msg);
    });

    socket.on('disconnect',function(){
        io.emit('message', {
            date: new Date(),
            body: "User disconnected"
        });
    });
});

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
server.listen(port,ip);