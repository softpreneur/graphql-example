<?php
session_start();
if(!isset($_SESSION['phone'])){
	echo '{"l":"Please re-login"}';
	exit;
}
include_once("queryExecutor.php");
$class = new DataBaseQuery();
if(isset($_POST['c_code']) && isset($_POST['topic']) && isset($_POST['intro']) && isset($_POST['summary'])){
	$c_code = clean($_POST['c_code']);
	$topic = clean($_POST['topic']);
	$intro = clean($_POST['intro']);
	$summary = $_POST['summary'];

	if($c_code == '' || $topic == '' || $intro == '' || $summary == ''){
		echo '{"f":"All fields are required"}';
		$class->disconnectDB();
		exit;
	}

	//Checking to see if course exist
	$check = $class->sQuery("SELECT id FROM summaries WHERE course_code=? AND DATE(date_created) = CURDATE()",[$c_code]);
	if(count($check) > 0){
		echo '{"f":"You have already created summary for this course today"}';
		$class->disconnectDB();
		exit();
	}
	
	//Creating the course for the first time
	$create = $class->udiQuery("INSERT INTO summaries(course_code,topic,introduction,content,department,faculty,date_created) VALUES(?,?,?,?,?,?,now())",[$c_code,$topic,$intro,$summary,$_SESSION['department'],$_SESSION['faculty']]);
	if($create === TRUE){
		echo '{"s":"Summary created successfully"}';
	} else{
		echo '{"f":"An error occured"}';
	}
	$class->disconnectDB();
	exit;

}