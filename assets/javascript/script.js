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


var player1Name = 'Player 1'
var player2Name = 'Player 2'
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
	console.log("-------------------------")
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
/*database.ref('/1').on('value', function(snapshot)
{

	if(snapshot.child('name').exists())
	{
		player1Name = snapshot.val().name
		database.ref('1').set(
		{
			name: player1Name
		})

		$('#player1-name').html(player1Name)
		$('#1-window').css("background-color", 'green')
	}

	else
	{
		$('#player1-name').html(player1Name)
	}
})

database.ref('/2').on('value', function(snapshot)
{

	if(snapshot.child('name').exists())
	{
		player2Name = snapshot.val().name
		database.ref('2').set(
		{
			name: player2Name
		})

		$('#player2-name').html(player2Name)
	}

	else
	{
		$('#player2-name').html(player2Name)
	}
})
*/

var createMessage = function()
{
	var message = playerName+": "+$('#message').val().trim()

	database.ref('chat').child(numberOfChats).set(message)



	// Write and then read back a string from the Database.
/*	database.ref('chat').child(numberOfChats).set({message: message})
	  .then(function() {
	    return database.ref('chat').child(numberOfChats).once("value");
	  })
	  .then(function(snapshot) {
	    var data = snapshot.val();
	    console.log(data) // data === "hello"
	  });*/
/*	var p = $('<p>')
	p.html(message)
	$('#chat-window').append(p)
	$('#message').val("")
	$('#chat-window').scrollTop($('#chat-window')[0].scrollHeight);*/

}

/*$('#create-player').on('click', function(event)
{
	var playerName = $('#name').val().trim()

	if (!player1LoggedIn)
	{
		database.ref('/1').set(
		{
			name: playerName,
			wins: 0,
			losses: 0,
			choice: ""
		})

		player1LoggedIn = true;
	}

})*/

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
	$('#'+playerNumber+'-window').show()
	$('#player'+playerNumber+'-name').html(playerName)

	if (playerNumber%2 ==0)
	{
		console.log('You are player 2!')
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