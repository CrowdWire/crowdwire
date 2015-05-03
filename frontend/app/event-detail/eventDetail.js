'use strict';

angular.module('myApp.eventDetail', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        //The below puts eventId as a variable on routeParams
        $routeProvider.when('/events/:eventId', {
            templateUrl: 'event-detail/event-detail.html',
            controller: 'EventDetailCtrl'
        });
    }])

    .controller('EventDetailCtrl', ['$scope', '$routeParams', 'Restangular', function ($scope, $routeParams, Restangular) {
        $scope.eventId = $routeParams.eventId

        Restangular.one('events', $scope.eventId).customGET()
            .then(function(event){
                $scope.event = event;
            }, function() {
                alert("Something has gone horribly wrong...")
            });

        $scope.addPhoto = function () {
            var file = document.getElementById('file').files[0],
                reader = new FileReader();
            reader.onload = function (e) {
                $scope.event.picture = 'data:image/png;base64,' + btoa(e.target.result);
                $scope.$apply();
            };
            reader.readAsBinaryString(file);
        };


    }]);