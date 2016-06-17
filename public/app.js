var socket = io();
var chat = document.querySelector('#chat');
angular.module('Chat',[])
  .controller('MessageCtrl',function($scope,$http){
    $scope.messages = [];
    $scope.message = "";
    $scope.sendMsg = function(){
      if($scope.message != ""){
        var msg = {
          body:$scope.message,
          date: new Date().getTime()
        };

        socket.emit('message',msg);
        $scope.message = "";
      }
    };

    socket.on('message', function(msg){
      $scope.$apply(function(){
        $scope.messages.push(msg);
      });
    });
  });