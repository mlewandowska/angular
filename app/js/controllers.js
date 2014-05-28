'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MainCtrl', ['$scope', 'socketio', function($scope, socketio) {
  	$scope.Playlist = [];
  	socketio.emit('init');
  	console.log('emit init');

  	socketio.on('init', function ( data ) {
  		console.log(data);
  		$scope.Playlist = data;
  		$scope.$apply();
  		console.log('on init');
  		console.log($scope.Playlist);
  	});

  	socketio.on('add', function ( data ) {
  		$scope.Playlist.push(data);
  	});
  	
  	socketio.on('update', function ( data ) {
  		for(var i = 0; i < $scope.Playlist.length; i++){
  			if($scope.Playlist[i].id === data.id){
  				$scope.Playlist[i] = data;
  			}
  		}
  	});

  	socketio.on('remove', function ( data ) {
  		for(var i = 0; i < $scope.Playlist.length; i++){
  			if($scope.Playlist[i].id === data.id){
  				$scope.Playlist[i].splice(i,1);
  			}
  		}
  	});


  }])
  .controller('MyCtrl2', ['$scope', 'socketio', function($scope, socketio) {
  	$scope.Playlist = [];
  	socketio.emit('init');

  	socketio.on('init', function ( data ) {
  		$scope.Playlist = data;
  	});

  	socketio.on('add', function ( data ) {
  		$scope.Playlist.push(data);
  	});
  	
  	socketio.on('update', function ( data ) {
  		for(var i = 0; i < $scope.Playlist.length; i++){
  			if($scope.Playlist[i].id === data.id){
  				$scope.Playlist[i] = data;
  			}
  		}
  	});

  	socketio.on('remove', function ( data ) {
  		for(var i = 0; i < $scope.Playlist.length; i++){
  			if($scope.Playlist[i].id === data.id){
  				$scope.Playlist[i].splice(i,1);
  			}
  		}
  	});


  }]);
