/**
 * Created by Uriel on 08/03/2015.
 */
angular.module('enejApp')

    .config(function ($routeProvider) {
        $routeProvider.when('/rooms', {
            templateUrl: 'rooms/list.html',
            controller: 'roomsListController',
            controllerAs: 'ctrl'
        })
            .when('/rooms/add', {
                templateUrl: 'rooms/form.html',
                controller: 'roomsFormController',
                controllerAs: 'ctrl'
            })
            .when('/rooms/edit/:id', {
                templateUrl: 'rooms/form.html',
                controller: 'roomsFormController',
                controllerAs: 'ctrl'
            });
    })

    .controller('roomsListController', function ($http) {
        var self = this;

        self.rooms = {};

        $http.get('https://burning-fire-6305.firebaseio.com/rooms.json').success(function (data) {
            self.rooms = data;
            angular.forEach(self.rooms, function (value, key) {
                // busca o hotel pelo id
                $http.get('https://burning-fire-6305.firebaseio.com/hotels/' + value.hotel + '.json').success(function(data) {
                    value.hotel = data;
                });
            });
    });

this.removerQuarto = function (id) {
    $http.delete('https://burning-fire-6305.firebaseio.com/rooms/' + id + '.json').success(function (data) {
        delete self.rooms[id];
    })
};


})

.controller('roomsFormController', function ($http, $routeParams, $location) {
    var self = this;

    self.room = {};

    $http.get('https://burning-fire-6305.firebaseio.com/hotels.json').success(function (data) {

        self.hotels = data;
        console.log(self.hotels);
    });

    if ($routeParams.id) {
        $http.get('https://burning-fire-6305.firebaseio.com/rooms/' + $routeParams.id + '.json').success(function (data) {
            self.room = data;
        });
    }

    self.sendForm = function () {
        if ($routeParams.id) {
            $http.put('https://burning-fire-6305.firebaseio.com/rooms/' + $routeParams.id + '.json', self.room).success(function () {
                $location.path('/rooms');
            });
        } else {
            $http.post('https://burning-fire-6305.firebaseio.com/rooms.json', self.room).success(function () {
                $location.path('/rooms');
            });
        }
    }

    self.hasErrors = function (form, field, validation) {
        return this.submitted && form[field].$error[validation];
    }

    self.submitted = false;
});
