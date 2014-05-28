'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MainCtrl', ['$scope', 'socketio', function($scope, socketio) {
  	$scope.Playlist = [];
  	socketio.emit('init');
  	// console.log('emit init');

  	socketio.on('init', function ( data ) {
  		// console.log(data);
  		$scope.Playlist = data;
  		// $scope.$apply();
  		// console.log('on init');
  		// console.log($scope.Playlist);
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
  				$scope.Playlist.splice(i,1);
  			}
  		}
  	});

  	$scope.removeVideo = function ( video ) {
  		console.log('remove');
  		console.log(video);
  		socketio.emit('remove', {'id': video});
  		console.log('emited');
  	}


  }])
  .controller('AddVideoCtrl', ['$scope', '$location', 'socketio', 
  	function($scope, $location, socketio) {
  	$scope.Playlist = [];
  	socketio.emit('init');
  	// console.log('emit init');

  	socketio.on('init', function ( data ) {
  		// console.log(data);
  		$scope.Playlist = data;
  		// $scope.$apply();
  		// console.log('on init');
  		// console.log($scope.Playlist);
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
  				$scope.Playlist.splice(i,1);
  			}
  		}
  	});

  	$scope.video = {
  		'title': '',
  		'url': ''
  	}

  	$scope.addVideo = function ( video ) {
  		socketio.emit('add', video);
  		$location.path('/main');
  	}

  }])  .controller('EditVideoCtrl', ['$scope', '$location', '$routeParams', 'socketio', 
  	function($scope, $location, $routeParams, socketio) {
  	$scope.Playlist = [];

  	$scope.video = {
  		'title': '',
  		'url': ''
  	}
  	socketio.emit('init');
  	// console.log('emit init');

  	socketio.on('init', function ( data ) {
  		var id = parseInt($routeParams.videoId);
  		$scope.Playlist = data;
 		for(var i = 0; i < $scope.Playlist.length; i++){
  			if($scope.Playlist[i].id === id){
  				$scope.video = $scope.Playlist[i];
  			}
  		}
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
  				$scope.Playlist.splice(i,1);
  			}
  		}
  	});

  	$scope.editVideo = function ( video ) {
  		socketio.emit('update', video);
  		$location.path('/main');
  	}

  }])
  .controller('VideoCtrl', ['$scope', '$routeParams', '$sce', 'socketio', 
  	function($scope, $routeParams, $sce, socketio) {
  	$scope.Playlist = [];
  	$scope.video = {
  		'title': '',
  		'url': '',
  		'embeded': ''
  	};
  	socketio.emit('init');

  	socketio.on('init', function ( data ) {
  		var id = parseInt($routeParams.videoId);
  		$scope.Playlist = data;
  		for(var i = 0; i < $scope.Playlist.length; i++){
  			if($scope.Playlist[i].id === id){
  				var v = $scope.Playlist[i];
  				v.embeded = "//www.youtube.com/embed/" + v.url.substring(32, v.url.length);
				// $sce.trustAs('resource_url', v.embeded);
  				$scope.video = v;
  				// console.log($scope.video);
  				// $scope.$apply();
  			}
  		}
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
  				$scope.Playlist.splice(i,1);
  			}
  		}
  	});


  }]);
