<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$arrayKeywords = $request->keywords;
$arrayMessages = $request->message;
$arrayCipher = array();
foreach( $arrayMessages as $rowMessage ){
	foreach( $arrayKeywords as $rowKeyword ){
		$pos = strpos($rowMessage, $rowKeyword);
		if( !$pos === false ){
			array_push($arrayCipher, $arrayMessages);
		}
	}
}

echo json_encode($arrayCipher);