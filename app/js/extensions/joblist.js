/**
 * Created by croberts on 9/9/16.
 */
(function() {
  'use strict';

  angular
    .module('Oshinko')
    .factory('jobListFactory', function() {

    })
    .run([
      '$q',
      '$timeout',
      'extensionRegistry',
      'clusterDataFactory',
      function($q, $timeout, extensionRegistry, clusterDataFactory) {

        extensionRegistry.add('myjoblist', function(args) {
            return clusterDataFactory.getJobs()
            .then(function(response) {
                var jobslist = [];

                // response.data is JSON
                angular.forEach(response.data.items, function(value, key) {
                    jobslist.push({type: 'li', text: value.metadata.name + " - " + value.metadata.creationTimestamp});
                });
                return jobslist;
            });
        });

      }
    ]);

})();
