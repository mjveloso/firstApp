<?php

	include "../customerDAO.php";

	if($_SERVER['REQUEST_METHOD'] === 'GET') {

		$customer = new CustomerDAO();

		$process = $customer->fetchAllCustomer();

		echo json_encode($process);

	} else if($_SERVER['REQUEST_METHOD'] === 'POST') {

		$postdata = json_decode(file_get_contents("php://input"));

		$data = array(
			'firstname' => $postdata->firstname,
			'lastname' => $postdata->lastname,
			'age' => $postdata->age,
			'address' => $postdata->address,
			'contact_number' => $postdata->contact_number
			);


		$customer = new CustomerDAO();
		
		if($postdata->action === 'create') {

			$process = $customer->addCustomer($data);

		} else {
			$data['customer_id'] = $postdata->customer_id;
			$process = $customer->updateCustomer($data);

		}

		echo json_encode($process);
		
	} else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {

		$id = json_decode(file_get_contents("php://input"));

		$customer = new CustomerDAO();
		
		$process = $customer->deleteCustomer($id);

		//var_dump($process);

		echo $id;

	}




	