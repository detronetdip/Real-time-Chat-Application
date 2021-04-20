<?php
require('require/connection.php');
$code=$_SESSION['CHAT_CODE_A'];
$dbname=$_SESSION['DBNAME_A'];
$q="delete from chatp where code='$code'";
if(mysqli_query($con,$q)){
    mysqli_query($con,"drop table $dbname");
    mysqli_query($con,"delete from codetab where code='$code'");
    echo "ok";
}else{
    echo "no";
}
?>