'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.events',
    'myApp.eventDetail',
    'myApp.addEvent',
    'myApp.version',
    'restangular'
]).
    config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
        $routeProvider.otherwise({redirectTo: '/events'});

        RestangularProvider.setBaseUrl('http://localhost:8001') //Prepend for API calls
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
                //Put latitude and longitude on scope
                google.maps.event.addListener(marker, "click", function (event) {
                    var latitude = event.latLng.lat();
                    var longitude = event.latLng.lng();
                    $scope.latitude = latitude;
                    $scope.longitude = longitude;
                    alert(latitude + ', ' + longitude);
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
    });
