var myApp = angular.module('rubikCatalogue', []);

myApp.controller('categoryListController', ['$scope', '$http', function($scope, $http){

	$http.get("/api/categories").then(
		//sucess callback
		function(result){
			$scope.categories = result.data;
		},
		//error callback
		function(){
			$scope.categories = "Couldn't fetch data, please try again!";
		});
}]);

myApp.controller('productListController', ['$scope', '$http', function($scope, $http){
	$scope.productsPerPage = 12;
	$scope.pageList = new Array(1, 2, 3, 4, 5);
	$scope.currentPage = 1;

	$http.get("/api/products").then(
		//sucess callback
		function(result){
			$scope.lastPage = Math.ceil(result.data.length / $scope.productsPerPage);

			$scope.fullList = result.data;
			$scope.products = $scope.getProductList($scope.fullList, $scope.currentPage);
		}
		,
		//error callback
		function(){
			$scope.products = "Couldn't fetch data, please try again!";
		}
	);

	$scope.setProductPage = function(pageNumber){
		console.log(pageNumber);

		pageNumger = $scope.validatePageNumber(pageNumber);
		$scope.currentPage = pageNumber;

		var min = pageNumber - 2;
		if(min<1) min = 1;
		var max = min + 4;
		if(max>$scope.lastPage){
			max = $scope.lastPage;
			if(max-4 > 0) min = max -4; 
		}
		$scope.pageList = new Array();
		for (var i = min; i <= max; i++) {
			$scope.pageList.push(i);
		}

		$scope.products = $scope.getProductList($scope.fullList, pageNumber);
	}

	$scope.getProductList = function(productList, pageNumber){
		pageNumber = $scope.validatePageNumber(pageNumber);

		var min = $scope.productsPerPage*(pageNumber-1);
		var max = min + $scope.productsPerPage;
		if (max > productList.length) max = productList.length;
		
		return productList.slice(min,max);
	}

	$scope.validatePageNumber = function(pageNumber){
		var lastPage = $scope.lastPage;
		if (pageNumber < 1) return 1
		else if (pageNumber > lastPage) return lastPage
		else return pageNumber;
	}
}]);



