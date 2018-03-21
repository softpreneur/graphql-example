<?php
include_once("queryExecutor.php");
$class = new DataBaseQuery();

if(isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email'])){
	$name =  clean($_POST['name']);
	$phone = clean($_POST['phone']);
	$email = clean($_POST['email']);
	
	if($name == '' || $phone == '' || $email == ''){
		echo '{"f":"All fields are required"}';
		$class->disconnectDB();
		exit;
	}
	
	$n = explode(' ', $name);
	$fn = $n[0];
	$check = $class->sQuery("SElECT id FROM subscribers WHERE phone=? OR email=?",[$phone,$email]);
	if(count($check) >= 1){
		echo '{"f":"You have already subscribed account, thank you '.$fn.'!"}';
		$class->disconnectDB();
		exit;
	}
	
	$createSubscription = $class->udiQuery("INSERT INTO subscribers (name,phone,email,date) VALUES(?,?,?,now())",[$name,$phone,$email]);
	if($createSubscription === TRUE){
		echo '{"s":"Details saved, thank you '.$fn.'"}';
	} else{
		echo '{"f":"Whoops.. something is not right. Try again"}';
	}
	$class->disconnectDB();
	exit;
	
}