var socketio = require('socket.io');

exports.listen = function( server, User, Manager ) {
  var io = socketio.listen(server);

  var Playlist = [
    { 'id': 1, 'title': 'Inna feat. Juan Magan - Un Momento', 'url': 'https://www.youtube.com/watch?v=fdfw_EuVxNg' }
  ];

  var Add = function ( item ) {
    item.id = new Date().getTime();
    Playlist.push(item);
    return item;
  }

   var Update = function ( item ) {
    for(var i = 0; i < coll.length; i++){
      if( coll[i].id === item.id ) {
        coll[i] = item;
        return true;
      }
    }
    return false;
  }

   var Remove = function ( item ) {
    for(var i = 0; i < coll.length; i++){
      if( coll[i].id === item.id ) {
        coll.splice(i, 1);
        return true;
      }
    }
    return false;
  }



  io.sockets.on('connection', function ( client ) {
    'use strict';
    console.log('socket.io connected');
    console.log(client.id);

    //init
    client.on('init', function (){

      client.emit('init', Playlist);

    });

    //add
    client.on('add', function ( data ) {
      var item = Add( data );
      client.emit('add', item);
      client.broadcast.emit('add', item);
    });
    //update
    client.on('update', function ( data ) {
      var result = Update( data );
        if( result ) {     
          client.emit('add', data);
          client.broadcast.emit('add', data);
        }
    });
    //remove
    client.on('remove', function ( data ) {
      var result = Remove( data );
        if( result ) {     
          client.emit('add', data);
          client.broadcast.emit('add', data);
        }
    });



  });

};
