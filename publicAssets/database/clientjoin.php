<?php
require('require/connection.php');
$name=$_POST['username'];
$chatname=$_POST['chatname'];
$role="participant";
if(mysqli_num_rows(mysqli_query($con,"select * from codetab where code='$chatname'"))>0){
    $r=mysqli_num_rows(mysqli_query($con,"select * from chatp where user='$name' and code='$chatname'"));
    if($r>0){
        echo "1";
    }else{
        if(mysqli_query($con,"insert into chatp(code,user,role) values('$chatname','$name','$role')")){
            $rt=mysqli_fetch_assoc(mysqli_query($con,"select * from codetab where code='$chatname'"));
            $_SESSION['DBNAME']=$rt['tname'];
            $_SESSION['CLIENT_NAME']=$name;
            $_SESSION['CHAT_CODE']=$chatname;
            echo "2";
        }else{
            echo "3";
        }
    }
}else{
    echo "0";
}

?>