<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Authorization, X-Requested-With, Content-Type, Accept');
header("Content-Type: application/json");
//account.php?action=signUp
include 'conn.php';
include 'jwt_helper.php';
$action = $_GET['action'];

if($action == "addOpeningBalance"){
	$headers = apache_request_headers();
	authenticate($headers);
    $data = json_decode(file_get_contents("php://input"));
    $clientid = $data->clientid;
	$amount = $data->openingbal;
	$baldate = $data->openingbaldate;
    if($_SERVER['REQUEST_METHOD']=='POST'){
		$sql = "INSERT INTO `opening_bal_register`(`clientid`, `amount`, `openbaldt`) VALUES ($clientid, '$amount', '$baldate')";
        $result = $conn->query($sql);
        $openbalid = $conn->insert_id;
    }
    $data1= array();
    if($result){
		$data1["status"] = 200;
		$data1["data"] = $openbalid;
		header(' ', true, 200);
		//Logging
		$log  = "File: openingbalance.php - Method: $action".PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "success", NULL);
	}
	else{
		$log  = "File: openingbalance.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "error", $conn->error);
		$data1["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data1);
}

if($action == "checkIfOpeningBalPresent"){
	$headers = apache_request_headers();
	authenticate($headers);
	$clientid = ($_GET["clientid"]);
	$openbaldate = ($_GET["openbaldate"]);
	$sql = "SELECT * FROM `opening_bal_register` WHERE `clientid`=$clientid AND `openbaldt`='$openbaldate'";
	$result = $conn->query($sql);
	$row = $result->fetch_array(MYSQLI_ASSOC);
	$tmp = array();
	$data = array();

	if($result && $row['openbalid']){
		$tmp['openbalid'] = $row['openbalid'];
		$tmp['clientid'] = $row['clientid'];
		$tmp['amount'] = $row['amount'];
		$tmp['openbaldt'] = $row['openbaldt'];
		$data["status"] = 200;
		$data["data"] = $tmp;
		header(' ', true, 200);
	}
	else{
		$log  = "File: openingbalance.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL;
		write_log($log, "error", $conn->error);
		$data["status"] = 204;
		header(' ', true, 204);
	}
	echo json_encode($data);
}

if($action == "updateOpeningBalance"){
	$headers = apache_request_headers();
	authenticate($headers);
    $data = json_decode(file_get_contents("php://input"));
    $openbalid = $data->openbalid;
    $clientid = $data->clientid;
	$amount = $data->openingbal;
	$baldate = $data->openingbaldate;
    if($_SERVER['REQUEST_METHOD']=='POST'){
		$sql = "UPDATE `opening_bal_register` SET `amount`='$amount',`openbaldt`='$baldate' WHERE `openbalid`=$openbalid";
        $result = $conn->query($sql);
    }
    $data1= array();
    if($result){
		$data1["status"] = 200;
		$data1["data"] = $openbalid;
		header(' ', true, 200);
		//Logging
		$log  = "File: openingbalance.php - Method: $action".PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "success", NULL);
	}
	else{
		$log  = "File: openingbalance.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "error", $conn->error);
		$data1["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data1);
}
?>