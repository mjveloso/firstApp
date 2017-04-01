(function() {

	angular.module('IndexController', ['IndexService','CommonService'])
		.controller('IndexController', ['$scope', 'IndexService', 'CommonService',
		 function($scope,IndexService,CommonService) {

			console.debug('IndexController');

			"use strict";

			$scope.modalData = {};

			$scope.subModalData = {};

			$scope.cache = {}; // use for undo

			fetchAllCustomerFromDatabase();

			// Local functions Note:  this function is not usable outside the controller

			function fetchAllCustomerFromDatabase() {

				IndexService.fetchAllCustomers()
				.then(function(response) {

					for(i=0;i<response.data.length;i++) {

						response.data[i]['firstname'] = CommonService.capitalizeFirstLetter(response.data[i]['firstname']);
						
						response.data[i]['lastname'] = CommonService.capitalizeFirstLetter(response.data[i]['lastname']);
					}

					$scope.customers = response.data;
					console.debug('response :', response);
				}).catch(function(error) {

					console.debug('error :', error);

				});

			}

			function cacheDataForUndo(customer) {

				$scope.cache.customer_id = customer.customer_id;

				$scope.cache.firstname = customer.firstname;

				$scope.cache.lastname = customer.lastname;

				$scope.cache.age = customer.age;

				$scope.cache.address = customer.address;

				$scope.cache.contact_number = customer.contact_number;

			}

			// End of Local functions

			$scope.openModalCustomer = function() {
				console.log('openModalCustomer is open');

				$scope.modalData = {}; //reset data

				$scope.modalData.action = "create";

				$scope.modalData.title = "Add Customer";

				$('#modal-customer').modal('show');

			}

			$scope.updateCustomer = function(customer) {

				cacheDataForUndo(customer);

				$scope.modalData = {}; // reset data

				$scope.modalData.action = 'update';

				$scope.modalData.customer_id = customer.customer_id;

				$scope.modalData.firstname = customer.firstname;

				$scope.modalData.lastname = customer.lastname;

				$scope.modalData.fullname = 
				CommonService.capitalizeFirstLetter(customer.firstname)
				+ ' ' + CommonService.capitalizeFirstLetter(customer.lastname);

				$scope.modalData.title = "Update Customer" + ' [ ' + $scope.modalData.fullname + ' ] ';

				$scope.modalData.age = customer.age;

				$scope.modalData.address = customer.address;

				$scope.modalData.contact_number = customer.contact_number;

				$('#modal-customer').modal('show');

			}

			$scope.undoCustomer = function() {

				console.debug('undo ic clicked!');

				$scope.modalData.action = 'undo';

				$scope.openModalConfirmation();
			}

			$scope.deleteCustomer = function(customer) {

				$scope.modalData = {}; // reset data

				$scope.modalData.action = 'delete';

				$scope.modalData.fullname = customer.firstname + ' ' + customer.lastname;

				$scope.modalData.customer_id = customer.customer_id;

				$scope.openModalConfirmation();

			}

			$scope.resetConfirmationModal = function() {

				$scope.subModalData.title = "Confirmation";

				$scope.subModalData.bodyMessage = "Are You Sure?";

				$scope.subModalData.showDoneButton = false;

				$scope.subModalData.showUndoButton = false;

			}

			$scope.openModalConfirmation = function() {

				$scope.resetConfirmationModal();

				$('#submodal-confirmation').modal('show');

			}

			$scope.confirm = function() {

				if($scope.modalData.action === 'delete') {
					IndexService.deleteCustomer($scope.modalData.customer_id)
					.then(function(response) {
						console.debug('response :', response);					
						$scope.subModalData.title = "Successfull";
						$scope.subModalData.bodyMessage = "Deleted Customer" + ' ' + $scope.modalData.fullname;
					}).catch(function(error) {
						console.debug('error:', error);
					});
				} else if($scope.modalData.action === 'create') {

					var not_entered = "Not Entered";

					var data = {
						action : $scope.modalData.action,
						customer_id : $scope.modalData.customer_id,
						firstname : $scope.modalData.firstname || not_entered,
						lastname : $scope.modalData.lastname || not_entered,
						age : $scope.modalData.age || ' - ',
						address : $scope.modalData.address || not_entered,
						contact_number : $scope.modalData.contact_number || ' - '
					};

					IndexService.addCustomer(data)
					.then(function(response) {
						console.debug('response :', response);
						$scope.subModalData.title = "Successfull";
						$scope.subModalData.bodyMessage = "Created a Customer";
					}).catch(function(error) {
						console.debug('error :', error);
					});

				} else if($scope.modalData.action === 'update' || $scope.modalData.action === 'undo') {
					
					if($scope.modalData.action === 'undo') { //render the cache(old) data to the modal data if action is to undo

						$scope.modalData.customer_id = $scope.cache.customer_id;
						$scope.modalData.firstname = $scope.cache.firstname;
						$scope.modalData.lastname = $scope.cache.lastname;
						$scope.modalData.age = $scope.cache.age;
						$scope.modalData.address = $scope.cache.address;
						$scope.modalData.contact_number = $scope.cache.contact_number;

					}	

					IndexService.updateCustomer($scope.modalData)
					.then(function(response){

						console.debug('response:', response);
						$scope.subModalData.title = "Successfull";
						if($scope.modalData.action === 'update') {
							$scope.subModalData.bodyMessage = "Update Customer" + ' ' + $scope.modalData.fullname;
							$scope.subModalData.showUndoButton = true;
						} else {
							$scope.subModalData.bodyMessage = "Undo Changes From Customer" + ' ' + $scope.modalData.fullname;
							$scope.subModalData.showUndoButton = false;
						}

					}).catch(function(error) {

						console.debug('error:', error);

					});

				} // end of ELSE IF statement	

				$scope.subModalData.showDoneButton = true; //show done button

			} // End of Confirm function

			$scope.done = function() {

				if($scope.modalData.action === 'delete' || $scope.modalData.action === 'create') {

					$('#modal-customer').modal('hide');
					$('#submodal-confirmation').modal('hide');

				} else if($scope.modalData.action === 'update' || $scope.modalData.action === 'undo') {

					$('#submodal-confirmation').modal('hide');
					$scope.updateCustomer($scope.modalData);
					console.debug('modal data after undo :', $scope.modalData);
					$scope.modalData.done = true; // change cancel button to 'done'

				} 

				fetchAllCustomerFromDatabase(); // Redisplay customer table

			} // End of Done function

		}]);

}) ();