<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Authorization, X-Requested-With, Content-Type, Accept');
header("Content-Type: application/json");
//account.php?action=signUp
include 'conn.php';
include 'jwt_helper.php';
$action = $_GET['action'];

if($action == "getAllStocks"){
	$headers = apache_request_headers();
	authenticate($headers);
	$sql = "SELECT sm.`stockid`, sm.`prodid`,sm.`quantity`,pm.`prodname` FROM `stock_master` sm, `product_master` pm WHERE sm.`prodid`=pm.`prodid` ORDER BY pm.`prodname`";
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
			$tmp[$i]['stockid'] = $row['stockid'];
			$tmp[$i]['prodid'] = $row['prodid'];
			$tmp[$i]['quantity'] = $row['quantity'];
			$tmp[$i]['prodname'] = $row['prodname'];
			$i++;
		}
		$data["status"] = 200;
		$data["data"] = $tmp;
		header(' ', true, 200);
	}
	else{
		$log  = "File: client.php - Method: getAllClients".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL;
		write_log($log, "error", $conn->error);
		$data["status"] = 204;
		header(' ', true, 204);
	}
	echo json_encode($data);
}

?>