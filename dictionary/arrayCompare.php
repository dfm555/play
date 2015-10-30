<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$file = file_get_contents('spanish.txt', true);

$algoArray = array();
$arrayKeywords = explode('<br />', nl2br($file));

foreach ($arrayKeywords as $value) {
	$data = preg_replace("[\n|\r|\n\r]", '', trim($value));
	if( strlen($data) >=4 ){
		array_push($algoArray, strtoupper($data) );
	}
}
$implode = implode('|',$algoArray);
//if(ereg("($implode)","ESTAESUNAPRUEBA",$matches)){
//	print_r('SI LEI OMBE');
//	print_r($matches);
//}else{
//	print_r('no lei una mierda');
//}
//die();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$arrayMessages = $request->message;
$arrayCipher = array();
foreach( $arrayMessages as $rowMessage ){
//	foreach( $algoArray as $rowKeyword ){
//		$pos = strpos($rowMessage, $rowKeyword);
//		if( !$pos === false ){
//			array_push($arrayCipher, $arrayMessages);
//		}
		if( ereg("($implode)",$rowMessage) ){
			array_push($arrayCipher, $rowMessage);
		}
//	}
}

echo json_encode($arrayCipher);