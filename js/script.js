/**
 * Created by maxwe on 10/26/2016.
 */

// init vars
// game_turn keeps track of the game turn, initial value of 0 max value of 19
var game_turn = 2;
// used to set up the sequence of each game
var game_sequence = [];
//used to track the players turn reset at the end of each player turn
var player_sequence = [];
// variable enables the strict game mode, IE if true player mistake ends game and resets
// if false player mistake ends turn and displays sequence again
var strict=false;
// player
var player_clicks = 0;

// function to create an array of length 20 that the game will play out
function getRandomizer(bottom, top) {
    return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
}

// this function will create a new game
function createGame() {
    for (var i = 0; i < 20; i++) {
        var k = getRandomizer(1, 4);
        game_sequence.push(k);
    }
    console.log(game_sequence);
    alert("Ready for a New Game?");
    simon_says();
}
//function to reset the game for a start over, called from reset button and when a strict game has a failed test
function resetGame(){
    game_mode='';
    player_sequence=[];
    game_sequence=[];
    player_clicks = 0;
    createGame();
}
// logic to complete the turn after each player click
// test click number against game array to make sure the button matches the the game array
// if the player click the right button continue
// if the player clicks the wrong button through an error based on game mode
// strict = true game starts over, strict = false turn starts over
// display message to let player know results
function player_turn(id) {
    // function will take in button click of player
    // add click to player sequence

    player_sequence.push(parseInt(id));
    player_clicks++;
    // console.log(game_sequence);
    // console.log(player_sequence);
    // console.log(player_clicks);
    // console.log(game_turn);
    // compare player_sequence to the game_sequence array
    // since this is checked each click i only need to check if the last entry matches
    console.log("Player sequence = " + player_sequence);
    console.log("game sequence = " + game_sequence);
    console.log("game turn = " + game_turn);
    console.log("player_clicks = " + player_clicks);
    if (player_sequence[player_clicks - 1] != game_sequence[player_clicks - 1] && strict == true) {
        player_clicks = 0;
        player_sequence= [];
        resetGame();
        alert("you lost noob, game has reset");
    } else if (player_sequence[player_clicks - 1] != game_sequence[player_clicks - 1] && strict == false){
        alert("Incorrect noob... Try Again!");
        player_clicks = 0;
        player_sequence = [];
        simon_says();

    }
    else if (player_clicks == game_turn){
        player_sequence = [];
        player_clicks = 0;
        game_turn++;
        simon_says();
    }
}

// this is the function that will run the display turn so simon can show the player the sequence
function simon_says() {
    //console.log("Simon Says")
    // this code will display the computers turn to the user
    var i = 0, howManyTimes = game_turn;
    function flicker() {
       var value = game_sequence[i];
       console.log("Simon Says push button number: " + value);
       var $btn = $("#" + value);
       $btn.animate({opacity: '0.2'}, 500).delay(200).animate({opacity: '1'}, 850);
        i++;
        if (i < howManyTimes){
            setTimeout(flicker, 2500)
        }
    }
    flicker();
}
// event listener for the 4 game game buttons (gamebtn)
$('.gamebtn').click(function(e){
    var $btnId = e.target['id'];
    player_turn($btnId);
    console.log("you clicked button number " + $btnId);
});
// event listener for the control btns (controlbtn)
$('.controlbtn').click(function(e){
    var $btnId = e.target['id'];
    if ($btnId == "reset"){
        resetGame();
    }
    if ($btnId == "strict"){
        var $togs = $('#strict').html();
        if ($togs == 'Strict On'){
            strict = false;
            $('#strict').html("Strict Off");
        }
        if ($togs == 'Strict Off'){
            strict = true;
            $('#strict').html("Strict On");
        }
    }
    });

// create a new game after document finishes loading
$('document').ready(function(){
    console.log("simon");
    createGame();
});
