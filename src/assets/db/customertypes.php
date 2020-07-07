<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Authorization, X-Requested-With, Content-Type, Accept');
header("Content-Type: application/json");
//account.php?action=signUp
include 'conn.php';
include 'jwt_helper.php';
$action = $_GET['action'];

if($action=="getAllCustomerTypeDetails"){
	$headers = apache_request_headers();
	authenticate($headers);
	$sql ="SELECT * from `customertype_register` order by `customertypename` "; 
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
			$tmp[$i]['customertype_id'] = $row['customertype_id'];
			$tmp[$i]['customertypename'] = $row['customertypename'];
			$tmp[$i]['customertype'] = $row['customertype'];
			
			$i++;
		}
		$data["status"] = 200;
		$data["data"] = $tmp;
		header(' ', true, 200);
	}
	else{
		$log  = "File: customertypes.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL;
		write_log($log, "error", $conn->error);
		$data["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data);
}
?>