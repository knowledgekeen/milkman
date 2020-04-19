<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Authorization, X-Requested-With, Content-Type, Accept');
header("Content-Type: application/json");
//account.php?action=signUp
include 'conn.php';
include 'jwt_helper.php';
$action = $_GET['action'];

if($action == "updateopeningbal"){
	$headers = apache_request_headers();
	authenticate($headers);
    $data = json_decode(file_get_contents("php://input"));
    $clientid = $data->clientid;
	$amt = $data->openingbal;
	$baldet = $data->openingbaldate;
    if($_SERVER['REQUEST_METHOD']=='POST'){
		$sql = "INSERT INTO `opening_bal_register`(`clientid`, `amt`, `baldet`) VALUES ('$clientid', '$amt', '$baldet')";
        $result = $conn->query($sql);
        $openbalid = $conn->insert_id;
    }
    $data1= array();
    if($result){
		$data1["status"] = 200;
		$data1["data"] = $clientid;
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