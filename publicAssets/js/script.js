let username;
let chatname;
function redirect(path) {
  window.location.href = path;
}
function getname() {
  username = document.getElementById("clientname").value;
  if (username != "") {
    document.getElementById("namecontA").style.display = "none";
    document.getElementById("chatnameA").style.display = "flex";
  } else {
    alert("Enter name");
  }
}
function getchatname() {
  chatname = document.getElementById("clientname").value;
  if (chatname != "") {
    redirect("../chat/");
  } else {
    alert("Enter chatname");
  }
}
function getname_a() {
  username = document.getElementById("adminname").value;
  if (username != "") {
    document.getElementById("namecontA").style.display = "none";
    document.getElementById("chatnameA").style.display = "flex";
  } else {
    alert("Enter name");
  }
}
function y() {
  show_menu();
  document.getElementById("m2").classList.toggle("new2");
  document.getElementById("m1").classList.toggle("new1");
  document.getElementById("m3").classList.toggle("new3");
}
function show_menu() {
  document.getElementById("mainmenu").classList.toggle("mainmenunew");
}
