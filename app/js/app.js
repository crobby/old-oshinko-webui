/*
 * This file is part of Oshinko.
 *
 * Copyright (C) 2016 Red Hat, Inc.
 *
 */

'use strict';


var app = angular.module('Oshinko', [
    'ngCookies',
    'ngRoute',
    'Oshinko.controllers',
    'Oshinko.factories',
    'extension-registry'
]);

app.run(['$rootScope', '$http', function ($rootScope, $http) {
    $http.get('/oshinko-rest-location').success(function(response) {
        $rootScope.oshinko_rest_location = response;
    });
}]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/clusters/:Id?',
        {
            templateUrl: function(params) {
                if(!params['Id'])
                    return 'partials/clusters.html';
                else
                    return 'partials/cluster-detail.html';
            },
            controller: 'ClusterCtrl',
            activetab: 'clusters'
        });
    $routeProvider.when('/login',
        {
            templateUrl: 'partials/login.html',
            controller: 'LoginController',
            activetab: ''
        });
    $routeProvider.otherwise({redirectTo: '/clusters'});
}]);

app.run(['$rootScope', '$location', '$cookies', '$http',
    function ($rootScope, $location, $cookies, $http) {
        $rootScope.globals = $cookies.getObject('oshinkookie') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$cookies.getObject('oshinkookie')) {
                $location.path('/login');
            }
        });
    }]);
