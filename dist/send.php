<?php

	// if(isset($_GET) && !empty($_GET['param1']) {

	    // Открыть файл
	    $f = fopen("products.json", "a");

	    ftruncate ($f,0);

	    // Записать текст
	    fwrite($f, $_GET['data']); 

	    // Закрыть текстовый файл
	    fclose($f);

	    die();
	// }

?>