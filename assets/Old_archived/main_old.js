// :::: GLOBAL VARIABLES ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// .... Game ................................................................................
var ctx;
var paused = true;

// .... Player ..............................................................................
var playerStartPosX = 100; //Horizontal axis
var playerStartPosY = 300; //Vertical axis
var playerStartSizeW =  60; //Width
var playerStartSizeH =  40; //Height

var playerCurrentPosX = playerStartPosX;
var playerCurrentPosY = playerStartPosY;

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// ==========================================================================================
// ==== IMAGES PRE-LOAD =====================================================================
var Images = {};

function loadImages(list){
    var total = 0;
    $("span").text("Loading...");
    for(var i = 0; i < list.length; i++){
        var img = new Image();
        Images[list[i].name] = img;
        
        img.onload = function(){
            total++;
            if(total == list.length){
                $("span").text("Loaded.");
            }
        };
        img.src = list[i].url;
    }
}

// .... List of Images ..........................................................................
loadImages([{
    name: "player_starship",
    url: "assets/images/spaceship-200x100.png",
},{
    name: "weirdCircles",
    url: "http://www.nasa.gov/images/content/498887main_Fermi_bubble_art_no_labels.jpg"
}]);


// ================================================================================================
// ==== START =====================================================================================
function start(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    createPlayer(ctx);
}

// .... Start / Pause ..............................................................................
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


// ================================================================================================
// ==== PLAYER ====================================================================================


/* Create player ship in canvas */
function createPlayer(ctx) {
    ctx.drawImage(Images["player_starship"], playerStartPosX, playerStartPosY, playerStartSizeW, playerStartSizeH);
};





    document.onkeydown = function(event) {
        var direction;
        
        switch (event.keyCode) {
           case 37:
              break;
           case 38:
            direction = "up";
            movePlayer(direction);
              break;
           case 39:
              break;
           case 40:
            direction = "down";
            movePlayer(direction);
              break;
        }
    };

/* Move player */
    function movePlayer(direction) {
        
        if (direction == "up") {

            alert("UUUUPPPPP!!!!!" + direction);

        }
        else if (direction == "down") {
            alert("DOOOOOWWWN!!!!" + direction);
        }

    }









