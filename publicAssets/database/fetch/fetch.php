<?php
require('../require/connection.php');
 $tname=$_POST['tname'];
 $name=$_POST['name'];
 $code=$_POST['code'];
 $temp='';
 $r=mysqli_num_rows(mysqli_query($con,"select * from codetab where tname='$tname' and code='$code'"));
 if($r>0){
 $res=mysqli_query($con,"select * from $tname");
 while($row=mysqli_fetch_assoc($res)){
     $sender=$row['sender'];
     $meage=$row['message'];
     $message=str_replace("-sct-","'",$meage);
     if($sender==$name){
         $cls="outgoing";
     }else{
        $cls="incoming";
     }
     $temp=$temp."
     <div class='messsage $cls'>
      <h4 >$sender</h4>
      <p>$message</p>
      </div>
     ";
 }
 echo $temp;
}else{
 echo $temp;
}

?>