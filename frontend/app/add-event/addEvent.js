'use strict';

angular.module('myApp.addEvent', ['ngRoute'])


    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-event', {
            templateUrl: 'add-event/add-event.html',
            controller: 'AddEventCtrl'
        });
    }])


    .controller('AddEventCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {

        $scope.event = {
            tags: []
        };

        //This function keeps $scope.$apply from being run if a digest is still open
        function CheckScopeBeforeApply() {
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };


        $scope.addTag = function (tagText) {
            if (tagText != null) {
                var hashtag = {name: tagText};
                $scope.event.tags.push(hashtag);
                $scope.tagText = null
            }
        };


        $scope.addPhoto = function () {
            var file = document.getElementById('file').files[0],
                reader = new FileReader();
            reader.onload = function (e) {
                $scope.event.picture = 'data:image/png;base64,' + btoa(e.target.result);
                CheckScopeBeforeApply();
            };
            reader.readAsBinaryString(file);
        };


        $scope.addEvent = function () {
            Restangular.all('add-event').customPOST($scope.event).then(function () {
                alert("You successfully added the event!");
                document.getElementById('file').value = null;
                CheckScopeBeforeApply();
                $scope.event.picture = null;
                $scope.event = {tags: []}

            }, function () {
                alert("There was a problem submitting the event...")
            });
        };


    }]);