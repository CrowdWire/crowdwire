'use strict';

angular.module('myApp.addEvent', ['ngRoute', 'ui.bootstrap'])


    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/add-event', {
                templateUrl: 'add-event/add-event.html',
                controller: 'AddEventCtrl',
                controllerAs: 'AddEvent'
            })
    }])


    .controller('EventsCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {

        var self = this;
        //i.e http://localhost:8001/events
        Restangular.all('events').getList()
            .then(function (events) {
                self.events = events;
                console.log(events);
            }, function (error) {
                console.log(error);
            });


    }])


    .controller('AddEventCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
        $scope.numEventsDisplayed = 10;
        $scope.event = {
            tags: []
        };


        ////This function keeps $scope.$apply from being run if a digest is still open
        //function CheckScopeBeforeApply() {
        //    if (!$scope.$$phase) {
        //        $scope.$apply();
        //    }
        //}


        $scope.addLocation = function () {
            alert("Location set at " + $scope.latitude + ', ' + $scope.longitude);
            $scope.event.latitude = $scope.latitude;
            $scope.event.longitude = $scope.longitude;
        };


        $scope.addAddress = function () {
            $scope.event.address = $scope.address;
        };


        $scope.addPhoto = function () {
            var file = document.getElementById('file').files[0],
                reader = new FileReader();
            reader.onload = function (e) {
                $scope.event.picture = 'data:image/png;base64,' + btoa(e.target.result);
                $scope.$apply();
            };
            reader.readAsBinaryString(file);
        };


        //$scope.addTag = function (tagText) {
        //    if (tagText != null) {
        //        var hashtag = {name: tagText};
        //        $scope.event.tags.push(hashtag);
        //        $scope.tagText = null;
        //    }
        //};


        $scope.addEvent = function () {
            $scope.addLocation();
            $scope.addAddress();
            Restangular.all('add-event').customPOST($scope.event).then(function () {
                if (!alert("You successfully added the event" + " at " + $scope.event.latitude + ", " + $scope.event.longitude)) {
                    window.location.reload();
                }
                document.getElementById('file').value = null;
                $scope.event.picture = null;
                $scope.event = {tags: []}
            }, function () {
                alert("There was a problem submitting the event...")
            });
        };

    }])

    .controller('AccordionDemoCtrl', function ($scope) {
        $scope.oneAtATime = true;

        $scope.groups = [
            {
                title: 'Dynamic Group Header - 1',
                content: 'Dynamic Group Body - 1'
            },
            {
                title: 'Dynamic Group Header - 2',
                content: 'Dynamic Group Body - 2'
            }
        ];

        $scope.items = ['Item 1', 'Item 2', 'Item 3'];

        $scope.addItem = function () {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
        };

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };
    })


    .directive('myMap', ['Restangular', function (Restangular) {

        var link = function ($scope) {
            var oldMarker;//This represents the previously dropped pin, so that a click event will drop a new one..see placeMarker()

            function initialize() {

                var myLatlng1 = new google.maps.LatLng(30, 30);
                var mapOptions = {
                    zoom: 16,
                    center: myLatlng1,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                //Create a new map with .css div id=gmaps and the mapOptions above
                var map = new google.maps.Map(document.getElementById('gmaps'), mapOptions);

                //If location works, get current location and set NEW map based on that...otherwise map will be centered on (30, 30)
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        map.setCenter(initialLocation);
                        new google.maps.Marker({
                            position: initialLocation,
                            map: map,
                            icon: 'http://www.googlemapsmarkers.com/v1/36454f/'
                        });
                    });
                }

                else {
                    map.setCenter(myLatlng1);
                }


                // setMarker function to create the marker for existing events. Restangular call below uses this to place pins
                function setMarker(map, position, content) {
                    var infoWindow;
                    var markersExisting = new google.maps.Marker({
                        position: position,
                        map: map,
                        icon: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png'
                    });


                    //This listener will wait for the user to click an existing marker and popup an info window
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
                }//END setMarker()

                // Restangular call to grab the location data for all existing events
                Restangular.all('events').getList()
                    .then(function (events) {
                        events.forEach(function (ev) {
                            setMarker(map, new google.maps.LatLng(ev.latitude, ev.longitude), ev.caption);
                        })
                    });


                // When the map is clicked on, call the placeMarker function (to add a new marker, of course)
                google.maps.event.addListener(map, 'click', function (e) {
                    scopeLatLng(e);
                    placeMarker(e.latLng, map);
                });
            }//End the initialize function for map

            //PUt latitude and longitude on scope
            function scopeLatLng(e) {
                var latitude = e.latLng.lat();
                var longitude = e.latLng.lng();
                $scope.latitude = latitude;
                $scope.longitude = longitude;
            }

            //Create the pin marker itself, and set its characteristics
            function placeMarker(position, map) {
                var addEventMarker = new google.maps.Marker({
                    position: position,
                    map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP
                });

                if (oldMarker != undefined) {
                    oldMarker.setMap(null);
                }
                oldMarker = addEventMarker;
                map.setCenter(position);

                //Add an event listener on the pin marker.  When dragged, spit out the lat and lng data
                //Also, the dragend is an alternative to click...the event occurs where the pin drops!!!
                google.maps.event.addListener(addEventMarker, "dragend", function (e) {
                    scopeLatLng(e);
                    var centerPoint = addEventMarker.getPosition();
                    map.panTo(centerPoint);
                    getAddress(centerPoint);
                });
                getAddress(addEventMarker.getPosition());
                map.panTo(position);
            }

            //Geocoder function to take latitude and longitude and get formatted address
            function getAddress(centerPoint) {
                var lat, lng, address;
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'latLng': centerPoint}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        lat = centerPoint.lat();
                        lng = centerPoint.lng();
                        address = results[0].formatted_address;
                        $scope.address = address;
                        alert("Latitude: " + lat + "\nLongitude: " + lng + "\nAddress: " + address);
                    }
                });
            }


            //Listen on the DOM... when window loads, initalize the map
            google.maps.event.addDomListener(window, 'load', initialize());

        };
        //Return the map and set the css id selector to #gmaps.
        //Don't know what restrict and replace are doing here. Something DOM related
        return {
            restrict: 'E',
            //this... (div id "gmaps) is what needs to be called for the CSS.
            template: '<div id="gmaps"></div>',
            replace: true,
            link: link
        };
    }]);
