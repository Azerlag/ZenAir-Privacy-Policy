<?php
	    
		$S2 =  $_POST['status'];
	    $myFile2 = "../txt/out-1.txt";
		$fh2 = fopen($myFile2, 'w') or die("can't open file");
		fwrite($fh2, $S2);
		fclose($fh2);
        echo $S2;
 
?>
