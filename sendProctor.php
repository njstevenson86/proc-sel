<?php

$emailTo = "XXX@XXX.XXX";
$nacsId = $_POST["nacs"];
$firstName = $_POST["vSfirstName"];
$lastName = $_POST["vSlastName"];
$courseName = $_POST["vCourseName"];
$typeExam = $_POST["vTypeExam"];
$sdaytimePhone = $_POST["vSdaytimePhone"];
$testingCenter = $_POST["vTestingCenter"];
$procId = $_POST["vProcId"];
$contactName = $_POST["vContactName"];
$pStreetAddress = $_POST["vPstreetAddress"];
$examDateTime = $_POST["vExamDateTime"];
$city = $_POST["vPcity"];
$state = $_POST["vPstate"];
$zip = $_POST["vPzip"];
$pPhoneNum = $_POST["vPphoneNum"];
$pEmailAddress = $_POST["vPemailAddress"];
//$dateSigned = $_POST["vSigningDate"];
$studentEmailaddress = $_POST["vSemailAddress"];
$subject = "Exam Notification & Proctor Selector Form";
$formDate = "March 2016";

if( !empty( $_POST ) ) {
	$body = "NACS ID:	" .$nacsId . "\n\n";
	$body .= "Last name:  " . $lastName . "\n\n";
	$body .= "First name:  " . $firstName . "\n\n";
	$body .= "Course name:  " . $courseName . "\n\n";
	$body .= "Testing center/Proctor:  " . $testingCenter . " ID: " . $procId . "\n\n";
	$body .= "Exam Date & Time: " . $examDateTime . "\n\n";
	$body .= "Contact Name:  " . $contactName . "\n\n";
	$body .= "Type of Exam:  " . $typeExam . "\n\n";
	$body .= "Address:  " . $pStreetAddress . "\n\n";
	$body .= "City:  " . $city . "\n\n";
	$body .= "State:  " . $state . "\n\n";
	$body .= "Zip:  " . $zip . "\n\n";
	$body .= "Phone:  " . $pPhoneNum . "\n\n";
	$body .= "Email Address:  " . $pEmailAddress . "\n\n\n";
	$body .= "Form Date: " . $formDate . "\n\n";
	$header = "From:  " . $studentEmailaddress . "\nReply-To: " . $studentEmailaddress. "\n\n";
	
	if( mail( $emailTo, $subject, $body, $header ) ) {
		echo( "result=Successful" );
		
	} else {
		echo( "result=Unsuccessful" );
	}
}
mail( $studentEmailaddress, "Your Proctor information has been received", "We have received your Proctor information. Please contact XXX@XXX.XXX with any questions you may have.\n\n We appreciate your participation in the program.\n\nThe National Alliance Online Team", "From: onlineclassroom@scic.com");
?>
