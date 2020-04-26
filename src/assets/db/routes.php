<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Authorization, X-Requested-With, Content-Type, Accept');
header("Content-Type: application/json");
//account.php?action=signUp
include 'conn.php';
include 'jwt_helper.php';
$action = $_GET['action'];

if($action == "getAllDistinctRoutes"){
	$headers = apache_request_headers();
	authenticate($headers);
	$sql = "SELECT DISTINCT(`routeno`) FROM `client_master` WHERE `routeno` IS NOT NULL ORDER BY `routeno`";
	$result = $conn->query($sql);
	while($row = $result->fetch_array())
	{
		$rows[] = $row;
	}

	$tmp = array();
	$data = array();
	$i = 0;

	if(count($rows)>0){
		foreach($rows as $row)
		{
			$tmp[$i]['routeno'] = $row['routeno'];
			$i++;
		}
		$data["status"] = 200;
		$data["data"] = $tmp;
		header(' ', true, 200);
	}
	else{
		$log  = "File: routes.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL;
		write_log($log, "error", $conn->error);
		$data["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data);
}

if($action == "getRouteCustomersOnDate"){
	$headers = apache_request_headers();
	authenticate($headers);
	$startdt = ($_GET["startdt"]);
	$enddt = ($_GET["enddt"]);
	$routeno = ($_GET["routeno"]);
	$sql = "SELECT oreg.`ordid`, oreg.`clientid`, oreg.`orderdt`, oreg.`buffaloqty`, oreg.`cowqty`, oreg.`route`, oreg.`deliveryplace`, oreg.`deliverydt`, cm.`name` FROM `order_register` oreg, `client_master` cm WHERE oreg.`route`='$routeno' AND (oreg.`deliverydt` BETWEEN '$startdt' AND '$enddt') AND oreg.`clientid`=cm.`clientid` ORDER BY oreg.`ordid`";
	$result = $conn->query($sql);
	while($row = $result->fetch_array())
	{
		$rows[] = $row;
	}

	$tmp = array();
	$data = array();
	$i = 0;

	if(count($rows)>0){
		foreach($rows as $row)
		{
			$tmp[$i]['ordid'] = $row['ordid'];
			$tmp[$i]['clientid'] = $row['clientid'];
			$tmp[$i]['orderdt'] = $row['orderdt'];
			$tmp[$i]['buffaloqty'] = $row['buffaloqty'];
			$tmp[$i]['cowqty'] = $row['cowqty'];
			$tmp[$i]['route'] = $row['route'];
			$tmp[$i]['deliveryplace'] = $row['deliveryplace'];
			$tmp[$i]['deliverydt'] = $row['deliverydt'];
			$tmp[$i]['name'] = $row['name'];
			$i++;
		}
		$data["status"] = 200;
		$data["data"] = $tmp;
		header(' ', true, 200);
	}
	else{
		$log  = "File: routes.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL;
		write_log($log, "error", $conn->error);
		$data["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data);
}

if($action == "getDriverDetails"){
	$headers = apache_request_headers();
	authenticate($headers);
	$startdt = ($_GET["startdt"]);
	$routeno = ($_GET["routeno"]);
	$sql = "SELECT * FROM `route_driver_register` WHERE `route`='$routeno' AND`deliverydt`='$startdt'";
	$result = $conn->query($sql);
	$row = $result->fetch_array(MYSQLI_ASSOC);
	$tmp = array();
	$data = array();

	if($result && $row['routedriverid']){
		$tmp['routedriverid'] = $row['routedriverid'];
		$tmp['route'] = $row['route'];
		$tmp['drivernm'] = $row['drivernm'];
		$tmp['vehicleno'] = $row['vehicleno'];
		$tmp['deliverydt'] = $row['deliverydt'];
		$data["status"] = 200;
		$data["data"] = $tmp;
		header(' ', true, 200);
	}
	else{
		$log  = "File: routes.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL;
		write_log($log, "error", $conn->error);
		$data["status"] = 204;
		header(' ', true, 204);
	}
	echo json_encode($data);
}

if($action == "addDriverDetails"){
	$headers = apache_request_headers();
	authenticate($headers);
    $data = json_decode(file_get_contents("php://input"));
	$startdt = $data->startdt;
	$drivernm = $data->drivernm;
	$vehno = $data->vehno;
	$routeno = $data->routeno;
	
    if($_SERVER['REQUEST_METHOD']=='POST'){
		$sql = "INSERT INTO `route_driver_register`(`route`, `drivernm`, `vehicleno`, `deliverydt`) VALUES ($routeno,'$drivernm','$vehno','$startdt')";
		$result = $conn->query($sql);
		$driverid = $conn->insert_id;
	}
    $data1= array();
    if($result){
		$data1["status"] = 200;
		$data1["data"] = $driverid;
		header(' ', true, 200);
		//Logging
		$log  = "File: routes.php - Method: $action".PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "success", NULL);
	}
	else{
		$log  = "File: routes.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "error", $conn->error);
		$data1["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data1);
}

if($action == "updateDriverDetails"){
	$headers = apache_request_headers();
	authenticate($headers);
    $data = json_decode(file_get_contents("php://input"));
	$startdt = $data->startdt;
	$drivernm = $data->drivernm;
	$vehno = $data->vehno;
	$routeno = $data->routeno;
	
    if($_SERVER['REQUEST_METHOD']=='POST'){
		$sql = "UPDATE `route_driver_register` SET `drivernm`='$drivernm',`vehicleno`='$vehno' WHERE `route`=$routeno AND `deliverydt`='$startdt'";
		$result = $conn->query($sql);
	}
    $data1= array();
    if($result){
		$data1["status"] = 200;
		$data1["data"] = $routeno;
		header(' ', true, 200);
		//Logging
		$log  = "File: routes.php - Method: $action".PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "success", NULL);
	}
	else{
		$log  = "File: routes.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "error", $conn->error);
		$data1["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data1);
}

if($action == "changeRoute"){
	$headers = apache_request_headers();
	authenticate($headers);
    $data = json_decode(file_get_contents("php://input"));
	$ordid = $data->ordid;
	$newroute = $data->newroute;
	
    if($_SERVER['REQUEST_METHOD']=='POST'){
		$sql = "UPDATE `order_register` SET `route`=$newroute WHERE `ordid`=$ordid";
		$result = $conn->query($sql);
	}
    $data1= array();
    if($result){
		$data1["status"] = 200;
		$data1["data"] = $newroute;
		header(' ', true, 200);
		//Logging
		$log  = "File: routes.php - Method: $action".PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "success", NULL);
	}
	else{
		$log  = "File: routes.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "error", $conn->error);
		$data1["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data1);
}

if($action == "getRoutesOrders"){
	$headers = apache_request_headers();
	authenticate($headers);
	$routeno = ($_GET["routeno"]);
	$tomdt = ($_GET["tomdt"]);
	$sql = "SELECT ord.`ordid`, ord.`clientid`, ord.`orderdt`, ord.`buffaloqty`, ord.`cowqty`, ord.`route`, ord.`buffaloinr`, ord.`cowinr`, ord.`amount` FROM `order_register` ord WHERE ord.`route`=$routeno AND ord.`orderdt`=$tomdt";
	$result = $conn->query($sql);
	while($row = $result->fetch_array())
	{
		$rows[] = $row;
	}

	$tmp = array();
	$data = array();
	$i = 0;

	if(count($rows)>0){
		foreach($rows as $row)
		{
			$tmp[$i]['ordid'] = $row['ordid'];
			$tmp[$i]['clientid'] = $row['clientid'];
			$tmp[$i]['orderdt'] = $row['orderdt'];
			$tmp[$i]['buffaloqty'] = $row['buffaloqty'];
			$tmp[$i]['cowqty'] = $row['cowqty'];
			$tmp[$i]['route'] = $row['route'];
			$tmp[$i]['buffaloinr'] = $row['buffaloinr'];
			$tmp[$i]['cowinr'] = $row['cowinr'];
			$tmp[$i]['amount'] = $row['amount'];
			$i++;
		}
		$sqldriverroute = "SELECT * FROM `route_driver_register` WHERE `route`=1 AND `orderdt`=1587925800001";
		$resultdriverroute = $conn->query($sqldriverroute);
		$rowdriverroute = $resultdriverroute->fetch_array(MYSQLI_ASSOC);
		$tmpdriver = array();
		if($resultdriverroute && $rowdriverroute['routedriverid']){
			$tmpdriver['routedriverid'] = $rowdriverroute['routedriverid'];
			$tmpdriver['drivernm'] = $rowdriverroute['drivernm'];
			$tmpdriver['vehicleno'] = $rowdriverroute['vehicleno'];
		}
		$data["status"] = 200;
		$data["driverdets"] = $tmpdriver;
		$data["data"] = $tmp;
		header(' ', true, 200);
	}
	else{
		$log  = "File: routes.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL;
		write_log($log, "error", $conn->error);
		$data["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data);
}
?>