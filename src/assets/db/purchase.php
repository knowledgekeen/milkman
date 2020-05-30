<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Authorization, X-Requested-With, Content-Type, Accept');
header("Content-Type: application/json");
//account.php?action=signUp
include 'conn.php';
include 'jwt_helper.php';
$action = $_GET['action'];

// if($action == "addPurchase"){
// 	$headers = apache_request_headers();
// 	authenticate($headers);
//     $data = json_decode(file_get_contents("php://input"));
// 	$buffalostkqty = $data->buffalostkqty;
// 	$cowstkqty = $data->cowstkqty;
// 	$suppdata = $data->suppdata;
// 	$purchdate = $data->purchdate;
// 	//$purchtime = $data->purchtime;
	
// 	if($_SERVER['REQUEST_METHOD']=='POST'){
// 		//Status: 1 == 'active'
// 		for($i=0; $i<count($suppdata) ; $i++) {
// 			$supp = $suppdata[$i];
// 			if($supp->morngbuffaloqty==0 && $supp->morngcowqty==0)
// 			{ continue; } 
// 			else{
// 			$purchtime="1";
// 			$sql = "INSERT INTO `purchase_register`( `clientid`, `purchdate`, `purchtime`,`morngbuffaloqty`, `morngcowqty`,`buffaloinr`,`cowinr`,`amount`) VALUES ( '$supp->clientid', '$purchdate','$purchtime', '$supp->morngbuffaloqty', '$supp->morngcowqty','$supp->buffalorate','$supp->cowrate','$supp->amount')";
// 		    $result = $conn->query($sql);
//             $purchid = $conn->insert_id;
// 		    }
// 		  if($supp->evngbuffaloqty==0 && $supp->evngcowqty==0)
// 			{ continue;} 
// 			else{
// 			$purchtime="2";
// 			$sql = "INSERT INTO `purchase_register`( `clientid`, `purchdate`, `purchtime`,`evngbuffaloqty`, `evngcowqty`,`buffaloinr`,`cowinr`,`amount`) VALUES ( '$supp->clientid', '$purchdate','$purchtime', '$supp->evngbuffaloqty', '$supp->evngcowqty','$supp->buffalorate','$supp->cowrate','$supp->amount')";
// 		    $result = $conn->query($sql);
//             $purchid = $conn->insert_id;
// 		  }
// 	    }
//         // Update buffalo stock quantity in stock
// 		$sqlbuffupt = "UPDATE `stock_master` SET `quantity`='$buffalostkqty' WHERE `stockid`=2";
// 		$resultbuffupt = $conn->query($sqlbuffupt);
		
// 		// Update cow stock quantity in stock
// 		$sqlcowupt = "UPDATE `stock_master` SET `quantity`='$cowstkqty' WHERE `stockid`=1";
// 		$resultcowupt = $conn->query($sqlcowupt);
// 	}
//     $data1= array();
//     if($result){
// 		$data1["status"] = 200;
// 		$data1["data"] = $purchid;
// 		header(' ', true, 200);
// 		//Logging
// 		$log  = "File: purchase.php - Method: $action".PHP_EOL.
// 		"Data: ".json_encode($data).PHP_EOL;
// 		write_log($log, "success", NULL);
// 	}
// 	else{
// 		$log  = "File: purchase.php - Method: $action".PHP_EOL.
// 		"Error message: ".$conn->error.PHP_EOL.
// 		"Data: ".json_encode($data).PHP_EOL;
// 		write_log($log, "error", $conn->error);
// 		$data1["status"] = 204;
// 		header(' ', true, 204);
// 	}
// 	echo json_encode($data1);
// }

if($action == "addPurchase"){
	$headers = apache_request_headers();
	authenticate($headers);
    $data = json_decode(file_get_contents("php://input"));
	$buffalostkqty = $data->buffalostkqty;
	$cowstkqty = $data->cowstkqty;
	$suppdata = $data->suppdata;
	$purchdate = $data->purchdate;
	//$purchtime = $data->purchtime;
	
	if($_SERVER['REQUEST_METHOD']=='POST'){
		//Status: 1 == 'active'
		for($i=0; $i<count($suppdata) ; $i++) {
			$supp = $suppdata[$i];
			if($supp->morngbuffalodisabled==false && floatval($supp->morngbuffaloqty)!=0)
			{ 
				$purchtime="1";
				$sql = "INSERT INTO `purchase_register`(`clientid`, `purchdate`, `purchtime`, `morngbuffaloqty`, `morngcowqty`, `evngbuffaloqty`, `evngcowqty`, `buffaloinr`, `cowinr`, `amount`) VALUES ('$supp->clientid','$purchdate','$purchtime','$supp->morngbuffaloqty','$supp->morngcowqty','$supp->evngbuffaloqty','$supp->evngcowqty','$supp->buffalorate','$supp->cowrate','$supp->amount')";
				$result = $conn->query($sql);
				$purchid = $conn->insert_id;
		    }
			else if($supp->evngbuffalodisabled==false && floatval($supp->evngbuffaloqty)!=0)
			{ 
				$purchtime="2";
				$sql = "INSERT INTO `purchase_register`(`clientid`, `purchdate`, `purchtime`, `morngbuffaloqty`, `morngcowqty`, `evngbuffaloqty`, `evngcowqty`, `buffaloinr`, `cowinr`, `amount`) VALUES ('$supp->clientid','$purchdate','$purchtime','$supp->morngbuffaloqty','$supp->morngcowqty','$supp->evngbuffaloqty','$supp->evngcowqty','$supp->buffalorate','$supp->cowrate','$supp->amount')";
				$result = $conn->query($sql);
				$purchid = $conn->insert_id;
		    }
			else if($supp->evngcowdisabled==false && floatval($supp->evngcowqty)!=0)
			{ 
				$purchtime="2";
				$sql = "INSERT INTO `purchase_register`(`clientid`, `purchdate`, `purchtime`, `morngbuffaloqty`, `morngcowqty`, `evngbuffaloqty`, `evngcowqty`, `buffaloinr`, `cowinr`, `amount`) VALUES ('$supp->clientid','$purchdate','$purchtime','$supp->morngbuffaloqty','$supp->morngcowqty','$supp->evngbuffaloqty','$supp->evngcowqty','$supp->buffalorate','$supp->cowrate','$supp->amount')";
				$result = $conn->query($sql);
				$purchid = $conn->insert_id;
		    }
			else if($supp->morngcowdisabled==false && floatval($supp->morngcowqty)!=0)
			{ 
				$purchtime="1";
				$sql = "INSERT INTO `purchase_register`(`clientid`, `purchdate`, `purchtime`, `morngbuffaloqty`, `morngcowqty`, `evngbuffaloqty`, `evngcowqty`, `buffaloinr`, `cowinr`, `amount`) VALUES ('$supp->clientid','$purchdate','$purchtime','$supp->morngbuffaloqty','$supp->morngcowqty','$supp->evngbuffaloqty','$supp->evngcowqty','$supp->buffalorate','$supp->cowrate','$supp->amount')";
				$result = $conn->query($sql);
				$purchid = $conn->insert_id;
		    }
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
		// $data1["data"] = $purchid;
		header(' ', true, 200);
		//Logging
		$log  = "File: purchase.php - Method: $action".PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "success", NULL);
	}
	else{
		$log  = "File: purchase.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "error", $conn->error);
		$data1["status"] = 204;
		header(' ', true, 204);
	}
	echo json_encode($data1);
}

if($action == "fetchSuppliersDetails"){
	$headers = apache_request_headers();
	authenticate($headers);
	$purdate = $_GET['purdate'];
	$sql="SELECT per.`morngbuffaloqty`,per.`morngcowqty`,per.`evngbuffaloqty`,per.`evngcowqty`,cli.`name`, per.`clientid` from `purchase_register` per,`client_master` cli  where per.`clientid`=cli.`clientid` AND per.`purchdate`='$purdate';";
	//$sql = "SELECT * FROM `purchase_register` ORDER BY `purchid`";     
	$result = $conn->query($sql);
	while($row = $result->fetch_array())
	{
		$rows[] = $row;
		
	}
	$tmp = array();
	$data = array();
	$i=0;
	if(count($rows)>0){
		foreach($rows as $row)
		{   $tmp[$i]['clientid'] = $row['clientid'];
		    $tmp[$i]['name'] = $row['name'];
			$tmp[$i]['morngbuffaloqty'] = $row['morngbuffaloqty'];
		    $tmp[$i]['morngcowqty'] = $row['morngcowqty'];
			$tmp[$i]['evngbuffaloqty'] = $row['evngbuffaloqty'];
			$tmp[$i]['evngcowqty'] = $row['evngcowqty'];			
			$i++;
		}
		$data["status"] = 200;
		$data["data"] = $tmp;
		header(' ', true, 200);	
    }
	else{
		$log  = "File: purchase.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL;
		write_log($log, "error", $conn->error);
		$data["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data);
}

?>