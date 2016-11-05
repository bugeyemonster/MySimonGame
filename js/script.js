/**
 * Created by maxwe on 10/26/2016.
 */

// init vars
var game_turn = 0;
var game_sequence = [];
var player_sequence = [];
var game_mode='';

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
}
//function to reset the game for a start over, called from reset button and when a strict game has a failed test
function resetGame(){
    game_mode='';
    player_sequence=[];
    game_sequence=[];
    createGame();
}
// logic to complete the turn after players click
function player_turn(id){
    // function will take in button click of player
    // add click to player sequence
    player_sequence.push(parseInt(id));
    // compare player_sequence to the game_sequence array
    // since this is checked each turn i only need to check if the last entry matches
    if (player_sequence[game_turn] != game_sequence[game_turn] && game_mode == 'strict') {
        resetGame();
        console.log("you lost noob, game has reset");
    } else {
        game_turn++;
        computer_turn()
    }
    }
function computer_turn(){

}
//function to light a button
function light_button(value){
    var sim_btn = '#'+ value;
    $(sim_btn).flash( '255,0,0', 1000 );
}
function play_sound(value){
    // play simonsound(value).mp3
    fileLoc = "./media/simonSound" + value + ".mp3";
    var audio = new Audio(fileLoc);
    console.log(audio);
    audio.play();
}
// a function to display the lighted buttons in the sequence in the
// game sequence array
function display_sequence(){
     for (var i = 0; i < game_turn; i++){
         light_button(game_sequence[i]);
         play_sound(game_sequence[i]);
     }
}
function setStrict(){
    game_mode = 'strict';
}
jQuery.fn.flash = function( color, duration ) {
    var current = this.css( 'color' );
    this.animate( { color: 'rgb(' + color + ')' }, duration / 2 );
    this.animate( { color: current }, duration / 2 );
}


document.getElementById("4").addEventListener("click", function(){
    play_sound(this.value);
    player_turn(this.value);
});
document.getElementById("3").addEventListener("click", function(){
    play_sound(this.value);
    player_turn(this.value);
});
document.getElementById("2").addEventListener("click", function(){
    play_sound(this.value);
    player_turn(this.value);
});
document.getElementById("1").addEventListener("click", function(){
    play_sound(this.value);
    player_turn(this.value);
});
document.getElementById("resetBtn").addEventListener("click", function(){
    resetGame();
});
document.getElementById("strictBtn").addEventListener("click", function(){
    setStrict();
});

// create a new game after document finishes loading
document.addEventListener("load", function(){
    console.log("simon");
    createGame();
});