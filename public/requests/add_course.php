<?php
session_start();
if(!isset($_SESSION['phone'])){
	echo '{"l":"Please re-login"}';
	exit;
}
include_once("queryExecutor.php");
$class = new DataBaseQuery();
if(isset($_POST['c_code']) && isset($_POST['c_title']) && isset($_POST['faculty']) && isset($_POST['department']) && isset($_POST['description'])){
	$c_code = clean($_POST['c_code']);
	$c_title = clean($_POST['c_title']);
	$faculty = clean($_POST['faculty']);
	$department = clean($_POST['department']);
	$description = clean($_POST['description']);

	if($c_code == '' || $c_title == '' || $faculty == '' || $department == '' || $description == ''){
		echo '{"f":"All fields are required"}';
		$class->disconnectDB();
		exit;
	}

	//Checking to see if course exist
	$check = $class->sQuery("SELECT id FROM courses WHERE course_code=? AND status=?",[$c_code,'Yes']);
	if(count($check) === 1){
		$create = $class->udiQuery("INSERT INTO courses(admin,course_code,course_title,department,faculty,description,status,date_added) VALUES(?,?,?,?,?,?,?,now())",[$_SESSION['phone'],$c_code,$c_title,$department,$faculty,$description,'No']);
		if($create === TRUE){
			echo '{"created":"Sorry, another student is already summarizing this course"}';
			$class->disconnectDB();
			exit;
		} 
	}
	
	//Checking to see if user has more than  5 courses
	$noCourse = $class->sQuery("SELECT id FROM courses WHERE admin=? AND status=?",[$_SESSION['phone'],'Yes']);
	if(count($noCourse ) >= 5){
	    echo '{"f":"You can summaries maximum of 5 courses only. If you would love to summarize more call 09057620690"}';
	    $class->disconnectDB();
	    exit;
	}
	
	//Creating the course for the first time
	$create = $class->udiQuery("INSERT INTO courses(admin,course_code,course_title,department,faculty,description,status,date_added) VALUES(?,?,?,?,?,?,?,now())",[$_SESSION['phone'],$c_code,$c_title,$department,$faculty,$description,'Yes']);
	if($create === TRUE){
		echo '{"s":"Course created successfully"}';
	} else{
		echo '{"f":"An error occured"}';
	}
	$class->disconnectDB();
	exit;

}