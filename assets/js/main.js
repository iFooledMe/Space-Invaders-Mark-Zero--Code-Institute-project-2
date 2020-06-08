// =============================================================================================
// ==          Source: Derek Leung - http://jsfiddle.net/DerekL/uCQAH/                        ==
//#region ==== P R E - L O A D =================================================================

var Images = {};

function preload(list, callback){
    var total = 0;
    $("span").text("Loading...");
    for(var i = 0; i < list.length; i++){
        var img = new Image();
        Images[list[i].name] = img;
        
        img.onload = function(){
            total++;
            if(total == list.length){
                $("span").text("Loaded.");
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
        url: "assets/images/astroid1_200x200.png"      }
]

// #endregion

// =============================================================================================
// #region ==== G L O B A L   V A R I A B L E S =================================================
var ctx;
var game;
var player;


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
    this.isPaused = true; //Game paused at load+
};

// .... PLAYER ..................................................................................
function Player(name) {
    this.name = name;
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
    setControls(); //Key Commands
    window.requestAnimationFrame(gameLoop);
}

// ==== START / PAUSE ============================================================================
                                                                                       

$("#start-button").click(function(){
    console.log(Game.isPaused);
    if (Game.isPaused){
        pause();
    }
    else if (!Game.isPaused) {
        unPause(ctx); 
    }
    else {
        console.log("Error! Game is neither started or paused!");
    }
});

function unPause(ctx) {
    Game.isPaused = true;
    $(".game-info-bar button").text("Game Started!");
    runGame(ctx);
}

function pause(ctx) {
    Game.isPaused = false;
    $(".game-info-bar button").text("Game Paused!"); 
}
 
// #endregion

// ==============================================================================================
// #region ==== G A M E - R U N N I N G =========================================================

var enemiesArray = [];

// Request Animation Frame Loop drawing game content
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
    window.requestAnimationFrame(gameLoop);
}

function inGame_objects() {

    create_player(); //Creates the player ship, score and other statuses
    create_enemies();
}

// .......... Player ...........
function create_player() {
    player = new Player("iFooledMe");
    $("#player-user-name").html(` Welcome Captain <strong>${player.name}!</strong> Enjoy your Game!`);
};

// .......... Enemies ..........

// Create an array of random enemies
function create_enemies() {
    
    var maxEnemies = 10;
    var i;
    var y = 50;

    for (i = 0; i < maxEnemies; i++) {
        enemiesArray.push(random_enemy());
        //y += 50;
    }
}

// Draw, redraw and delete from canvas
function drawEnemy(enemy) {

    this.enemy = enemy;
    var index = enemiesArray.indexOf(enemy);
  
    if (this.enemy.posX <= -this.enemy.sizeW) {
        ctx.clearRect(this.enemy.posX, this.enemy.posY, this.enemy.sizeW, this.enemy.sizeH);
        delete enemiesArray[index]; 
        enemiesArray[index] = random_enemy();
    }
    else if (player.posX < this.enemy.posX + this.enemy.sizeW && player.posX + player.sizeW > this.enemy.posX && player.posY < this.enemy.posY + this.enemy.sizeH && player.posY + player.sizeH > this.enemy.posY) {
        this.enemy.draw(0,0);
    }
    else {
        this.enemy.draw(this.enemy.speed,0);
    }
}

// Return a enemy object with random properties
function random_enemy() {
    let y = getRndInteger(50, game.canvas.height);
    let speed = getRndInteger(1, 5);
    let size = randomSize();
    
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
    
    // ==== SETTINGS =====================================================
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

 // #endregion