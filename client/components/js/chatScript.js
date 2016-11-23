var socket = io();
var objUser = {};


function setUserChat() {

    var typeUser = 1;

    objUser.guidUser = guid();
    //objUser.guidUser = 'usrid1';
    objUser.type = typeUser;
    objUser.name = document.getElementById('hdnNickName').value;
    //objUser.guidAdmin = objAdmin[0].guidAdmin;
    objUser.guidAdmin = 'admid1'
    objUser.message = '';
   
    socket.emit('set user', objUser);

}


function starListenUser() {

    //var socket = io();

    socket.on(objUser.guidUser, function(msg) {

        var fechaHoy = formatDate();
        var divMsg = "<div class='right'><div class='author-name'>" + msg.name + "<small class='chat-date'> " + fechaHoy + " </small></div><div class='chat-message active'>" + msg.message + "</div></div>";
        $('#chatContent').append(divMsg);

        var objDiv = document.getElementById("chatContent");
        objDiv.scrollTop = objDiv.scrollHeight;

    });

}

function userSubmit() {


    var fechaHoy = formatDate();

    var txtMsg = document.getElementById('txtMessage');
    objUser.message = txtMsg.value;
    var divMsg = "<div class='left'><div class='author-name'>" + objUser.name + "<small class='chat-date'> " + fechaHoy + " </small></div><div class='chat-message'>" + objUser.message + "</div></div>"
    $('#chatContent').append(divMsg);

    socket.emit('response channel', objUser);
    txtMsg.value = "";
    var objDiv = document.getElementById("chatContent");
    objDiv.scrollTop = objDiv.scrollHeight;



}









///////objAdmin

var currentChatingUser = '';

function setCurrentUser(control) {

    currentChatingUser = control.getAttribute('value');

}


var objAdmin = {};

function setAdminChat() {

    var typeAdmin = 0;


    //objAdmin.guidAdmin = guid();
    objAdmin.guidAdmin = 'admid1';
    objAdmin.type = typeAdmin;
    objAdmin.name = "Admin";
    objAdmin.guidUser = "";
    objAdmin.message = "";


    //var socket = io();
    socket.emit('set admin', objAdmin);
}

var onlineUsers = [];


function starListenAdmin() {

    socket.on("refreshUSer", function(returnedUser) {

        if (!findUser(returnedUser.guidUser)) {
            addUser(returnedUser);
            onlineUsers.push(returnedUser);
        }
    });



    socket.on(objAdmin.guidAdmin, function(msg) {
    	var fechaHoy = formatDate();
        var usrMessagesList = '#message-' + msg.guidUser;
        var divMsg = "<div class='right'><div class='author-name'>" + msg.name + "<small class='chat-date'> " + fechaHoy + " </small></div><div class='chat-message active'>" + msg.message + "</div></div>";
        $(usrMessagesList).append(divMsg);
    });

}


function findUser(incomingUser) {
    var exist = false;

    for (var i = 0; i < onlineUsers.length; i++) {
        if (onlineUsers[i].guidUser == incomingUser) {
            exist = true;
            break;
        }
    }

    return exist;
}


function addUser(user) {




    $('#mnuConnectedUsers').append('<li role="presentation"><a value="' + user.guidUser + '" href="#' + user.guidUser + '" role="tab" data-toggle="tab" onclick="return setCurrentUser(this)">' + user.name + '</a></li>');
    $('#pnlConnectedUsers').append('<div role="tabpanel" class="tab-pane" id="' + user.guidUser + '"><div class="admcontent" id="message-' + user.guidUser + '"></div></div>');

    /*
        for (var i = 0; i < data.length; i++) {

            $('#mnuConnectedUsers').append('<li role="presentation"><a value="' + data[i].guidUser + '" href="#' + data[i].guidUser + '" role="tab" data-toggle="tab" onclick="return setCurrentUser(this)">' + data[i].name + '</a></li>');
            $('#pnlConnectedUsers').append('<div role="tabpanel" class="tab-pane" id="' + data[i].guidUser + '"><ul id="message-' + data[i].guidUser + '"></ul></div>');
        }*/
}


function adminSubmit() {

	var fechaHoy = formatDate();
    var txtMsg = document.getElementById('txtMessage');
    objAdmin.message = txtMsg.value;
    objAdmin.guidUser = currentChatingUser;
    var usrMessagesList = '#message-' + objAdmin.guidUser;
    var divMsg = "<div class='left'><div class='author-name'>" + objAdmin.name + "<small class='chat-date'> " + fechaHoy + " </small></div><div class='chat-message'>" + objAdmin.message + "</div></div>";
    $(usrMessagesList).append(divMsg);
    socket.emit('response channel', objAdmin);
    txtMsg.value = "";
}


//commond

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};


function formatDate() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}


var chatIsActive = false;
var isUserSet = false;
var isAdminSet = false;

function showHideChat() {


    if (!isUserSet) {
        setUserChat();
        starListenUser();
        isUserSet = true;
    }


    if (chatIsActive) {
        $("#chatWindow").removeClass("active");
        chatIsActive = false;

    } else {
        $("#chatWindow").addClass("active");
        chatIsActive = true;
    }
}


function initAdmin() {

    if (!isAdminSet) {
        setAdminChat();
        starListenAdmin();
        isAdminSet = true;
    }
}
