// ==========================================================================================
// ==== I M A G E S   P R E - L O A D =======================================================
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

// .... Images List ............................................................................
loadImages ([   
    {   name: "player_starship_small",
        url: "assets/images/spaceship2_100x50.png"      },
    {   name: "player_starship_medium",
        url: "assets/images/spaceship2_120x60.png"      },
    {   name: "bg-planet-1",
        url: "assets/images/bg-planet-3840x2160.jpg"    }
]);

// =============================================================================================
// ==== G L O B A L   V A R I A B L E S ========================================================
var ctx;
var game;
var player;



// =============================================================================================
// ==== G A M E - O B J E C T S ================================================================

// .... GAME ...................................................................................
function Game () {
    this.canvas = null;
    this.context = null;
    this.width = null;
    this.height = null;
    this.create = function(canvasId, width, height) { 
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        return this.context;
    };
    this.isPaused = true; //Game paused at load
};

// .... PLAYER ..................................................................................
function Player(name) {
    this.name = name;
    this.posX = 100; //Horizontal axis at start
    this.posY = 270; //Vertical axis at start
    this.sizeW =  120; //Width at start
    this.sizeH =  60; //Height at start
    this.draw = function(newX, newY) {
        ctx.clearRect(this.posX, this.posY, this.sizeW, this.sizeH);
        this.posX -= newX;
        this.posY -= newY;
        ctx.drawImage(Images["player_starship_small"], this.posX, this.posY, this.sizeW, this.sizeH);
    };
};

// ===============================================================================================
// ==== S T A R T ================================================================================

$(document).ready(function() {
    
    //Create Canvas
    game = new Game();
    ctx = game.create("canvas-1", 1000, 700);
    
    //Start Point
    start();
})

// ==== GAME ENTRY POINT =========================================================================
function start() {

    loadResources(); //Images and resources on the screen*/
    setControls(); //Key Commands
  
}

// ===============================================================================================
// ==== S T A R T  / P A U S E ===================================================================

$(".game-info-bar button").click(function(){
    
    if (Game.isPaused){
        Game.isPaused = false;
        $(".game-info-bar button").text("Game Started!");
        unPause();
    }
    else if (!Game.isPaused) {
        Game.isPaused = true;
        $(".game-info-bar button").text("Game Paused!");
        pause(); 
        /* TODO: Do pause function */ 
        /* TODO: Connect Pause Button */ 
    }
    else {
        alert("Error! Game is neither started or paused!")
    }
});

function unPause() {

}

function pause() {
    
}


// ===============================================================================================
// ==== G A M E - R U N N I N G ==================================================================


// **** LOAD RESOURCES ****************************************************************************
function loadResources() {

    inGame_player(); //Creates the player ship, score and other statuses
}

// .......... Player ...........
function inGame_player() {
    player = new Player("iFooledMe");
    player.draw(0,0);
    $("#player-user-name").html(` Welcome <strong>${player.name}!</strong><br>Enjoy your Game!`);
};


// .......... Enemies ..........




// **** SET CONTROLS ****************************************************************************

function setControls() {

        /* Check for keystrokes */
     document.addEventListener('keydown', logKey);
 
     function logKey(e) {
         log.textContent += ` ${e.code}`; /* TODO: Just for test, remove later!!!  */
         var key = `${e.code}`;       
         playerActions(key);
    }
}

function playerActions(key) { 
    var vrtMrg = 30;        // Margin to top and bottom canvas borders 
    var hrzMarg = 30;       // Margin to left and right canvas borders 
    var speed = 15;         // Speed of movement multiplier 
    
    switch (key) {
        
        // === Move Up ===
        case "ArrowUp":
            if (player.posY >= 0 + vrtMrg) {
                player.draw(0, 1 * speed); 
            }
            else {
                break;
            }
            break;
        
        // === Move Down ===
        case 'ArrowDown':
            console.log(game.height); // TODO: get gama height to a variable. Check why "player" is available globaly but "game" is not?
            if (player.posY <= 700 - player.sizeH - vrtMrg) {
                player.draw(0, -1 * speed); 
            }
            else {
                break;
            }
            break;
        
        // === Move Left ===
        case 'ArrowLeft':
            
            player.draw(1 * disable, 0); 
            break;
        
        // === Move Right ===    
        case 'ArrowRight':
            
            player.draw(-1 * disable, 0); 
            break;
        default:
          console.log(`Some other Key! var KeyStroke = ${key}`);
          break;
    }  
 }