<?php
session_start();
include_once("queryExecutor.php");
$class = new DataBaseQuery();

if(isset($_POST['pass1']) && isset($_POST['pass2'])){
	$pass1 = clean($_POST['pass1']);
	$pass2 = clean($_POST['pass2']);
	
	if($pass1 == '' || $pass2 == ''){
		echo '{"f":"Please enter password"}';
		$class->disconnectDB();
		exit;
	} else if($pass1 != $pass2){
		echo '{"f":"Password does not match"}';
		$class->disconnectDB();
		exit;
	}
	$upass = $class->udiQuery("UPDATE sumaryzers SET password=? WHERE phone=?",[$pass1, $_SESSION['phone']]);
	if($upass === TRUE){
		echo '{"s":"Success"}';
	} else{
		echo '{"f":"Failed"}';
	}
	
	$class->disconnectDB();
	exit;
}