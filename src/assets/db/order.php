<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Authorization, X-Requested-With, Content-Type, Accept');
header("Content-Type: application/json");
//account.php?action=signUp
include 'conn.php';
include 'jwt_helper.php';
$action = $_GET['action'];

if($action == "placeOrder"){
	$headers = apache_request_headers();
	authenticate($headers);
    $data = json_decode(file_get_contents("php://input"));
	$orderdt = $data->orderdt;
	$routeno = $data->routeno;
	$drivernm = $data->drivernm;
	$vehicleno = $data->vehicleno;
	$buffalostkqty = $data->buffalostkqty;
	$cowstkqty = $data->cowstkqty;
	$custorders = $data->custorders;
	
    if($_SERVER['REQUEST_METHOD']=='POST'){
		$sql = "INSERT INTO `route_driver_register`(`route`, `drivernm`, `vehicleno`, `orderdt`) VALUES ($routeno, '$drivernm', '$vehicleno', '$orderdt')";
		$result = $conn->query($sql);
		$orddriverid = $conn->insert_id;
		for($i=0; $i<count($custorders); $i++) {
			$cust = $custorders[$i];
			$sqlins="INSERT INTO `order_register`(`clientid`, `orderdt`, `buffaloqty`, `cowqty`, `route`, `buffaloinr`, `cowinr`, `amount`) VALUES ($cust->clientid,'$orderdt',$cust->buffaloqty,$cust->cowqty,$routeno,'$cust->buffalorate', '$cust->cowrate', '$cust->amount')";
			$resultins = $conn->query($sqlins);
			$orderid = $conn->insert_id;
		}

		// Update buffalo stock quantity in stock
		$sqlbuffupt = "UPDATE `stock_master` SET `quantity`='$buffalostkqty' WHERE `stockid`=2";
		$resultbuffupt = $conn->query($sqlbuffupt);
		
		// Update cow stock quantity in stock
		$sqlcowupt = "UPDATE `stock_master` SET `quantity`='$cowstkqty' WHERE `stockid`=1";
		$resultcowupt = $conn->query($sqlcowupt);
	}
    $data1= array();
    if($result){
		$data1["status"] = 200;
		$data1["data"] = $orddriverid;
		header(' ', true, 200);
		//Logging
		$log  = "File: order.php - Method: $action".PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "success", NULL);
	}
	else{
		$log  = "File: order.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "error", $conn->error);
		$data1["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data1);
}

if($action == "getCustomerLastOrderDets"){
	$headers = apache_request_headers();
	authenticate($headers);
	$clientid = ($_GET["clientid"]);
	$sql = "SELECT * FROM `order_register` WHERE `clientid`=$clientid ORDER BY `ordid` DESC LIMIT 1";
	$result = $conn->query($sql);
	$row = $result->fetch_array(MYSQLI_ASSOC);
	$tmp = array();
	$data = array();

	if($result && $row['ordid']){
		$tmp['ordid'] = $row['ordid'];
		$tmp['clientid'] = $row['clientid'];
		$tmp['orderdt'] = $row['orderdt'];
		$tmp['buffaloqty'] = $row['buffaloqty'];
		$tmp['cowqty'] = $row['cowqty'];
		$tmp['deliveryplace'] = $row['deliveryplace'];
		$tmp['route'] = $row['route'];
		$tmp['deliverydt'] = $row['deliverydt'];
		$tmp['buffaloinr'] = $row['buffaloinr'];
		$tmp['cowinr'] = $row['cowinr'];
		$data["status"] = 200;
		$data["data"] = $tmp;
		header(' ', true, 200);
	}
	else{
		$log  = "File: order.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL;
		write_log($log, "error", $conn->error);
		$data["status"] = 204;
		header(' ', true, 204);
	}
	echo json_encode($data);
}
?>