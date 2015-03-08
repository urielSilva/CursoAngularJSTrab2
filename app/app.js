'use strict';

// Declare app level module which depends on views, and components
angular.module('enejApp', ['ngRoute'])

.config(function($routeProvider){
        $routeProvider.otherwise({redirectTo: '/hotels'});
    });


