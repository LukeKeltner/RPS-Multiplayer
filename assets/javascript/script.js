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

var numberOfPlayers = 0;
var numberOfChats = 0;
var playerName = "";
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
var chats = database.ref('chat');
var players = database.ref('players');

connectedRef.on("value", function(snap) 
{
	if (snap.val())
	{
		var con = connectionsRef.push(true);
		con.onDisconnect().remove();
	}
});

connectionsRef.on("value", function(snap) 
{
	numberOfPlayers = snap.numChildren()
	console.log(numberOfPlayers)
});

chats.on('value', function(snap)
{
	numberOfChats = snap.numChildren();
})

players.on('value', function(snap)
{
	if (snap.numChildren() == 2)
	{
		$('#pick-name').hide();
		var player1Name = snap.val()[1].name;
		var player2Name = snap.val()[2].name;
		$('#player1-name').html(player1Name);
		$('#player2-name').html(player2Name);

		console.log(snap.val()[1].pick===undefined)

		console.log("Player 1 picked - "+snap.val()[1].pick)
	}
})


var player1LoggedIn = false;
var player2LoggedIn = false;
var playerNumber = 0;

database.ref('numOfPlayers').once('value', function(snapshot)
{
	//Player number is able to identify which player!!! (as long as no one disconnects...)
	playerNumber = numberOfPlayers;
	console.log("This is player "+playerNumber)

	database.ref('numOfPlayers').set(
	{
		amountOfPlayers: numberOfPlayers
	})
})

database.ref('chat').on('value', function(snapshot)
{
	$('#chat-window').empty()

	for (var i=0; i<numberOfChats; i++)
	{
		var message = snapshot.val()[i]
		var p = $('<p>')
		p.html(message)
		$('#chat-window').append(p)
		$('#message').val("")
		$('#chat-window').scrollTop($('#chat-window')[0].scrollHeight);
	}

})


var createMessage = function()
{
	var message = playerName+": "+$('#message').val().trim()
	database.ref('chat').child(numberOfChats).set(message)
}


$('#create-player').on('click', function(event)
{
	playerName = $('#name').val().trim()

	database.ref('players').child(playerNumber).set(
	{
		wins: 0,
		losses: 0,
		name: playerName
	})

	$('#chat').show()
	$('#pick-name').hide()

	if (playerNumber%2 ==1)
	{
		$('#1-window').hide()
		$('#choose-1').show()
		$('#player'+playerNumber+'-name-choose').html(playerName)
		$('#outcome').show()
		$('#2-window').show()
	}

	else if(playerNumber%2 ==0)
	{
		$('#2-window').hide()
		$('#choose-2').show()
		$('#player'+playerNumber+'-name-choose').html(playerName)
		$('#outcome').show()
		$('#1-window').show()
	}
})

$('#send-chat').on('click', function(event)
{
	createMessage()
})

$('#message').keyup(function(event)
{
	if (event.keyCode === 13)
	{
		createMessage()
	}
})

$('#rock1').on('click', function(event)
{
	players.child(1).update(
	{
		pick: 'rock'
	})
})