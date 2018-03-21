<?php
session_start();
if(!isset($_SESSION['phone'])){
	echo '{"l":"Please re-login"}';
	exit;
}
include_once("queryExecutor.php");
$class = new DataBaseQuery();

if(isset($_POST['getCourses'])){
	//Checking to see if course exist
	$courses = $class->sQuery("SELECT * FROM courses WHERE status=?",['Yes']);
	if(count($courses) > 0){
		echo json_encode($courses);
	} else{
		echo '{"f":"Click on Add, to create the courses you would love to summarize"}';
	}
	$class->disconnectDB();
	exit;

}