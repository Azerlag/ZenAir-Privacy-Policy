<?php 
  $myFile = "../txt/in-2.txt";
  $fh = fopen($myFile, 'r');
  $theData = fread($fh, filesize($myFile));
  fclose($fh);
  echo $theData;
?>
