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
        }


        $scope.addLocation = function () {
            alert("Location set at " + $scope.latitude + ', ' + $scope.longitude);
            $scope.event.latitude = $scope.latitude;
            $scope.event.longitude = $scope.longitude;
            CheckScopeBeforeApply();
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
                alert("You successfully added the event!" + " at " + $scope.event.location);
                document.getElementById('file').value = null;
                CheckScopeBeforeApply();
                //$scope.event.location = null;
                $scope.event.picture = null;
                $scope.event = {tags: []}
            }, function () {
                alert("There was a problem submitting the event...")
            });
        };

    }]).


    directive('myMap', ['Restangular', function (Restangular) {
        // directive link function

        var link = function ($scope) {
            var existingMarkers = [];//List of markers for existing events

            //initialize the map itself.  Create var myLatlng and center the map there:
            //in the future we'll get the geolocation thing to work...webkit browsers don't allow location from
            //inside the file system.  It has to be from an http
            function initialize() {

                var myLatlng = new google.maps.LatLng(40.7841809093, -73.9640808105);
                var mapOptions = {
                    zoom: 7,
                    center: myLatlng
                };
                //Create a new map with .css div id=gmaps and the mapOptions above
                var map = new google.maps.Map(document.getElementById('gmaps'),
                    mapOptions);


                // When the map is clicked on, call the placeMarker function (to add a new marker, of course)
                google.maps.event.addListener(map, 'click', function (e) {
                    placeMarker(e.latLng, map);
                });
            }

            // Restangular call to grab the location data for all existing events
            //Iteratively use setMarker function below to create the markers and populate the map
            Restangular.all('events').getList()
                .then(function (events) {
                    events.forEach(function (ev) {
                        setMarker(map, new google.maps.LatLng(ev.latitude, ev.longitude), ev.caption);
                    })
                });


            // setMarker function to create the marker for existing events
            function setMarker(map, position, content) {
                var infoWindow;
                var markersExisting = new google.maps.Marker({
                    position: position,
                    map: map,
                    icon: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
                });

                // add marker to array of existing event markers
                existingMarkers.push(markersExisting);


                //FYI, "event" here in the google.maps.event method call is javascript speak!
                //This listener waits for a click event on a markersExisting marker. Pops up an info window.
                google.maps.event.addListener(markersExisting, 'click', function () {
                    // close window if not undefined
                    if (infoWindow !== void 0) {
                        infoWindow.close();
                    }
                    // create new window
                    var infoWindowOptions = {
                        content: content
                    };
                    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                    infoWindow.open(map, markersExisting);
                });
            }


            //Create the pin marker itself, and set its characteristics
            function placeMarker(position, map) {
                var addEventMarker = new google.maps.Marker({
                    position: position,
                    map: map,
                    draggable: true
                });

                //Add an event listener on the pin marker corresponding to the event we want to add.
                //Put latitude and longitude on scope....FYI, "event" here is javascript speak!
                //Also, the dragend is an alternative to click...the event occurs when the pin drops!!!
                google.maps.event.addListener(addEventMarker, "dragend", function (event) {
                    var latitude = event.latLng.lat();
                    var longitude = event.latLng.lng();
                    $scope.latitude = latitude;
                    $scope.longitude = longitude;
                    alert($scope.latitude + ', ' + $scope.longitude);
                });
                map.panTo(position);
            }

            google.maps.event.addDomListener(window, 'load', initialize);

        };
        //Return the map and set the css id selector to #gmaps.
        return {
            //restrict: 'A',
            template: '<div id="gmaps"></div>',
            //replace: true,
            link: link
        };
    }]);