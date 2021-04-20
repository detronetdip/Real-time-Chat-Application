<?php
require('require/connection.php');
$name=$_POST['username'];
$admin=$_POST['admin'];
$role="admin";
function codegen($con,$name,$role,$admin){
    $code=chr(97+rand(1,25)).rand(11,99).chr(97+rand(1,25)).chr(97+rand(1,25)).rand(11,99).chr(97+rand(1,25));
    $r=mysqli_num_rows(mysqli_query($con,"select * from codetab where tname='$name' and code='$code'"));
    if($r>0){
        codegen();
    }else{
        $q="create table $name(id int auto_increment not null primary key,sender varchar(255) not null,message varchar(255) not null)";
        if(mysqli_query($con,$q)){
            $sndr="G-chat";
            $msg="Welcome to G-chat.\nThis message is system generated,do not worry.\n Happy chating";
            mysqli_query($con,"insert into $name(sender,message) values('$sndr','$msg')");
            mysqli_query($con,"insert into codetab(tname,code) values('$name','$code')");
            mysqli_query($con,"insert into chatp(code,user,role) values('$code','$admin','$role')");
            $_SESSION['CLIENT_NAME_A']=$admin;
            $_SESSION['CHAT_CODE_A']=$code;
            $_SESSION['DBNAME_A']=$name;
            echo $code;
        }else{
            echo 9;
        }
    }
}
codegen($con,$name,$role,$admin);
?>