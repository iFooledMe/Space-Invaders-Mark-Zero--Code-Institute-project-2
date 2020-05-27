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
    url: "assets/images/spaceship2_120x60.png",
},{
    name: "player_starship_medium",
    url: "assets/images/spaceship2_120x60.png"
}]);

// =============================================================================================
// ==== G L O B A L   V A R I A B L E S ========================================================




// =============================================================================================
// ==== G A M E - O B J E C T S ================================================================

// .... GAME ...................................................................................
function Game (canvasId, width, height) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = width;
    this.canvas.height = height;
    this.paused = true; //Game paused at start
    this.context = this.canvas.getContext("2d");
};

// .... PLAYER ..................................................................................
function Player(Game, name) {
    this.game = Game;
    this.name = name;
    this.playerPosX = 100; //Horizontal axis at start
    this.playerPosY = 270; //Vertical axis at start
    this.playerSizeW =  120; //Width at start
    this.playerSizeH =  60; //Height at start
    this.playerDrawPosition = function() {
        return game.context.drawImage(Images["player_starship_small"], 
        this.playerPosX, 
        this.playerPosY, 
        this.playerSizeW, 
        this.playerSizeH);
    };
};



// =============================================================================================
// ==== S T A R T =========?====================================================================

$(document).ready(function() {

    start();
})

function start() {

    var newGame = new Game("canvas", 300, 300);

    var player = new Player(newGame, "MT");
    player.playerDrawPosition();

    loadResources(); //Images and resources on the screen
    setControls(); //Key Commands

}

// .... Start / Pause .............................................................................
$(".game-info-bar button").click(function(){
    
    if (gamePaused){
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

    

}

// .......... Player ..........



// .......... Enemies ..........




// **** SET CONTROLS ****************************************************************************

function setControls() {

   /* Check for keystrokes */
    document.addEventListener('keydown', logKey);

    function logKey(e) {
        log.textContent += ` ${e.code}`; /* TODO: Just for test, remove later!!!  */
        var keyStroke = ` ${e.code}`;
       alert(keyStroke);
        playerActions(keyStroke); 
        

    }

    function playerActions(keyStroke) {       
        var direction = null;

        if (keyStroke = "ArrowUp" || "KeyW") {


        }
        else if (keyStroke = "ArrowDown" || "KeyS") {
            

        }
        else if (keyStroke = "ArrowLeft" || "KeyA") {
            

        }
        else if (keyStroke = "ArrowRight" || "KeyD") {
            

        }
        else {
            console.log("some other keystroke")
 
        }

    }



    
}