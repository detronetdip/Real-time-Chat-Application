let username;
let chatname;
let admin;
let code;
let leet = 1;
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
  chatname = document.getElementById("codechat").value;
  jQuery("#t").html("wait...");
  if (chatname != "") {
    $.ajax({
      type: "POST",
      url: "../publicAssets/database/clientjoin.php",
      data: "username=" + username + "&chatname=" + chatname,
      success: function (html) {
        if (html == "1") {
          alert("Name exist in the chat.");
        } else if (html == "2") {
          redirect(
            "../chat/index.php?&name=" +
              username +
              "&code=" +
              chatname +
              "&ghtu=client"
          );
        } else if (html == "3") {
          alert("can't join right now");
          jQuery("#t").html("wait...");
        } else if (html == "0") {
          alert("Invalid chat code");
          redirect(window.location);
        }
      },
    });
  } else {
    alert("Enter chatname");
    jQuery("#t").html("Nextll");
  }
}
function getname_a() {
  username = document.getElementById("adminname").value;
  jQuery("#statc").html("wait...");
  if (username != "") {
    $.ajax({
      type: "POST",
      url: "../publicAssets/database/generatecoe.php",
      data: "username=" + username + "&admin=" + admin,
      success: function (html) {
        if (html != 9) {
          code = html;
          jQuery("#ctid").html(html);
          document.getElementById("namecontA").style.display = "none";
          document.getElementById("chatnameA").style.display = "flex";
        } else {
          alert("Name Exist");
          jQuery("#statc").html("Next");
        }
      },
    });
  } else {
    alert("Enter name");
    jQuery("#statc").html("Next");
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
function getname_ad() {
  admin = document.getElementById("adminnamee").value;
  if (admin != "") {
    document.getElementById("chatnameu").style.display = "none";
    document.getElementById("namecontA").style.display = "flex";
  } else {
    alert("Enter name");
  }
}
function gotochat() {
  redirect(
    "../chat/index.php?&name=" + admin + "&code=" + code + "&ghtu=admin"
  );
}
function leave() {
  username = 1;
  $.ajax({
    type: "POST",
    url: "../publicAssets/database/leave.php",
    data: "username=" + username,
    success: function (html) {
      if (html == "ok") {
        redirect("../");
      } else {
        alert("Can't leave at this moment");
      }
    },
  });
}
function der() {
  username = 1;
  document.getElementById("ctcnt").style.display = "none";
  $.ajax({
    type: "POST",
    url: "../publicAssets/database/close.php",
    data: "username=" + username,
    success: function (html) {
      if (html == "ok") {
        redirect("../");
      } else {
        alert("Can't close at this moment");
      }
    },
  });
}
function fetch(a, b, c) {
  $.ajax({
    type: "POST",
    url: "../publicAssets/database/fetch/fetch.php",
    data: "tname=" + a + "&name=" + b + "&code=" + c,
    success: function (html) {
      if (html != "") {
        jQuery("#msgarea").html(html);
        fetch(a, b, c);
      } else {
        alert("Chat has been closed by admin");
        redirect("../");
      }
    },
  });
}
function scroll() {
  if (leet == 1) {
    document.getElementById("msgarea").scrollTop = document.getElementById(
      "msgarea"
    ).scrollHeight;
    console.log("scroll called");
  }
}
scroll();
setInterval(() => {
  scroll();
}, 100);
let area = document.querySelector("#msgarea");
var scrollPos = area.scrollTop;
area.addEventListener("scroll", function () {
  if (area.scrollTop > scrollPos) {
    leet = 1;
    console.log("up");
  } else {
    leet = 0;
    console.log("down");
  }
  scrollPos = area.scrollTop;
});
function msgsent(a, b) {
  let mesage;
  mesage = jQuery("#textmessage").val();
  if (mesage == "") {
    alert("Enter Message");
  } else {
    let message;
    message = mesage.replace(/'/gi, "-sct-");
    message.replace;
    jQuery("#textmessage").val("");
    $.ajax({
      type: "POST",
      url: "../publicAssets/database/insert.php",
      data: "tname=" + a + "&name=" + b + "&message=" + message,
      success: function (html) {
        if (html == "1") {
          console.log("dd");
        } else {
          alert("Something went wrong");
        }
      },
    });
  }
}
