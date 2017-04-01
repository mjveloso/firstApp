<?php


	class ConnectionDAO {

		protected $db_name = "merlonprojectdb";
		protected $host = "localhost";
		protected $username = "root";
		protected $password = "";
		protected $dbh = null;

		public function openConnection() {

			try {
 				$this->dbh = new PDO("mysql:host=". $this->host . ";dbname=". $this->db_name, $this->username, $this->password);
	 		} catch(Exception $e) {
	 			$e->getMessage();
	 		}

		} // end of openConnection function

		public function closeConnection() {
			try {
				$this->dbh = null;
			} catch(Exception $e) {
				$e->getMessage();
			}
		}

	} // end of connectionDAO class







