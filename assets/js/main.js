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
        url: "assets/images/spaceship2_120x60.png"      },
    {   name: "player_starship_medium",
        url: "assets/images/spaceship2_120x60.png"      },
    {   name: "bg-planet-1",
        url: "assets/images/bg-planet-3840x2160.jpg"    }
]);

// =============================================================================================
// ==== G L O B A L   V A R I A B L E S ========================================================
var Game;
var ctx;
var player;


// =============================================================================================
// ==== G A M E - O B J E C T S ================================================================

// .... GAME ...................................................................................
var Game = {
    canvas : null,
    context : null,
    create : function(canvasId) { 
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
        return this.context;
    },
    isPaused : true, //Game paused at load
};

// .... PLAYER ..................................................................................
function Player(ctx,name) {
    this.name = name;
    this.posX = 100; //Horizontal axis at start
    this.posY = 270; //Vertical axis at start
    this.sizeW =  120; //Width at start
    this.sizeH =  60; //Height at start
    this.playerDrawPosition = function() {
        ctx.drawImage(Images["player_starship_small"], this.posX, this.posY, this.sizeW, this.sizeH);
    };
};

// ===============================================================================================
// ==== S T A R T ================================================================================

$(document).ready(function() {
    
    //Create Canvas
    ctx = Game.create("canvas-1");
    

      

    



    start(ctx);
})

// ==== GAME ENTRY ================================================================================
function start(ctx) {



    loadResources(ctx); //Images and resources on the screen*/
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
function loadResources(ctx) {

    inGame_player(ctx); //Creates the player ship, score and other statuses
}

// .......... Player ...........
function inGame_player(ctx) {
    player = new Player(ctx, "Mark");
    player.playerDrawPosition();
    
};


// .......... Enemies ..........




// **** SET CONTROLS ****************************************************************************

function setControls() {

   /* Check for keystrokes */
    document.addEventListener('keydown', logKey);

    function logKey(e) {
        log.textContent = ` ${e.code}`; /* TODO: Just for test, remove later!!!  */
        var keyStroke = ` ${e.code}`;
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

    
