var express = require('express');
var http = require('http');
var path = require('path');
var appServer = require('./lib/server.js');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.logger('dev'));

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

appServer.listen(server);
