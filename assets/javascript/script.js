// Initialize Firebase
var config = 
{
	apiKey: "AIzaSyB7xlXzsrUn82_qTY3NBw9Tmtl03WlwJDA",
	authDomain: "rps-multiplayer-29b66.firebaseapp.com",
	databaseURL: "https://rps-multiplayer-29b66.firebaseio.com",
	projectId: "rps-multiplayer-29b66",
	storageBucket: "",
	messagingSenderId: "1087245710598"
};

firebase.initializeApp(config);
var database = firebase.database()


















var createMessage = function()
{
	var p = $('<p>')
	var message = $('#message').val().trim()
	p.html(message)
	$('#chat-window').append(p)
	$('#message').val("")
	$('#chat-window').scrollTop($('#chat-window')[0].scrollHeight);
}

function updateScroll(){
    var element = $('#chat-window');
    element.scrollBottom = element.scrollHeight;
}

$('#send-chat').on('click', function(event)
{
	createMessage()
	updateScroll()
})

$('#message').keyup(function(event)
{
	if (event.keyCode === 13)
	{
		createMessage()
	}
})