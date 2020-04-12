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
	$clientid = $data->clientid;
	$orderdt = $data->orderdt;
	$buffaloqty = $data->buffaloqty;
	$cowqty = $data->cowqty;
	$deliveryplace = $data->deliveryplace;
	$route = $data->route;
	$deliverydt = $data->deliverydt;
	$buffaloinr = $data->buffaloinr;
	$cowinr = $data->cowinr;
	$milkstkobj = $data->milkstkobj;
	
    if($_SERVER['REQUEST_METHOD']=='POST'){
		$sql = "INSERT INTO `order_register`(`clientid`, `orderdt`, `buffaloqty`, `cowqty`, `deliveryplace`, `route`, `deliverydt`, `buffaloinr`, `cowinr`) VALUES ($clientid,'$orderdt',$buffaloqty,$cowqty,'$deliveryplace',$route,'$deliverydt','$buffaloinr','$cowinr')";
		$result = $conn->query($sql);
		$orderid = $conn->insert_id;

        for($i=0; $i<count($milkstkobj); $i++) {
            $prodid=$milkstkobj[$i]->prodid;
            $qty=$milkstkobj[$i]->qty;
            $sql = "SELECT `stockid`,`quantity` FROM `stock_master` WHERE `prodid`=$prodid";
            $result = $conn->query($sql);
            $row = $result->fetch_array(MYSQLI_ASSOC);
            $totalqty = floatval($row["quantity"]) - floatval($qty);

            $sqlupdt = "UPDATE `stock_master` SET `quantity`='$totalqty' WHERE `prodid`=$prodid";
            $resultqty = $conn->query($sqlupdt);
        }
	}
    $data1= array();
    if($result){
		$data1["status"] = 200;
		$data1["data"] = $orderid;
		header(' ', true, 200);
		//Logging
		$log  = "File: product.php - Method: $action".PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "success", NULL);
	}
	else{
		$log  = "File: product.php - Method: $action".PHP_EOL.
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