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
if($action == "getAllOrders"){
	$headers = apache_request_headers();
	authenticate($headers);
	$deldate=$_GET['deldate'];
	 
	$sql = "SELECT oreg.`ordid`, oreg.`clientid`, oreg.`buffaloqty`, oreg.`cowqty`,oreg.`buffaloinr`,oreg.`cowinr`, oreg.`orderdt`, oreg.`amount`,cm.`name` FROM `order_register` oreg, `client_master` cm WHERE oreg.`clientid`=cm.`clientid` AND `orderdt`='$deldate' ORDER BY oreg.`ordid` ";
	$result = $conn->query($sql);
	while($row = $result->fetch_array())
	{
		$rows[] = $row;
		
	}
	$tmp = array();
	$data = array();
	$i = 0;
	//$ord=date('m/d/Y',$orderdt);
	if(count($rows)>0){
		foreach($rows as $row)
		{
			$tmp[$i]['ordid'] = $row['ordid'];
			$tmp[$i]['clientid'] = $row['clientid'];
			$tmp[$i]['buffaloqty'] = $row['buffaloqty'];
			$tmp[$i]['cowqty'] = $row['cowqty'];
			$tmp[$i]['buffaloqty'] = $row['buffaloqty'];
			$tmp[$i]['orderdt'] = $row['orderdt'];
			$tmp[$i]['buffalorate'] = $row['buffaloinr'];
			$tmp[$i]['cowrate'] = $row['cowinr'];
			$tmp[$i]['amount'] = $row['amount'];
			$tmp[$i]['name'] = $row['name'];
			$i++;
		}
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
 
if($action == "updateOrder"){
	$headers = apache_request_headers();
	authenticate($headers);
    $data = json_decode(file_get_contents("php://input"));
	$name = mysqli_real_escape_string($conn,$data->name);
	$clientid = $data->clientid;
	$orderdt=$data->orderdt;
	$buffaloqty=$data->buffaloqty;
	$cowqty=$data->cowqty;
	$buffaloinr=$data->buffaloinr;
	$cowinr=$data->cowinr;
	$amount=$data->amount;
	//$ordid=$data->ordid;
	
	
	if($_SERVER['REQUEST_METHOD']=='POST'){
        
		//$sql = "UPDATE `order_register` oreg,`client_master` cm  SET cm.`name`='$name',oreg.`buffaloqty`='$buffaloqty'
		//,oreg.`cowqty`='$cowqty',oreg.`orderdt`='$orderdt'  WHERE oreg.`clientid`=cm.`clientid` AND `ordid`=$oderid  ";
		$sql="UPDATE `order_register` SET `buffaloqty`='$buffaloqty',`cowqty`='$cowqty',`buffaloinr`='$buffaloinr',`cowinr`='$cowinr',`orderdt`='$orderdt',`amount`='$amount' WHERE 
		`clientid`='$clientid' ";
		$result = $conn->query($sql);
	}
    $data1= array();
    if($result){
		$data1["status"] = 200;
		$data1["data"] = $clientid;
		header(' ', true, 200);
		$sql1 = "SELECT * FROM `stock_master` WHERE `stockid`=2";
	    $result1 = $conn->query($sql1);
	    $row1 = $result1->fetch_array(MYSQLI_ASSOC);
		
		if($result1){
			$tmp1 = $row1['quantity'];
			if($tmp1 == $buffaloqty){
				$resultant = $buffaloqty;
			} else {
				$totalIncrementInQuantity = $buffaloqty + $tmp1;
				$resultant = $tmp1 + $totalIncrementInQuantity;
			}
			$sqlbuffupt = "UPDATE `stock_master` SET `quantity`='$resultant' WHERE `stockid`=2";
			$resultbuffupt = $conn->query($sqlbuffupt);
			header(' ', true, 200);
		}

		$sql2 = "SELECT * FROM `stock_master` WHERE `stockid`=1";
	    $result2 = $conn->query($sql2);
	    $row2 = $result1->fetch_array(MYSQLI_ASSOC);
		
		if($result2){
			$tmp2 = $row1['quantity'];
			if($tmp2 == $cowqty){
				$resultant1 = $cowqty;
			} else {
				$totalIncrementInQuantity1 = $cowqty - $tmp2;
				$resultant1 = $tmp2 + $totalIncrementInQuantity1;
			}
			$sqlbuffupt = "UPDATE `stock_master` SET `quantity`='$resultant1' WHERE `stockid`=1";
			$resultbuffupt = $conn->query($sqlbuffupt);
			header(' ', true, 200);
		}
		
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

?>