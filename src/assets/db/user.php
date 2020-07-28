<?php
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Headers: Authorization, X-Requested-With, Content-Type, Accept');

// This is a test comment
include 'conn.php';
include 'jwt_helper.php';
$action = $_GET['action'];

if($action == "checkLogin"){
    date_default_timezone_set("Asia/Calcutta");
    $data = json_decode(file_get_contents("php://input"));
	$username = $data->username;
	$passwd = md5($data->passwd);
	$sql = "select * from `user_master` where username='$username' AND password='$passwd'";
	$result = $conn->query($sql);
	$row = $result->fetch_array();
	$tmp = array();
	$datares = array();
	$token = array();
	$d1 = new Datetime();
	$token['username'] = $username.$d1->format('U')*1000;
	if(count($row)>0){
        $tmp[0]['userid'] = $row['userid'];
        $tmp[0]['fullname'] = $row['fullname'];
		$d1 = new Datetime();
		$tmp[0]['sessiontime'] = $d1->format('U')*1000;
		$tmp[0]['token'] = JWT::encode($token, 'milkman');
        $datares["status"] = 200;
		$datares["data"] = $tmp;
		$log  = "File: user.php - Method: ".$action.PHP_EOL.
		"Logged In User: ".$data->username.PHP_EOL;
		write_log($log, "success", NULL);
		header(' ', true, 200);
    }
    else{
        $datares["status"] = 204;
		$log  = "File: user.php - Method: ".$action.PHP_EOL.
		"Error message: "."Un-Authorised Login".PHP_EOL;
		write_log($log, "error", "Un-Authorised");
		header(' ', true, 204);
    }
    echo json_encode($datares);
}

?>