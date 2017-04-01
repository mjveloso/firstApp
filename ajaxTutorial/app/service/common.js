(function() {

	angular.module('CommonService', [])
		.factory('CommonService', function() {

			return {
				validateUser : validateUser,
				capitalizeFirstLetter : capitalizeFirstLetter
			}

			function validateUser() {

				if(sessionStorage['status'] === true ) {
					window.location.href="index.php";
				}		

			}

			function capitalizeFirstLetter(string) {
			    return string.charAt(0).toUpperCase() + string.slice(1);
			}


		});

}) ();