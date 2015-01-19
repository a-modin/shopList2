var shopList;


//////////////////////////////////////////////////
// Нажатие клавиши Enter
//////////////////////////////////////////////////

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
shopList.controller('ListController', function($scope, $http) {
	

	////////////////////////////////////////
	// Функция подсчета количества и стоимости товаров
	////////////////////////////////////////

	$scope.calcPrice = function(){
		var calc = 0, 
			totalPriceBuy = 0,
			totalPrice = 0;

		for (var i = 0; i < $scope.products.length; i++) {
			if ($scope.products[i].class === 'product-buy') {
				calc += 1; 
				totalPriceBuy += Number($scope.products[i].price * $scope.products[i].count);
			};
			totalPrice += $scope.products[i].price * $scope.products[i].count;
		};

		$scope.calc = calc;
		$scope.totalPrice = totalPrice;
		$scope.totalPriceBuy = totalPriceBuy;
	}


	//////////////////////////////////////////////////
	// Забираем с сервера список продуктов
	//////////////////////////////////////////////////

	$http.get('products.json').success(function(data){
		$scope.products = data;
		$scope.calcPrice()
	});
	

	//////////////////////////////////////////////////
	// Добавление в список
	//////////////////////////////////////////////////

	$scope.add = function(){
		var newProduct = {
			name: $scope.inputName,
			price: $scope.inputPrice || 0,
			count: 1,
		};

		$scope.products.unshift(newProduct)
		$scope.calcPrice()
		$('.input-product').val('');

		$.ajax({
			url: 'send.php',
			type: 'GET',
			data: {data: angular.toJson($scope.products)}
		})

		.done(function() {
			console.log("success");
		})
	}


	//////////////////////////////////////////////////
	// Добавление в корзину
	//////////////////////////////////////////////////

	$scope.buy = function(item, product, i){

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

		})

		$scope.calcPrice();
	};


	//////////////////////////////////////////////////
	// Удаление из списка
	//////////////////////////////////////////////////

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

		$scope.calcPrice();
	};


	//////////////////////////////////////////////////
	// Редактирование
	//////////////////////////////////////////////////
	$scope.edit = function(){
		if (this.product.edit != true) {
			this.product.edit = true
		}
		else{
			this.product.edit = false;
		}
	}
});	