/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function Card( argNumber, argSuit, argNumberInDeck ) {
    var numberInDeck = argNumberInDeck;
    var number = argNumber;
    var suit = argSuit;      // 1="Spades" 2="Hearts" 4="Clubs" 3="Diamonds"
    this.getSuit = function(){
        return suit;
    };
    this.getNumber = function(){
        return number;
    };
    this.getValue = function(){
        if(number == 1){
            return 11;
        }else{
            if(number>9){
                return 10;
            }else{
                return number;
            }
        }
    };
}

function Player( cash ) {
	this.cash = cash;
	this.inGame = true;
	this.updateCash = function ( playerNumber ) {
		//alert("player" + playerNumber + " cash");
		if(playerNumber >0 && playerNumber <10){
			document.getElementById("player" + playerNumber + " cash").innerHTML = this.cash*1;
			document.getElementById("player" + playerNumber + " bid").innerHTML = this.bid*1;
		}else{
			alert("Error");
			alert("player" + playerNumber + " cash");
		}
		
	};
	this.bidOnPlayer = function ( cashToBid, playerNumber ) {
		this.bid = cashToBid;
		this.cash += -this.bid*1;
		this.updateCash( playerNumber );
	};
	this.win = function (playerNumber) {
		document.getElementById("player" + playerNumber + " hand").innerHTML += "Win";
		this.inGame = false;
		this.cash += this.bid*2;
		this.updateCash( playerNumber );
		this.bid = 0;
	};
	this.loose = function (playerNumber) {
		document.getElementById("player" + playerNumber + " hand").innerHTML += "Lost";
		this.inGame = false;
		this.bid = 0;
		this.updateCash( playerNumber );
	};
	this.tie = function (playerNumber) {              // tie fail
		document.getElementById("player" + playerNumber + " hand").innerHTML += "Tie";
		this.inGame = false;
		this.cash = Number(this.cash) + Number(this.bid);
		this.bid = 0;
		this.updateCash( playerNumber );
	};
	this.getTotalValue = function () {
        var total = 0;
		for( var a=0; a<this.hand.length; a++ ){
			 total += deck[this.hand[a]].getValue();
		}
		return total;
	};
	this.hand = [];
	this.addToHand = function( card ){
		this.hand[this.hand.length] = card;
	};
	this.showHand = function(playerNumber){
		var letter = deck[this.hand[this.hand.length-1]].getSuit();
		switch (deck[this.hand[this.hand.length-1]].getSuit()){
			case 1: letter="c"; break;
			case 2: letter="d"; break;
			case 3:	letter="s"; break;
			case 4:	letter="h"; break;
		}
		document.getElementById("player" + playerNumber + " hand").innerHTML += "<img src=\"cards/"+letter+deck[this.hand[this.hand.length-1]].getNumber()+".gif\"alt=\"card\" />";
	};
	this.reset = function(playerNumber){
		document.getElementById("player" + playerNumber + " hand").innerHTML = "";
		this.hand = [];
		this.inGame = true;
	};
}

var evaluate = function(){  //moves for dealer and gives out or takes money from player 
	document.getElementById("hit").disabled=true;
	document.getElementById("stand").disabled=true;
	var a = 0;
	do{
		var x=Math.floor((Math.random()*(inDeck.length-1)));
		players[a].addToHand( inDeck[x] );
		inDeck.splice(x, 1);
		players[a].showHand(a);
	}while(players[0].getTotalValue() < 14);
	
	for( var b = 1; b < players.length; b++){	// a==1 because a=0 is dealer
		 getElementById("player" + b + " bid").disabled = false;
 if( players[0].getTotalValue() > 21 ){
			players[b].win(b);
		}else{
			if( players[b].getTotalValue() > 21 || players[b].getTotalValue() < players[0].getTotalValue()){
				players[b].loose(b);
			}else{
				if( players[b].getTotalValue() == 21 || players[b].getTotalValue() > players[0].getTotalValue() ){
					players[b].win(b);
				}else{
					if( players[b].getTotalValue() == playeotalValue() ){
						players[b].tie(b);
					}
				}
			}
		}
	}
	document.getElementById("deal").disabled=false;
}


function nextTurn(){
	turn++;
	var a = turn;	
	if( turn == players.length ){
		evaluate();
	}
}

var turn = 1;
function hit(){
	var a = turn;
	var x=Math.floor((Math.random()*(inDeck.length-1)));
	players[a].addToHand( inDeck[x] );
	inDeck.splice(x, 1);
	players[a].showHand(a);
	players[a].moves++;
	
	if( players[a].getTotalValue() > 21){
		//players[a].loose(a);
		nextTurn();
	}
}

function stand(){
	var a = turn;
	var x=Math.floor((Math.random()*(inDeck.length-1)));
	
	players[a].addToHand( inDeck[x] );
	inDeck.splice(x, 1);
	players[a].showHand(a);
	players[a].moves++;
	
	/*if( players[a].getTotalValue() > 21){
		//players[a].loose(a);
	}else{
		if( players[a].getTotalValue() == 21 && players[a].moves==1){
			//players[a].win(a);
		}
	}*/
	nextTurn();
}

var inDeck = [];
var deck = [];
var players = [];
var numbOfPlayers = 0;

//------------creation of the players----
function createPlayers(){	
	document.getElementById("numbOfPlayers").disabled=true;
	document.getElementById("createPlayer").disabled=true;
	
	for(var a = 0, c = 0; a<13; a++){
		for(var b = 0; b<4; b++){
			deck[c] = new Card( a+1, b+1, c);
			c++;
		}
	}
	
	var numbOfPlayers = document.getElementById("numbOfPlayers").value; //number of players
	if( numbOfPlayers > 5){
		alert("Maximum only 5 players are allowed to play at a time");
		document.getElementById("numbOfPlayers").value=5;
	}else{
		for( var a = 1; a <= numbOfPlayers; a++){
			document.getElementById("1").innerHTML+="Player" +a+ " cash: <div id=\"player" +a+ " cash\"></div><br /> ";
		}
		document.getElementById("2").innerHTML="<br /><br /> <form>";
		for( var a = 1; a <= numbOfPlayers; a++){
			document.getElementById("2").innerHTML+="Player"+a+" bid: "+'<input type="text" id="player'+a+' bid" value="100"></input><br /> ';
		}
		document.getElementById("2").innerHTML+="</form><br />";	
		
		for( var a = 1; a <= numbOfPlayers; a++){
			document.getElementById("3").innerHTML+="Player"+a+" hand: "+'<div id="player'+a+' hand"></div><br />';
		}
		
		document.getElementById("3").innerHTML+='Dealer hand: <div id="player0 hand"> </div><br />';
		
		for( var a = 0; a<=numbOfPlayers; a++){
			var playerCash = (a === 0 ? Infinity : 5000);  // can set amount of cash dealer and each player has
			players[a] = new Player( playerCash );
			if(a != 0 ) {
				players[a].updateCash(a);
			}
		}
	}
	document.getElementById("deal").disabled=false;
}
//----------------------------


//----------------------Game start---------------------
function startTheGame(){
	document.getElementById("hit").disabled=false;
	document.getElementById("stand").disabled=false;
		
	turn = 1;
	document.getElementById("deal").disabled=true;

	for( var a = 0; a<52; a++){
		inDeck[a] = a;
	}

	numbOfPlayers=document.getElementById("numbOfPlayers").value;
	for( var a = 0; a<=numbOfPlayers; a++){
		players[a].reset(a);
		if (a>0){
getElementById("player" + a + " bid").disabled = true;
players[a].bidOnPlayer(document.getElementById("player" + a + " bid").value ,a);
		}
		var x=Math.floor((Math.random()*(inDeck.length-1)));
		players[a].addToHand( inDeck[x] );
		inDeck.splice(x, 1);	
		players[a].showHand(a);
	}
}

/*
Ar reikia vis� program� �d�t � klas�?
Ar �manoma sustabdyti programos vygdym�, norint gauti userio input� prie� t�siant? 
Ar setTimeOut() sustabdo kodo vykdym� funkcijoje, kurioje jis yra
Funkcijos defininimas funkcijoj.
ar galima palikti funkcijas ar b�tina paverst � metodus
klaidos objektas.metpav -> objektas.metpav()    function lala() -> var lala = function()  
*/
