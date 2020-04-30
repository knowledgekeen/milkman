<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Authorization, X-Requested-With, Content-Type, Accept');
header("Content-Type: application/json");
//account.php?action=signUp
include 'conn.php';
include 'jwt_helper.php';
$action = $_GET['action'];

if($action == "addPurchase"){
	$headers = apache_request_headers();
	authenticate($headers);
    $data = json_decode(file_get_contents("php://input"));
	$buffalostkqty = $data->buffalostkqty;
	$cowstkqty = $data->cowstkqty;
	$suppdata = $data->suppdata;
	$purchdate = $data->purchdate;
	$purchtime = $data->purchtime;
	
	if($_SERVER['REQUEST_METHOD']=='POST'){
		//Status: 1 == 'active'
		for($i=0; $i<count($suppdata); $i++) {
			$supp = $suppdata[$i];
			$sql = "INSERT INTO `purchase_register`( `clientid`, `purchdate`, `purchtime`,`buffaloqty`, `cowqty`,`buffaloinr`,`cowinr`,`amount`) VALUES ( '$supp->clientid', '$purchdate','$purchtime', '$supp->buffaloqty', '$supp->cowqty','$supp->buffalorate','$supp->cowrate','$supp->amount')";
		    $result = $conn->query($sql);
            $purchid = $conn->insert_id;
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
		$data1["data"] = $purchid;
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

	if($action == "getAllPurchases"){
		$headers = apache_request_headers();
		authenticate($headers);
		$sql = "SELECT pr.`purchid`,pr.`prodid`,pr.`clientid`,pr.`purchdate`,pr.`quantity`,pr.`rate`,cm.`name`, pm.`prodname` FROM `purchase_register` pr, `client_master` cm, `product_master` pm WHERE pr.`clientid`=cm.`clientid` AND pr.`prodid`=pm.`prodid` ORDER BY `purchid`";
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
				$tmp[$i]['purchid'] = $row['purchid'];
				$tmp[$i]['prodid'] = $row['prodid'];
				$tmp[$i]['clientid'] = $row['clientid'];
				$tmp[$i]['purchdate'] = $row['purchdate'];
				$tmp[$i]['quantity'] = $row['quantity'];
				$tmp[$i]['rate'] = $row['rate'];
				$tmp[$i]['name'] = $row['name'];
				$tmp[$i]['prodname'] = $row['prodname'];
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
	
/*if($action == "updatePurchase"){
	$headers = apache_request_headers();
	authenticate($headers);
    $data = json_decode(file_get_contents("php://input"));
	$purchid = $data->purchid;
	$clientid = $data->clientid;
	$purchdate = $data->purchdate;
	$prodid = $data->prodid;
	$quantity = $data->quantity;
	$rate = $data->rate;
	$prevqty = $data->prevqty;
	
    if($_SERVER['REQUEST_METHOD']=='POST'){
        //Status: 1 == 'active'
		$sql = "UPDATE `purchase_register` SET `prodid`=$prodid,`clientid`=$clientid,`purchdate`='$purchdate',`quantity`='$quantity',`rate`='$rate' WHERE `purchid`=$purchid";
		$result = $conn->query($sql);
        
        
        $sqlsm = "SELECT `quantity` FROM `stock_master` WHERE `prodid`=$prodid";
        $resultsm = $conn->query($sqlsm);
        $row = $resultsm->fetch_array(MYSQLI_ASSOC);

        $totalqty = floatval($row["quantity"]) - floatval($prevqty) + floatval($quantity);
        
        $sqlstock = "UPDATE `stock_master` SET `quantity`='$totalqty' WHERE `prodid`=$prodid";
		$resultstk = $conn->query($sqlstock);
	}
    $data1= array();
    if($result){
		$data1["status"] = 200;
		$data1["data"] = $purchid;
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
}*/
?>