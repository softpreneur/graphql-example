<?php
include_once("queryExecutor.php");
$class = new DataBaseQuery();

if(isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email'])){
	$name =  clean($_POST['name']);
	$phone = clean($_POST['phone']);
	$email = clean($_POST['email']);
	$institute = clean($_POST['institute']);
	$faculty = clean($_POST['faculty']);
	$depart = clean($_POST['department']);
	$course = clean($_POST['course']);
	$favCourses = clean($_POST['favCourses']);

	if($name == '' || $phone == '' || $email == '' || $faculty == '' || $depart == '' || $course == '' || $favCourses == ''){
		echo '{"f":"All fields are required"}';
		$class->disconnectDB();
		exit;
	}
	
	$device = clean($_POST['device']);
	$n = explode(' ', $name);
	$fn = $n[0];
	$check = $class->sQuery("SElECT id FROM sumaryzers WHERE phone=? OR email=?",[$phone,$email]);
	if(count($check) >= 1){
		echo '{"f":"You have already created account, thank you '.$fn.'!"}';
		$class->disconnectDB();
		exit;
	}
	
	//$createSubscription = $class->udiQuery("INSERT INTO sumaryzers (name,phone,faculty,department,course,device,fav_courses) VALUES(?,?,?,?,?,?,?)",[$name,$phone,$faculty,$depart,$course,$device,$favCourses]);
	$createSubscription = $class->udiQuery("INSERT INTO sumaryzers (name,phone,password,email,institute,faculty,department,course,device,fav_courses,date) VALUES(?,?,?,?,?,?,?,?,?,?,now())",[$name,$phone,'sumaryzer',$email,$institute,$faculty,$depart,$course,$device,$favCourses]);
	if($createSubscription === TRUE){
		echo '{"s":"Thank you '.$fn.', you\'ll get an sms from us soon!"}';
	} else{
		echo '{"f":"Whoops.. something is not right! Try again"}';
	}
	$class->disconnectDB();
	exit;

}