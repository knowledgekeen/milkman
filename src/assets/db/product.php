<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Authorization, X-Requested-With, Content-Type, Accept');
header("Content-Type: application/json");
//account.php?action=signUp
include 'conn.php';
include 'jwt_helper.php';
$action = $_GET['action'];

if($action == "addProduct"){
	$headers = apache_request_headers();
	authenticate($headers);
    $data = json_decode(file_get_contents("php://input"));
	$prodnm = $data->prodnm;
	
    if($_SERVER['REQUEST_METHOD']=='POST'){
        //Status: 1 == 'active'
		$sql = "INSERT INTO `product_master`(`prodname`) VALUES ('$prodnm')";
        $result = $conn->query($sql);
        $prodid = $conn->insert_id;
	}
    $data1= array();
    if($result){
		$data1["status"] = 200;
		$data1["data"] = $prodid;
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

if($action == "getAllProducts"){
	$headers = apache_request_headers();
	authenticate($headers);
	$sql = "SELECT * FROM `product_master` ORDER BY `prodname`";
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
			$tmp[$i]['prodid'] = $row['prodid'];
			$tmp[$i]['prodname'] = $row['prodname'];
			$i++;
		}
		$data["status"] = 200;
		$data["data"] = $tmp;
		header(' ', true, 200);
	}
	else{
		$log  = "File: product.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL;
		write_log($log, "error", $conn->error);
		$data["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data);
}

if($action == "updateProduct"){
	$headers = apache_request_headers();
	authenticate($headers);
    $data = json_decode(file_get_contents("php://input"));
	$prodid = $data->prodid;
	$prodnm = $data->prodnm;
	
    if($_SERVER['REQUEST_METHOD']=='POST'){
		$sql = "UPDATE `product_master` SET `prodname`='$prodnm' WHERE `prodid`=$prodid";
        $result = $conn->query($sql);
	}
    $data1= array();
    if($result){
		$data1["status"] = 200;
		$data1["data"] = $prodid;
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
?>