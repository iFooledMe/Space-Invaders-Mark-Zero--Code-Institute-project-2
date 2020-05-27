// ==========================================================================================
// ==== I M A G E S   P R E - L O A D =======================================================
var Images = {};

function loadImages(list){
    var total = 0;
    for(var i = 0; i < list.length; i++){
        var img = new Image();
        Images[list[i].name] = img;
        img.onload = function(){
            total++;
            if(total == list.length){
            }
        };
        img.src = list[i].url;
    }
}

// .... Images List ............................................................................
loadImages([{
    name: "player_starship_small",
    url: "assets/images/spaceship-100x50.png",
},{
    name: "player_starship_medium",
    url: "assets/images/spaceship-200x100.png"
}]);

// =============================================================================================
// ==== G L O B A L   V A R I A B E L S ========================================================

// .... GAME ...................................................................................
var ctx = null; //Canvas Context
var paused = true;

// .... PLAYER .................................................................................
var playerStartPosX = 100; //Horizontal axis
var playerStartPosY = 270; //Vertical axis
var playerStartSizeW =  100; //Width
var playerStartSizeH =  50; //Height

var playerCurrentPosX = playerStartPosX;
var playerCurrentPosY = playerStartPosY;

// =============================================================================================
// ==== G A M E - O B J E C T S ================================================================

var Game = {
    canvas : null,
    context : null,
    getMyContext : function (canvasId, width, height) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        return this.context;
    }
}

// =============================================================================================
// ==== S T A R T =========?====================================================================

$(document).ready(function() {

    start();
})

function start() {

    //Create Game Context Object in Canvas 
    ctx = Game.getMyContext("canvas-1", 1000, 700);

    loadResources(); //Images and resources on the screen
    setControls(); //Key Commands

}

// .... Start / Pause .............................................................................
$(".game-info-bar button").click(function(){
    
    if (paused){
        paused = false;
        $(".game-info-bar button").text("Game Started!");
        start();
    }
    else if (!paused) {
        paused = true;
        $(".game-info-bar button").text("Game Paused!");
        pause(); 
        /* TODO: Do pause function */ 
        /* TODO: Connect Pause Button */ 
    }
    else {
        alert("Error! Game is neither started or paused!")
    }
});


// **** LOAD RESOURCES ****************************************************************************
function loadResources() {

    drawPlayerStarShip();

}

// .......... Player ..........
function drawPlayerStarShip() {
    ctx.drawImage(Images["player_starship_small"], playerStartPosX, playerStartPosY, playerStartSizeW, playerStartSizeH);
}



// .......... Enemies ..........




// **** SET CONTROLS ****************************************************************************

function setControls() {



}