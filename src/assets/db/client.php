<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Authorization, X-Requested-With, Content-Type, Accept');
header("Content-Type: application/json");
//account.php?action=signUp
include 'conn.php';
include 'jwt_helper.php';
$action = $_GET['action'];

if($action == "addClient"){
	$headers = apache_request_headers();
	authenticate($headers);
    $data = json_decode(file_get_contents("php://input"));
	$fname = mysqli_real_escape_string($conn,$data->fname);
	$cno = $data->cno;
	$cperson = $data->cperson;
	$cno1 = $data->cno1;
	$address = mysqli_real_escape_string($conn,$data->address);
	$addinfo = mysqli_real_escape_string($conn,$data->addinfo);
    $ctype = $data->ctype;
    if($_SERVER['REQUEST_METHOD']=='POST'){
        //Status: 1 == 'active'
		$sql = "INSERT INTO `client_master`(`name`, `cno`, `cperson`, `cno1`, `address`, `addinfo`, `ctype`) VALUES ('$fname','$cno','$cperson','$cno1','$address','$addinfo',$ctype)";
        $result = $conn->query($sql);
        $userid = $conn->insert_id;
	}
    $data1= array();
    if($result){
		$data1["status"] = 200;
		$data1["data"] = $userid;
		header(' ', true, 200);
		//Logging
		$log  = "File: client.php - Method: addClient".PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "success", NULL);
	}
	else{
		$log  = "File: client.php - Method: addClient".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "error", $conn->error);
		$data1["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data1);
}

if($action == "getAllClients"){
	$headers = apache_request_headers();
	authenticate($headers);
	$sql = "SELECT * FROM `client_master` ORDER BY `name`";
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
			$tmp[$i]['clientid'] = $row['clientid'];
			$tmp[$i]['name'] = $row['name'];
			$tmp[$i]['address'] = $row['address'];
			$tmp[$i]['cno'] = $row['cno'];
			$tmp[$i]['cperson'] = $row['cperson'];
			$tmp[$i]['cno1'] = $row['cno1'];
			$tmp[$i]['addinfo'] = $row['addinfo'];
			$tmp[$i]['ctype'] = $row['ctype'];
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

if($action == "getClientDetails"){
	$headers = apache_request_headers();
	authenticate($headers);
	$clientid = ($_GET["clientid"]);
	$sql = "SELECT * FROM `client_master` WHERE `clientid`=$clientid ORDER BY `name`";
	$result = $conn->query($sql);
	$row = $result->fetch_array(MYSQLI_ASSOC);
	$tmp = array();
	$data = array();

	if($result){
		$tmp['clientid'] = $row['clientid'];
		$tmp['name'] = $row['name'];
		$tmp['address'] = $row['address'];
		$tmp['cno'] = $row['cno'];
		$tmp['cperson'] = $row['cperson'];
		$tmp['cno1'] = $row['cno1'];
		$tmp['addinfo'] = $row['addinfo'];
		$tmp['ctype'] = $row['ctype'];
		$data["status"] = 200;
		$data["data"] = $tmp;
		header(' ', true, 200);
	}
	else{
		$log  = "File: client.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL;
		write_log($log, "error", $conn->error);
		$data["status"] = 204;
		header(' ', true, 204);
	}
	echo json_encode($data);
}

if($action == "updateClient"){
	$headers = apache_request_headers();
	authenticate($headers);
    $data = json_decode(file_get_contents("php://input"));
	$fname = mysqli_real_escape_string($conn,$data->fname);
	$clientid = $data->clientid;
	$cno = $data->cno;
	$cperson = $data->cperson;
	$cno1 = $data->cno1;
	$address = mysqli_real_escape_string($conn,$data->address);
	$addinfo = mysqli_real_escape_string($conn,$data->addinfo);
    $ctype = $data->ctype;
    if($_SERVER['REQUEST_METHOD']=='POST'){
        //Status: 1 == 'active'
		$sql = "UPDATE `client_master` SET `name`='$fname',`cno`='$cno',`cperson`='$cperson',`cno1`='$cno1',`address`='$address',`addinfo`='$addinfo',`ctype`=$ctype WHERE `clientid`=$clientid";
        $result = $conn->query($sql);
	}
    $data1= array();
    if($result){
		$data1["status"] = 200;
		$data1["data"] = $clientid;
		header(' ', true, 200);
		//Logging
		$log  = "File: client.php - Method: $action".PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "success", NULL);
	}
	else{
		$log  = "File: client.php - Method: $action".PHP_EOL.
		"Error message: ".$conn->error.PHP_EOL.
		"Data: ".json_encode($data).PHP_EOL;
		write_log($log, "error", $conn->error);
		$data1["status"] = 204;
		header(' ', true, 204);
	}

	echo json_encode($data1);
}

if($action == "getAllClientsByType"){
	$headers = apache_request_headers();
	authenticate($headers);
	$ctype=$_GET["ctype"];
	$sql = "SELECT * FROM `client_master` WHERE `ctype`=$ctype ORDER BY `name`";
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
			$tmp[$i]['clientid'] = $row['clientid'];
			$tmp[$i]['name'] = $row['name'];
			$tmp[$i]['address'] = $row['address'];
			$tmp[$i]['cno'] = $row['cno'];
			$tmp[$i]['cperson'] = $row['cperson'];
			$tmp[$i]['cno1'] = $row['cno1'];
			$tmp[$i]['addinfo'] = $row['addinfo'];
			$tmp[$i]['ctype'] = $row['ctype'];
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