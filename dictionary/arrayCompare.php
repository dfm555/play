<?php
$file = file_get_contents('spanish.txt', true);

$algoArray = array();
$arrayKeywords = explode('<br />', nl2br($file));

foreach ($arrayKeywords as $value) {
	$data = eregi_replace("[\n|\r|\n\r]", '', trim($value));
	if( strlen($data) >=4 ){
		array_push($algoArray, $data );
	}
}

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$arrayMessages = $request->message;
$arrayCipher = array();
foreach( $arrayMessages as $rowMessage ){
	foreach( $algoArray as $rowKeyword ){
		$pos = strpos($rowMessage, $rowKeyword);
		if( !$pos === false ){
			array_push($arrayCipher, $arrayMessages);
		}
	}
}

echo json_encode($arrayCipher);