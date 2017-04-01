<?php

	include "database/connectionDAO.php";

	class CustomerDAO extends ConnectionDAO {


		public function fetchAllCustomer() {
			$this->openConnection();
			$stmt = $this->dbh->prepare('SELECT * FROM `customers_table`');
			$stmt->execute();
			$ctr = 0;

			while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$arrRows[$ctr] = $result;
				$ctr++;
			} if($ctr > 0) {
				return $arrRows;
			} else {
				return array('empty');
			}

		} // End of fetchAllCustomer function

		public function addCustomer($data) {
			$this->openConnection();
			$stmt = $this->dbh->prepare('INSERT INTO `customers_table`(`firstname`,`lastname`,`age`,`address`,`contact_number`) VALUES(?,?,?,?,?)');
			$stmt->bindparam(1, $data['firstname']);
			$stmt->bindparam(2, $data['lastname']);
			$stmt->bindparam(3, $data['age']);
			$stmt->bindparam(4, $data['address']);
			$stmt->bindparam(5, $data['contact_number']);
			$stmt->execute();

			$rowCount = $stmt->rowCount();

			if($rowCount > 0) {
				return true;
			} else {
				return false;
			}

		} // End of addCustomer function

		public function updateCustomer($data) {
			$this->openConnection();
			$stmt = $this->dbh->prepare('UPDATE `customers_table` 
				SET `firstname`=?, `lastname`=?, `age`=?, `address`=?, `contact_number`=?
				WHERE `customer_id`=?');
			$stmt->bindparam(1, $data['firstname']);
			$stmt->bindparam(2, $data['lastname']);
			$stmt->bindparam(3, $data['age']);
			$stmt->bindparam(4, $data['address']);
			$stmt->bindparam(5, $data['contact_number']);
			$stmt->bindparam(6, $data['customer_id']);
			$stmt->execute();

			$rowCount = $stmt->rowCount();

			if($rowCount > 0) {
				return true;
			} else {
				return false;
			}

		} // End of updateCustomer function

		public function deleteCustomer($id) {
			$this->openConnection();
			$stmt = $this->dbh->prepare('DELETE FROM `customers_table` WHERE `customer_id`=?');
			$stmt->bindparam(1, $id);
			$stmt->execute();

			$rowCount = $stmt->rowCount();

			if($rowCount > 0) {
				return true;
			} else {
				return false;
			}

		} // End of addCustomer function


	}