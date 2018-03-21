<?php
session_start();
include_once("queryExecutor.php");
$class = new DataBaseQuery();

if(isset($_POST['phone']) && isset($_POST['password'])){
	$phone = clean($_POST['phone']);
	$pass = clean($_POST['password']);
	
	if($phone == '' || $pass == ''){
		echo '{"f":"phone number and password you use to signup are required"}';
		$class->disconnectDB();
		exit;
	}
	
	$user = $class->sQuery("SELECT id,password,department,faculty FROM sumaryzers WHERE phone=?",[$phone]);
	if(count($user) > 0){
		foreach($user as $u){
			$id = $u['id'];
			$department = $u['department'];
			$id = $u['id'];
			$faculty = $u['faculty'];
			$pswd = $u['password'];
		}
		
		//Checking password
		if($pass == $pswd && $pass != 'sumaryzer'){
			echo '{"s":"success"}';
		} else if($pass == $pswd && $pass == 'sumaryzer'){
			echo '{"c":"Change password"}';
		} else{
			echo '{"f":"Invalid password"}';
			exit;
		}
		$_SESSION['phone'] = $phone;
		$_SESSION['department'] = $department;
		$_SESSION['faculty'] = $faculty;
	} else{
		echo '{"f":"Kindly signup as summaryzer, and we\'ll get back to your"}';
	}
	
	$class->disconnectDB();
	exit;
	
}