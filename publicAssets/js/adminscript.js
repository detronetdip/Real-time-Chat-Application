
let username;
let code;
let input=document.getElementById('msgsenta');
let messageArea= document.querySelector('#areaa');
input.addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        let message=e.target.value;
        input.value='';
        appendMessage(message,username,'outgoing');
    }
});
function takenameAdmin(){
    username=jQuery("#chatnamea").val();
    if(username!=''){
       jQuery("#chatnamebtna").html('wait...');
       $.ajax({
        type: "POST",
        url: "publicAssets/database/generatecoe.php",
        data: "username=" + username,
        success: function (html) {
            alert(html)
           // jQuery(".msgarea").html(html)
        },
      });
       document.getElementById('nameboxa').style.display="none";
       document.getElementById('codeboxa').style.display="initial";
    }else{
       alert("Enter name")
    }
}
function appendMessage(msg,sender,type){
    let main= document.createElement('div');
    main.classList.add(type,'message')
    let markup=`
        <h6>${sender}</h6>
        <p>${msg}</p>
    `;
    main.innerHTML=markup;
    messageArea.appendChild(main);
    scroll()
}

function scroll(){
    messageArea.scrollTop=messageArea.scrollHeight;
}
function join_chatadmin(){
    code=jQuery("#chatcodea").html();
    if(code!=''){
        alert(code);
        jQuery("#chatcodebtna").html('Joining...');
        document.getElementById('entercodea').style.display="none";
    }else{
        alert("something went wrong")
    }
    document.getElementById('chatcontainera').style.display="grid";
}