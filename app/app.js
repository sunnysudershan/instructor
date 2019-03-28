var app = angular.module('myApp', ['ngRoute']);
app.factory("services", ['$http', function($http) {
  var serviceBase = 'services/'
    var obj = {};
    obj.getInstructors = function(){
        return $http.get(serviceBase + 'instructors');
    }
    obj.getInstructor = function(instructorID){
        return $http.get(serviceBase + 'instructor?id=' + instructorID);
    }

    obj.insertInstructor = function (instructor) {
    return $http.post(serviceBase + 'insertInstructor', instructor).then(function (results) {
        return results;
    });
	};

	obj.updateInstructor = function (id,instructor) {
	    return $http.post(serviceBase + 'updateInstructor', {id:id, instructor:instructor}).then(function (status) {
	        return status.data;
	    });
	};

	obj.deleteInstructor = function (id) {
	    return $http.delete(serviceBase + 'deleteInstructor?id=' + id).then(function (status) {
	        return status.data;
	    });
	};

    return obj;   
}]);

app.controller('listCtrl', function ($scope, services) {
    services.getInstructors().then(function(data){
        $scope.instructors = data.data;
    });
});

app.controller('editCtrl', function ($scope, $rootScope, $location, $routeParams, services, instructor) {
    var instructorID = ($routeParams.instructorID) ? parseInt($routeParams.instructorID) : 0;
    $rootScope.title = (instructorID > 0) ? 'Edit Instructor' : 'Add Instructor';
    $scope.buttonText = (instructorID > 0) ? 'Update Instructor' : 'Add New Instructor';
      var original = instructor.data;
      original._id = instructorID;
      $scope.instructor = angular.copy(original);
      $scope.instructor._id = instructorID;

      $scope.isClean = function() {
        return angular.equals(original, $scope.instructor);
      }

      $scope.deleteInstructor = function(instructor) {
        $location.path('/');
        if(confirm("Are you sure to delete instructor number: "+$scope.instructor._id)==true)
        services.deleteInstructor(instructor.instructorNumber);
      };

      $scope.saveInstructor = function(instructor) {
        $location.path('/');
        if (instructorID <= 0) {
            services.insertInstructor(instructor);
        }
        else {
            services.updateInstructor(instructorID, instructor);
        }
    };
});

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        title: 'Instructors',
        templateUrl: 'partials/instructors.html',
        controller: 'listCtrl'
      })
      .when('/edit-instructor/:instructorID', {
        title: 'Edit Instructors',
        templateUrl: 'partials/edit-instructor.html',
        controller: 'editCtrl',
        resolve: {
          instructor: function(services, $route){
            var instructorID = $route.current.params.instructorID;
            return services.getInstructor(instructorID);
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);