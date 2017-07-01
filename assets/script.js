var myApp = angular.module('rubikCatalogue', []);

myApp.controller('categoryListController', ['$scope', '$http', function($scope, $http){

	$http.get("/api/categories").then(
		//sucess callback
		function(result){
			$scope.categories = result.data;
			console.log(result.data);
		},
		//error callback
		function(){
			$scope.categories = "Couldn't fetch data, please try again!";
		});
}]);

myApp.controller('productListController', ['$scope', '$http', function($scope, $http){

	$http.get("/api/products").then(
		//sucess callback
		function(result){
			$scope.products = result.data;
		},
		//error callback
		function(){
			$scope.products = "Couldn't fetch data, please try again!";
		});
}]);