(function() {

	angular.module('IndexService', [])
		.factory('IndexService', ['$http', function($http) {

			return {
				fetchAllCustomers:fetchAllCustomers,
				addCustomer:addCustomer,
				deleteCustomer:deleteCustomer,
				updateCustomer:updateCustomer
			}

			function fetchAllCustomers() {
				
				return $http({
					method:'GET',
					url: 'php/api/customer.php',
					dataType: 'json',
					contentType: 'applications/json'
				});

			};

			function addCustomer(data) {

				return $http({
					method:'POST',
					url: 'php/api/customer.php',
					data: data,
					dataType: 'json',
					contentType: 'applications/json'
				});

			};

			function updateCustomer(data) {

				return $http({
					method:'POST',
					url: 'php/api/customer.php',
					data: data,
					dataType: 'json',
					contentType: 'applications/json'
				});

			};

			function deleteCustomer(customer_id) {

				return $http({
					method:'DELETE',
					url: 'php/api/customer.php',
					data: customer_id,
					dataType: 'json',
					contentType: 'applications/json'
				});

			};

		}]);

}) ();