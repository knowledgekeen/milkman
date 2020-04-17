<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Authorization, X-Requested-With, Content-Type, Accept');
header("Content-Type: application/json");
//account.php?action=signUp
include 'conn.php';
include 'jwt_helper.php';
$action = $_GET['action'];

if($action == "addProduction"){
	$headers = apache_request_headers();
	authenticate($headers);
    $data = json_decode(file_get_contents("php://input"));
	$prodid = $data->prodid;
	$proddt = $data->proddt;
	$qty = $data->qty;
	
    if($_SERVER['REQUEST_METHOD']=='POST'){
        //Status: 1 == 'active'
		$sql = "INSERT INTO `inhouse_production_register`(`prodid`, `quantity`, `proddt`) VALUES ($prodid,'$qty','$proddt')";
		$result = $conn->query($sql);
        $productionid = $conn->insert_id;

        $sqlsm = "SELECT `quantity` FROM `stock_master` WHERE `prodid`=$prodid";
        $resultsm = $conn->query($sqlsm);
        $row = $resultsm->fetch_array(MYSQLI_ASSOC);

        $totalqty = floatval($row["quantity"]) + floatval($qty);
        
        $sqlstock = "UPDATE `stock_master` SET `quantity`='$totalqty' WHERE `prodid`=$prodid";
		$resultstk = $conn->query($sqlstock);
	}
    $data1= array();
    if($result){
		$data1["status"] = 200;
		$data1["data"] = $prodid;
		header(' ', true, 200);
		//Logging
		$log  = "File: production.php - Method: $action".PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "success", NULL);
	}
	else{
		$log  = "File: production.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "error", $conn->error);
		$data1["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data1);
}

?>