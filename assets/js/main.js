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

// #region ==== S E T T I N G S =================================================================
var levelCountdownTime = 15;  //In seconds


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
    this.level = 1;
    this.levelClear = false;
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

// ==== Preload resources and Main entry point ====
preload (preLoadList, function() {
    $(document).ready(function() {
        setUpGame ();
        displayMainMenu();
        });  
})  

// ==== SetUp Game (New game object and context) ====
function setUpGame() {
    //Create Canvas
    game = new Game();
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    ctx = game.create("canvas-1", width, height);
    resetTimer(levelCountdownTime);
}

// ==== Run Game (Triggered by start-button) ====
function runGame() {
    inGame_objects(ctx); //Images and resources on the screen*/
    game.isPaused = false;
    timer.reset(levelCountdownTime);
    timer.start(1000);
    updateDisplayInfo();
    window.requestAnimationFrame(gameLoop);
}

// ==== Reset Game ====
function resetGame(playerName) {
    ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.isPaused = false;
    game.isOver = false;
    game.levelClear = false;
    resetTimer(levelCountdownTime);
    player_createNew("Player name");
}


// #endregion

// ==============================================================================================
// #region ==== G A M E   I N F O   B A R =======================================================
function updateDisplayInfo () {
    displayUserName();
    displayScore();
}

function displayScore() {
    $(".score").html(`SCORE <span>${player.score}</span>`);
}

function displayUserName() {
    $(".user-name").html(`Welcome Captain <span>${player.name}!</span> Enjoy your Game!`);
}

// #endregion

// ==============================================================================================
// #region ==== M E N U Functions ===============================================================

// **** Display Main Menu ****
function displayMainMenu() {
    $(".game-info-bar").css("display", "none");
    $(".main-menu").css("display", "block");
}

// **** Open Main Menu ****
function quitToMenu() {
    resetGame();
    $(".closeMe").css("display", "none");
    displayMainMenu();
}

function backToMenu() {
    $(".closeMe").css("display", "none");
    displayMainMenu();
}

// **** New Game ****
function newGame() {
    resetGame("A name");
    $(".score").html(`SCORE: <span>${player.score}</span>`);
    $(".closeMe").css("display", "none");
    $(".game-info-bar").css("display", "block");
    runGame();
}

// **** Restart Game ****
function restartGame() {
    resetGame(player.name);
    $(".closeMe").css("display", "none");
    runGame();  
}

// ==== MENU BUTTONS ============================================================================

// **** New Game button **** 
$(".new-game-button").click(function(){
    newGame();
});

// **** Reset button **** 
$(".reset-button").click(function(){
    restartGame();
});

// **** Quit to Menu button **** 
$(".quit-button").click(function(){
    quitToMenu();
 });

 // **** Back to Menu button **** 
$(".back-button").click(function(){
    backToMenu();
 });

 // **** Resume Game button **** 
$(".resume-button").click(function(){
    unPauseGame();
 });

// **** Game Info button **** 
$(".game-info-button").click(function(){
    $(".closeMe").css("display", "none");
    $(".game-info").css("display", "block");
 });

 // **** Game Instructions button **** 
$(".game-instructions-button").click(function(){
    $(".closeMe").css("display", "none");
    $(".game-instructions").css("display", "block");
 });

  // **** Credits Info Button **** 
$(".credits-info-button").click(function(){
    $(".closeMe").css("display", "none");
    $(".credits-info").css("display", "block");
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
    if (game.isOver) {
        gameOver();
    }
    else if (game.levelClear) {
        levelClear();
    }
    else if (game.isPaused) {
        console.log("Game Paused");
    }
    else {
        window.requestAnimationFrame(gameLoop);
    }  
}

// ==== GAME STATES ===================================================================

// **** PAUSED **************************************

function pauseGame() {
    $(".closeMe").css("display", "none");
    game.isPaused = true;   
    $(".game-paused").css("display", "block");
}

function inGameMenu() {
    $(".closeMe").css("display", "none");
    game.isPaused = true;   
    $(".in-game-menu").css("display", "block");
}

function unPauseGame() {
    $(".closeMe").css("display", "none");
    game.isPaused = false;
    requestAnimationFrame(gameLoop);
}



// **** GAME OVER ************************************
function gameOver() {
    $(".closeMe").css("display", "none");
    $(".game-over").css("display", "block");
}

// **** LEVEL CLEAR **********************************
function levelClear() {
    $(".closeMe").css("display", "none");
    $(".level-clear").css("display", "block");
}

// ==== ON SCREEN OBJECTS ==============================================================================
function inGame_objects() {

    player_setup(); //Creates the player ship, score and other statuses
    create_enemies(10); //Creates the specified amount of random enemy objects
}

// ==== Player ====

// New player .....
function player_createNew(playerName) {
    if (player == null || typeof player === "undefined") {
        player = new Player(playerName);
    }
    else {
        player = new Player(player.name);
    }
}

// Setup player .....
function player_setup() {
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
        
        // === Pause ===  
        case 'KeyP':
            if(!game.isPaused){
                pauseGame();
            }
            else {
                unPauseGame();
            }
            break;

        // === Pause ===  
        case 'Escape':
            if(!game.isPaused){
                inGameMenu();
            }
            else {
                unPauseGame();
            }
            break;

           

        // === Default ===  
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
        displayScore();
        ctx.clearRect(this.enemy.posX, this.enemy.posY, this.enemy.sizeW, this.enemy.sizeH);
        delete enemiesArray[index]; 
        enemiesArray[index] = random_enemy();
    }
    else if (player.posX < this.enemy.posX + this.enemy.sizeW && player.posX + player.sizeW > this.enemy.posX && player.posY < this.enemy.posY + this.enemy.sizeH && player.posY + player.sizeH > this.enemy.posY) {
        stopTimer();
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
 
// ==== GAME TIMER =================================================================
function runTimer(levelTimeOut) {
    $("#displayTimer").css("display", "block");
    timer.reset(levelTimeOut);
    timer.start(1000);
}

function stopTimer() {
    timer.stop();
}

function resetTimer(levelTimeOut) {
    timer.reset(levelTimeOut);
}


// ==== Source: da vinci harsha - https://codepen.io/davinciharsha/pen/vGBXzR
function _timer(callback)
{
    var time = 0;     //  The default time of the timer
    var mode = 0;     //    Mode: count up or count down
    var status = 0;    //    Status: timer is running or stoped
    var timer_id;    //    This is used by setInterval function
    
    // this will start the timer ex. start the timer with 1 second interval timer.start(1000) 
    this.start = function(interval)
    {
        interval = (typeof(interval) !== 'undefined') ? interval : 1000;
 
        if(status == 0)
        {
            status = 1;
            timer_id = setInterval(function()
            {
                switch(mode)
                {
                    default:
                    if(time)
                    {
                        time--;
                        generateTime();
                        if(typeof(callback) === 'function') callback(time);
                    }
                    break;
                    
                    case 1:
                    if(time < 86400)
                    {
                        time++;
                        generateTime();
                        if(typeof(callback) === 'function') callback(time);
                    }
                    break;
                }
            }, interval);
        }
    }
    
    //  Same as the name, this will stop or pause the timer ex. timer.stop()
    this.stop =  function()
    {
        if(status == 1)
        {
            status = 0;
            clearInterval(timer_id);
        }
    }
    
    // Reset the timer to zero or reset it to your own custom time ex. reset to zero second timer.reset(0)
    this.reset =  function(sec)
    {
        sec = (typeof(sec) !== 'undefined') ? sec : 0;
        time = sec;
        generateTime(time);
    }
    
    // Change the mode of the timer, count-up (1) or countdown (0)
    this.mode = function(tmode)
    {
        mode = tmode;
    }
    
    // This methode return the current value of the timer
    this.getTime = function()
    {
        return time;
    }
    
    // This methode return the current mode of the timer count-up (1) or countdown (0)
    this.getMode = function()
    {
        return mode;
    }
    
    // This methode return the status of the timer running (1) or stoped (1)
    this.getStatus
    {
        return status;
    }
    
    // This methode will render the time variable to hour:minute:second format
    function generateTime()
    {
        var second = time % 60;
        var minute = Math.floor(time / 60) % 60;
        var hour = Math.floor(time / 3600) % 60;
        
        second = (second < 10) ? '0'+second : second;
        minute = (minute < 10) ? '0'+minute : minute;
        hour = (hour < 10) ? '0'+hour : hour;
        
        $('div.timer span.second').html(second);
        $('div.timer span.minute').html(minute);
        $('div.timer span.hour').html(hour);
    }
}
 
// example use
var timer;
 
$(document).ready(function(e) 
{
    timer = new _timer
    (
        function(time)
        {
            if(time == 0)
            {
                timer.stop();
                game.levelClear = true;
                
            }
        }
    );
    timer.reset(0);
    timer.mode(0);
});
    