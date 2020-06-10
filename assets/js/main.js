// =============================================================================================
// ==          Source: Derek Leung - http://jsfiddle.net/DerekL/uCQAH/                        ==
//#region ==== P R E - L O A D =================================================================

var Images = {};

function preload(list, callback){
    var total = 0;
    $(".load-page").css("display", "block");
    for(var i = 0; i < list.length; i++){
        var img = new Image();
        Images[list[i].name] = img;
        
        img.onload = function(){
            total++;
            if(total == list.length){
                $(".load-page").css("display", "none");
                callback();
            }
        };
        img.src = list[i].url; 
    }
}

// .... Images List ............................................................................
var preLoadList = [   
    {   name: "player_starship_small",
        url: "assets/images/spaceship2_100x50.png"      },
    {   name: "player_starship_medium",
        url: "assets/images/spaceship2_120x60.png"      },
    {   name: "astroid_lg",
        url: "assets/images/astroid1_200x200.png"      },
    {   name: "bg-1",
        url: "assets/images/bg-space-2560x1700.jpg"      }
]

// #endregion

// =============================================================================================
// #region ==== G L O B A L   V A R I A B L E S =================================================
var ctx;
var game;
var player;

var enemiesArray = [];


//#endregion

// ==============================================================================================
// #region ==== G A M E - O B J E C T S =========================================================

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
    this.isOver = false;
};

// .... PLAYER ..................................................................................
function Player(name) {
    this.name = name;
    this.score = 0;
    this.sizeW =  120; //Width at start
    this.sizeH =  60; //Height at start
    this.posX = 100; //Horizontal axis at start
    this.posY = ((game.canvas.height / 2) - (this.sizeH)); //Vertical axis at start
    this.draw = function() {
        return ctx.drawImage(Images["player_starship_small"], 
            this.posX, this.posY, this.sizeW, this.sizeH);
    };
};

// .... ENEMY ..................................................................................
function Enemy(posY, sizeW, sizeH, speed) {
    this.sizeW =  sizeW; //Width at start
    this.sizeH =  sizeH; //Height at start
    this.posX = game.canvas.width; //Horizontal axis at start
    this.posY = posY; //Vertical axis at start
    this.speed = speed;
    this.draw = function(newX, newY) {  
        this.posX -= newX;
        this.posY -= newY;
        return ctx.drawImage(Images["astroid_lg"], 
            this.posX, this.posY, this.sizeW, this.sizeH);
    };
}

// #endregion

// ==============================================================================================
// #region ==== S T A R T =======================================================================

    preload (preLoadList, function() {
        $(document).ready(function() {
            setUpGame ();
            });  
    })  

function setUpGame() {
    //Create Canvas
    game = new Game();
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    ctx = game.create("canvas-1", width, height);
}


function runGame() {
    inGame_objects(ctx); //Images and resources on the screen*/
    window.requestAnimationFrame(gameLoop);
}



function resetGame() {
    ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.isPaused = true;
    game.isOver = false;
    player = new Player(player.name);
    $(".score").html(`SCORE: ${player.score}`); 
}

function restartGame() {
    resetGame();
    $(".game-over").css("display", "none");
    $(".game-info-bar button").text("Start Game!");
}

function quitToMenu() {
    $(".game-over").css("display", "none");
    ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
}

// ==== START / PAUSE ============================================================================
                                                                                       
// **** Start- / Pause-button **** 
$("#start-button").click(function(){
    console.log(game.isPaused);
    if (game.isPaused){
        unPause();
    }
    else if (!game.isPaused) {
        pause(ctx); 
    }
    else {
        console.log("Error! Game is neither started or paused!");
    }
});

function unPause(ctx) {
    $(".game-info-bar button").text("Game Started!");
    game.isPaused = false;
    runGame(ctx);
}

function pause(ctx) {
    $(".game-info-bar button").text("Game Paused!"); 
    game.isPaused = true;
    
}

// **** Reset button **** 
$(".reset-button").click(function(){
    restartGame();
});

// **** Quit to Menu button **** 
$(".quit-button").click(function(){
    quitToMenu();
 });
 
// #endregion

// ==============================================================================================
// #region ==== G A M E - R U N N I N G =========================================================



// ==== REQUEST ANIMATION FRAME LOOP ====
gameLoop = function() {
      
    game.canvas.width = document.documentElement.clientWidth;
    game.canvas.height = document.documentElement.clientHeight;

    //Clear Frame
    ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
        
    //Draw enemies
    enemiesArray.forEach(enemy => {
        drawEnemy(enemy);
    });

    //Draw player
    player.draw();

    //Request next frame
    if (!game.isOver) {
        window.requestAnimationFrame(gameLoop);
    }
    else {
        gameOver();
    }  
}

// ==== GAME OVER ====
function gameOver() {
    $(".game-over").css("display", "block");
}

// ==== ON SCREEN OBJECTS ====
function inGame_objects() {

    create_player(); //Creates the player ship, score and other statuses
    create_enemies(10); //Creates the specified amount of random enemy objects
}

//CREATE / SETUP PLAYER ..........................................................................
function create_player() {
    
    if (player == null || typeof player === "undefined") {
        player = new Player("iFooledMe");
    }
    
    $("#player-info").html(`Welcome Captain <strong>${player.name}!</strong> Enjoy your Game!`);
    $(".score").html(`SCORE: ${player.score}`);
    setControls(); //Key Commands
};

// **** SET CONTROLS ****************************************************************************

function setControls() {

    /* Listen for keystrokes */
     document.addEventListener('keydown', logKey);
 
     /* Log keystroke and pass to player actions function */
     function logKey(e) {
         var key = `${e.code}`;       
         playerActions(key);
    }
}

function playerActions(key) { 
    
    // SETTINGS 
    var mrg_vrt = 30;           // Margin to top and bottom canvas borders 
    var mrg_hrz = 30;           // Margin to left and right canvas borders 
    var speed_vrt = 15;         // Speed of vertical movement 
    var speed_hrz = 0;          // Speed of horizontal movement

    switch (key) {
        
        // === Move Up ===
        case "ArrowUp":
        case "KeyW":
            if (player.posY >= mrg_vrt + 50) {
                player.posY -= speed_vrt; 
            }
            else {
                break;
            }
            break;
        
        // === Move Down ===
        case 'ArrowDown':
        case "KeyS":
            if (player.posY <= game.canvas.height - player.sizeH - mrg_vrt) {
                player.posY += speed_vrt; 
            }
            else {
                break;
            }
            break;
        
        // === Move Left ===
        case 'ArrowLeft':
        case "KeyA":
            
            break;
        
        // === Move Right ===    
        case 'ArrowRight':
        case "KeyD":
            
            break;
        default:          
        console.log(`Some other Key! var KeyStroke = ${key}`);
          break;
    }  
 }

// ==== CREATE ENEMY ====
// Create an array of random enemies
function create_enemies(max) {
    enemiesArray = []; //reset if already existing
    var numberOfEnemies = max;
    var i;
    for (i = 0; i < numberOfEnemies; i++) {
        enemiesArray.push(random_enemy());
    }
}

// Draw, redraw and delete from canvas
function drawEnemy(enemy) {

    this.enemy = enemy;
    var index = enemiesArray.indexOf(enemy);
  
    if (this.enemy.posX <= -this.enemy.sizeW) {
        player.score += 1;
       
        $(".score").html(`SCORE: ${player.score}`);
        
        ctx.clearRect(this.enemy.posX, this.enemy.posY, this.enemy.sizeW, this.enemy.sizeH);
        delete enemiesArray[index]; 
        enemiesArray[index] = random_enemy();
    }
    else if (player.posX < this.enemy.posX + this.enemy.sizeW && player.posX + player.sizeW > this.enemy.posX && player.posY < this.enemy.posY + this.enemy.sizeH && player.posY + player.sizeH > this.enemy.posY) {
        this.enemy.draw(0,0);
        game.isOver = true;
    }
    else {
        this.enemy.draw(this.enemy.speed,0);
    }
}

// Return a enemy object with random properties
function random_enemy() {
    let y, speed, size = null; //reset
    y = getRndInteger(50, game.canvas.height);
    speed = getRndInteger(1, 5);
    size = randomSize();
    
    function randomSize() {
        let rndSize = getRndInteger(1, 100);
        if (rndSize <= 10) { return 20; }
        else if (rndSize > 10 && rndSize <= 50) { return 50; }
        else if (rndSize > 50 && rndSize <= 90) { return 100; }
        else if (rndSize > 90 && rndSize <= 98) { return 200; }
        else if (rndSize > 98) { return 300; }
        else { return 100; }
    }

    return new Enemy(y, size, size, speed);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}




 // #endregion