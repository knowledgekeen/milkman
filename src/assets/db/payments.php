<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Authorization, X-Requested-With, Content-Type, Accept');
header("Content-Type: application/json");

include 'conn.php';
include 'jwt_helper.php';
$action = $_GET['action'];

if($action == "addPayment"){
	$headers = apache_request_headers();
	authenticate($headers);
    $data = json_decode(file_get_contents("php://input"));
	$clientid = $data->clientid;
	$paydt = $data->paydt;
	$amount = $data->amount;
	$particulars = mysqli_real_escape_string($conn,$data->particulars);
	$paymode = $data->paymode;
	
    if($_SERVER['REQUEST_METHOD']=='POST'){
		$sql = "INSERT INTO `payment_register`(`clientid`, `paydt`, `amount`, `particulars`, `paymode`) VALUES ($clientid, '$paydt', '$amount', '$particulars', $paymode)";
		$result = $conn->query($sql);
        $payid = $conn->insert_id;
	}
    $data1= array();
    if($result){
		$data1["status"] = 200;
		$data1["data"] = $payid;
		header(' ', true, 200);
		//Logging
		$log  = "File: payments.php - Method: $action".PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "success", NULL);
	}
	else{
		$log  = "File: payments.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "error", $conn->error);
		$data1["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data1);
}

?>