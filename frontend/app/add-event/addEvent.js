'use strict';

angular.module('myApp.addEvent', ['ngRoute'])


    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-event', {
            templateUrl: 'add-event/add-event.html',
            controller: 'AddEventCtrl'
        });
    }]).

    directive('myMap', function () {
        // directive link function
        var link = function ($scope, element, attrs) {
            function initialize() {

                var myLatlng = new google.maps.LatLng(45.00000, 45.00000);
                var mapOptions = {
                    zoom: 7,
                    center: myLatlng
                };
                var map = new google.maps.Map(document.getElementById('gmaps'),
                    mapOptions);


                google.maps.event.addListener(map, 'click', function (e) {
                    placeMarker(e.latLng, map);
                });
            }

            //Create the pin marker itself, and set its characteristics
            function placeMarker(position, map) {
                var marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    draggable: true
                });

                //Add an event listener on the pin marker.  When clicked, spit out the lat and lng data
                //Put latitude and longitude on scope....FYI, "event" here is javascript speak!
                google.maps.event.addListener(marker, "click", function (event) {
                    var latitude = event.latLng.lat();
                    var longitude = event.latLng.lng();
                    $scope.latitude = latitude;
                    $scope.longitude = longitude;
                });
                map.panTo(position);
            }


            google.maps.event.addDomListener(window, 'load', initialize);

        };

        return {
            //restrict: 'A',
            template: '<div id="gmaps"></div>',
            //replace: true,
            link: link
        };
    })

    .controller('AddEventCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {

        $scope.event = {
            tags: []
        };

        //This function keeps $scope.$apply from being run if a digest is still open
        function CheckScopeBeforeApply() {
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }


        $scope.addLocation = function() {
            alert($scope.event.location)
            $scope.event.location = ($scope.latitude + ', ' + $scope.longitude);
            CheckScopeBeforeApply();
        };


        $scope.addTag = function (tagText) {
            if (tagText != null) {
                //alert($scope.latitude );//DEPENDENT UPON CLICKING THE MARKER FIRST!!!
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
                $scope.event.location = null;
                $scope.event.picture = null;
                $scope.event = {tags: []}

            }, function () {
                alert("There was a problem submitting the event...")
            });
        };

    }]);