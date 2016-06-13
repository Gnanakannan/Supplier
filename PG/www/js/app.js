(function(angular) {
'use strict';
var myApp = angular.module('spicyApp2', []);

myApp.config(['$httpProvider', function($httpProvider) {
	alert('calls config');
	if(!$httpProvider.defaults.headers.get) {
		$httpProvider.defaults.headers.get= {};
	};
	$httpProvider.defaults.cache = false;
	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
	$httpProvider.defaults.headers.get['If-Modified-Since'] = 0;
	
}]);

myApp.service('dataService', function($http) {
	alert(9);
	this.getData = function () {
		alert(11);
		return $http.get('http://localhost/site/UserClient.php');
	}
});

myApp.controller('SpicyController', ['$scope', function($scope) {
    $scope.customSpice = "wasabi";
    $scope.spice = 'very';
    $scope.greeting = {'id':30};
    $scope.myRes = null;
    
    
    $scope.spicy = function(spice) {
        $scope.spice = spice;
    };
    $scope.successCallback = function() {
    	alert('suc');
    }
    $scope.errorCallback = function() {
    	alert('err');
    }
    $scope.say = function() {
		$http.get('http://localhost/site/UserClient.php', config).then(successCallback, errorCallback);
    }
}]);


})(window.angular);

app.controller(function($scope){
	  $scope.activeTab = 1;

	  $scope.setActiveTab = function(tab){
	    $scope.activeTab = tab;
	  };
});