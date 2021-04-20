<?php
require('require/connection.php');
$name=$_SESSION['CLIENT_NAME'];
$chatname=$_SESSION['CHAT_CODE'];
$q="delete from chatp where code='$chatname' and user='$name'";
if(mysqli_query($con,$q)){
    unset($_SESSION['CLIENT_NAME']);
    unset($_SESSION['CHAT_CODE']);
    unset($_SESSION['DBNAME']);
    echo "ok";
}else{
    echo "no";
}
?>