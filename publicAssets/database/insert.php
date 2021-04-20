<?php
require('require/connection.php');
$table=$_POST['tname'];
$sender=$_POST['name'];
$msg=$_POST['message'];
$qi="insert into $table(sender,message) values('$sender','$msg')";
if(mysqli_query($con,$qi)){
    echo "1";
}else{
    echo $qi;
}
?>