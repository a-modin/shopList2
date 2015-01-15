var shopList;

// Нажатие клавиши Enter
var kp = function(e) {
	if (e) keyCode = e.which
	else if (event) keyCode=event.keyCode
	else return
	if (keyCode == 13) {
		$('.but-add').click();
		$('.input-product').val('')
	}
}
document.onkeypress=kp;
///

shopList = angular.module('shopList', []);
shopList.controller('listCtrl', function($scope, $http) {
	
	// Функция подсчета количества купленных товаров
	$scope.calcBuy = function(){
		var calc = 0;
		for (var i = 0; i < $scope.products.length; i++) {
			if ($scope.products[i].class === 'product-buy') {
				calc += 1; 
			};
		};
		$scope.calc = calc;
	}

	// Забираем с сервера список продуктов
	$http.get('products.json').success(function(data){
		$scope.products = data;
		$scope.calcBuy()
	});
	

	// Добавление в список
	$scope.add = function(){
		var newProduct = {
			name: $scope.inputName,
			price: $scope.inputPrice
		};

		$scope.products.unshift(newProduct)
		$scope.calcBuy()

		$.ajax({
			url: 'send.php',
			type: 'GET',
			data: {data: angular.toJson($scope.products)}
		})

		.done(function() {
			console.log("success");
		})
	}

	// Добавление в корзину
	$scope.buy = function(item, product){

		var elem = angular.element(item.target)

		if (product.class != 'product-buy'){
			product.class = 'product-buy';
			elem.parent().addClass('product-buy')
		}
		else{
			product.class = '';
			elem.parent().removeClass('product-buy')
		}

		$.ajax({
			url: 'send.php',
			type: 'GET',
			data: {data: angular.toJson($scope.products)}
		})

		.done(function() {
			console.log($scope.products);
		})

		$scope.calcBuy()
	}

	// Удаление из списка
	$scope.delete = function(item){

		var index = $scope.products.indexOf(item)
		$scope.products.splice(index, 1); 

		$.ajax({
			url: 'send.php',
			type: 'GET',
			data: {data: angular.toJson($scope.products)}
		})

		.done(function() {
			console.log("success");
		})

		$scope.calcBuy()
	}

});	