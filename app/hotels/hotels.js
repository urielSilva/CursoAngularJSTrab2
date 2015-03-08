/**
 * Created by Uriel on 08/03/2015.
 */
angular.module('enejApp')

    .config(function ($routeProvider) {
        $routeProvider.when('/hotels', {
            templateUrl: 'hotels/list.html',
            controller: 'hotelsListController',
            controllerAs: 'ctrl'
        })
            .when('/hotels/add', {
                templateUrl: 'hotels/form.html',
                controller: 'hotelsFormController',
                controllerAs: 'ctrl'
            })
            .when('/hotels/edit/:id',{
                templateUrl: 'hotels/form.html',
                controller: 'hotelsFormController',
                controllerAs: 'ctrl'
            });
    })

    .controller('hotelsListController', function ($http) {
        var self = this;

        self.hotels = {};

        $http.get('https://burning-fire-6305.firebaseio.com/hotels.json').success(function(data) {
            self.hotels = data;
        })

        this.removerHotel = function(id) {
          $http.delete ('https://burning-fire-6305.firebaseio.com/hotels/'+id+'.json').success(function(data) {
              delete self.hotels[id];
          })
        };


    })
    .controller('hotelsFormController', function($http,$routeParams,$location) {
       var self = this;

       self.hotel = {};

        if($routeParams.id) {
            $http.get('https://burning-fire-6305.firebaseio.com/hotels/'+$routeParams.id+'.json').success(function(data) {
               self.hotel = data;
            });
        }

        self.sendForm = function() {
            if($routeParams.id) {
                $http.put('https://burning-fire-6305.firebaseio.com/hotels/'+$routeParams.id+'.json', self.hotel).success(function() {
                   $location.path('/hotels');
                });
            } else {
                $http.post('https://burning-fire-6305.firebaseio.com/hotels.json', self.hotel).success(function() {
                   $location.path('/hotels');
                });
            }
        }
    });
