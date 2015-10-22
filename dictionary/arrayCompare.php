<?php
$arrayKeywords = $_POST['keywords'];
$arrayMessages = $_POST['messages'];
print_r($arrayKeywords);
$arrayCipher = array();
foreach( $arrayMessages as $rowMessage ){
	foreach( $arrayKeywords as $rowKeyword ){
		$pos = strpos($rowMessage, $rowKeyword);
		if( !$pos === false ){
			array_push($arrayCipher, $arrayMessages);
		}
	}
}

echo json_encode($arrayKeywords);