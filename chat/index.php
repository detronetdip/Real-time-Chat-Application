<?php
require('../publicAssets/database/require/connection.php');
if(isset($_GET['name']) && isset($_GET['code']) && isset($_GET['ghtu'])){
  $name=$_GET['name'];
  $code=$_GET['code']; 
  $who=$_GET['ghtu'];
  if($who=="admin"){
    $sn=$_SESSION['CLIENT_NAME_A'];
    $sc=$_SESSION['CHAT_CODE_A'];
  }else{
    $sn=$_SESSION['CLIENT_NAME'];
    $sc=$_SESSION['CHAT_CODE'];
  }
if($sn==$name && $sc==$code){
$q="select * from chatp where user='$name' and code='$code'";
$res=mysqli_query($con,$q);
$row=mysqli_fetch_assoc($res);
$role=$row['role'];
$tcode=$row['code'];
$rw=mysqli_fetch_assoc(mysqli_query($con,"select * from codetab where code='$tcode'"));
$tname=$rw['tname'];
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>G-chAt</title>
    <link rel="stylesheet" href="../publicAssets/css/style.css" />
    <link rel="apple-touch-icon" sizes="180x180" href="../publicAssets/images/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="../publicAssets/images/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="../publicAssets/images/favicon-16x16.png" />
    <link rel="manifest" href="../publicAssets/images/site.webmanifest" />
  </head>
  <body>
    <div class="chatground">
      <div class="chatcontainer" id="ctcnt">
        <div class="header">
          <h1>G-chAt</h1>
          <div class="menu" id="menu" onclick="y()">
            <span id="m1"></span>
            <span id="m2"></span>
            <span id="m3"></span>
          </div>
        </div>
        <div class="mainmenu" id="mainmenu">
          
<?php 
 $tmp="<h1>$tname</h1>
 <h3>$code</h3>";
 echo $tmp;
        if($role=='admin'){
            $button="<button class='close' onclick='der()'>Close</button>";
        }else{
            $button="
            <button class='leave' onclick='leave()'>Leave</button>";
        }
        echo $button;
?>
        </div>
        <div class="messagearea" id="msgarea">
         
        </div>
        <div class="type" id="typearea"> 
          <input type="text" placeholder="Enter Message.." id="textmessage" autofocus/>
          <button onclick="msgsent('<?php echo $tname; ?>','<?php echo $name; ?>')">Sent</button>
        </div>
      </div>
    </div>
    <script src="../publicAssets/js/jquery-3.2.1.min.js"></script>
    <script src="../publicAssets/js/script.js"></script>
    <script>
      fetch('<?php echo $tname; ?>','<?php echo $name; ?>','<?php echo $code; ?>');
    </script>
  </body>
</html>
<?php
}
else{
  ?>
  <script>
    window.location.href="../";
  </script>
  <?php
}
}else{
  ?>
  <script>
    window.location.href="../";
  </script>
  <?php
}
?>