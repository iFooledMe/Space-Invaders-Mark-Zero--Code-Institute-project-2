// ==============================================================================================
// #region ==== G L O B A L   V A R I A B L E S =================================================
var ctx;
var game;
var player;

var bulletsArray = [];
var enemiesArray = [];


// ==== S E T T I N G S =================================================================
var levelCountdownTime = 15;  //In seconds
var playerSpeed = 5;
var completeLevelScore = 50;
var enemyCount = 1;

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
    this.isPaused = true; 
    this.isOver = false;
    this.level = 1;
    this.levelClear = false;
    this.run = function() { 
        this.isPaused = false; 
        this.isOver = false;
        this.levelClear = false;
        updateDisplayInfo();
        timerStart();
        window.requestAnimationFrame(gameLoop);
    };
    this.reset = function(userName) {
        ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
        enemiesArray.length = 0;
        player.setStartPos();
        player.resetScore();
        timerReset(levelCountdownTime);
    }
};

// .... PLAYER ..................................................................................
function Player() {
    this.userName = "User Name not set";
    this.score = 0;
    this.sizeW =  160; //Width at start
    this.sizeH =  80; //Height at start
    this.posX = 100; //Horizontal axis at start
    this.posY = ((game.canvas.height / 2) - (this.sizeH)); //Vertical axis at start
    this.gameScoresList = [];
    this.gameScoresListJSON = [];
    this.draw = function() {
        return ctx.drawImage(Images["player_starship_1000"], 
            this.posX, this.posY, this.sizeW, this.sizeH);
    };
    this.setStartPos = function() {
        this.posX = 100; //Horizontal axis at start
        this.posY = ((game.canvas.height / 2) - (this.sizeH)); //Vertical axis at start
    };
    this.resetScore = function() {
        this.score = 0; 
    };
};

function Weapon() {
    this.sizeW =  40; //Width at start
    this.sizeH =  20; //Height at start
    this.posX = player.posX + player.sizeW; //Horizontal axis at start
    this.posY = player.posY + (player.sizeH / 2) - (this.sizeH / 2); //Vertical axis at start
    this.speed = -10;
    this.draw = function(newX, newY) {  
        this.posX -= newX;
        this.posY -= newY;
        return ctx.drawImage(Images["laser-bullet"], 
            this.posX, this.posY, this.sizeW, this.sizeH);
    };
}

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
        return ctx.drawImage(Images["enemy_astroid_400"], 
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
        setControls();
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
    player = new Player();
}

// ==== Run Game (Triggered by start-button) ====
function runGame() {
    game.run();
}

// ==== Reset Game ====
function resetGame() {
    game.reset();
}

// #endregion

// ==============================================================================================
// #region ==== G A M E   I N F O   B A R =======================================================
function updateDisplayInfo () {
    displayUserName();
    displayScore();
    $(".game-info-bar").css("display", "block");
}

function displayScore() {
    $(".score").html(`SCORE <span>${player.score}</span>`);
}

function displayUserName() {
    $(".user-name").html(`Welcome Captain <span>${player.userName}</span> Enjoy your Game!`);
}

// #endregion

// ==============================================================================================
// #region ==== H I G H   S C O R E =============================================================

function saveGameScore(userName_, score_, level_, gameEnd_) {

    let scoreToSave = {
    userName: userName_,
    score: score_,
    date: getDateTime(),
    level: level_,
    gameTime: "gameTime",
    gameEnd: gameEnd_
    };

    var scoreToSaveJSON = JSON.stringify(scoreToSave);
    
    //player.gameScoresList.push(scoreToSave);
    player.gameScoresListJSON.push(scoreToSaveJSON);
    localStorage.setItem("localHighScores", player.gameScoresList);
};

function displayHighScores() {
    /*var scoresList = localStorage.getItem("localHighScores");
    scoresList.forEach(entry => { 
        entryParsed = JSON.parse(entry);
        $(".high-scores-list").append(
        entry.score + " - " + 
        entry.userName + " - " + 
        entry.date + " - " + 
        entry.gameEnd + " on Level " + entry.level + 
        "<br>");
    });*/   
}

function getDateTime() {
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + currentdate.getMonth() + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    return datetime;
}

// #endregion

// ==============================================================================================
// #region ==== G A M E - L O O P ===============================================================

// ==== REQUEST ANIMATION FRAME LOOP ====
gameLoop = function() {
      
    game.canvas.width = document.documentElement.clientWidth;
    game.canvas.height = document.documentElement.clientHeight;

    //Clear Frame
    ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
        
    //Draw enemies
    create_enemies(enemyCount);
    enemiesArray.forEach(enemy => {
        drawEnemy(enemy);
    });

    bulletsArray.forEach(bullet => {
        drawBullet(bullet);
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

// ==== GAME STATES ==============================================================================

// **** PAUSED **************************************

function pauseGame() {
    $(".closeMe").css("display", "none");
    game.isPaused = true;
    timerStop();
    $(".game-paused").css("display", "block");
}

function inGameMenu() {
    $(".closeMe").css("display", "none");
    game.isPaused = true;
    timerStop(); 
    $(".in-game-menu").css("display", "block");
}

function unPauseGame() {
    $(".closeMe").css("display", "none");
    game.isPaused = false;
    timerStart();
    requestAnimationFrame(gameLoop);
}

// **** GAME OVER ************************************
function gameOver() {
    //saveGameScore(player.userName, player.score, game.level, "Game Over");
    $(".closeMe").css("display", "none");
    $(".game-over").css("display", "block");
}

// **** LEVEL CLEAR **********************************
function levelClear() {
    player.score += completeLevelScore;
    displayScore();
    //saveGameScore(player.userName, player.score, game.level, "Finished");
    $(".closeMe").css("display", "none");
    $(".level-clear").css("display", "block");
}

// #endregion

// ==============================================================================================
// #region ==== C O N T R O L S =================================================================

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
    var mrg_vrt = 30;               // Margin to top and bottom canvas borders 
    var mrg_hrz = 30;               // Margin to left and right canvas borders 
    var speed_vrt = playerSpeed;    // Speed of vertical movement 
    var speed_hrz = 0;              // Speed of horizontal movement

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

        // === In game menu ===  
        case 'Escape':
            if(!game.isPaused){
                inGameMenu();
            }
            else {
                unPauseGame();
            }
            break;
        
            // === In game menu ===  
         case 'Space':
            create_bullet();
     
            break;        

        // === Default ===  
        default:          
        //console.log(`Some other Key! var KeyStroke = ${key}`);
          break;
    }  
 }

 // #endregion

// ==============================================================================================
// #region ==== O N  S C R E E N  O B J E C T S =================================================


// ==== GENERIC GENERAL PURPOSE FUNCTIONS ===============================================================

// **** REMOVE OBJECTS FROM ARRAY OF OBJECTS ****
function  RemoveObjectFromArray(array, object) {
    array.splice(array.indexOf(object),1);
}

// **** TEST IF AN OBJECT IS COLLIDING/HITTING ANY OBJECTS IN AN ARRAY OF OBJECTS ****
function testForHit (array_, object_) {
    var array = array_;
    var object = object_;
    array.forEach(arrayObject => {    
        this.arrayObject = arrayObject;
         if (this.arrayObject.posX < object.posX + object.sizeW && this.arrayObject.posX + this.arrayObject.sizeW > object.posX && this.arrayObject.posY < object.posY + object.sizeH && this.arrayObject.posY + this.arrayObject.sizeH > object.posY) {
            RemoveObjectFromArray(array, this.arrayObject);
        }
    });
}


// ==== CREATE BULLET ===========================================================================
// Create an array of bullets
function create_bullet() {
        bulletsArray.push(new Weapon);
}

function drawBullet(bullet) {

    this.bullet = bullet;
    var index = bulletsArray.indexOf(bullet);

    testForHit(enemiesArray, this.bullet);

    if (this.bullet.posX >= game.canvas.width + this.bullet.sizeW ) {
        ctx.clearRect(this.bullet.posX, this.bullet.posY, this.bullet.sizeW, this.bullet.sizeH);
        delete bulletsArray[index]; 
        bulletsArray.length -= 1;
        console.log(bulletsArray.length);
    }
    /*else if (player.posX < this.enemy.posX + this.enemy.sizeW && player.posX + player.sizeW > this.enemy.posX && player.posY < this.enemy.posY + this.enemy.sizeH && player.posY + player.sizeH > this.enemy.posY) {
        this.enemy.draw(0,0);
    }*/
    else {
        this.bullet.draw(this.bullet.speed,0);
        
    }
}

// ==== CREATE ENEMY =============================================================================
// Create an array of random enemies
function create_enemies(max) {
    
    if (enemiesArray.length < max) {
        enemiesArray.push(random_enemy());
    }
}

// Draw, redraw and delete from canvas
function drawEnemy(enemy) {

    this.enemy = enemy;
      
    if (this.enemy.posX <= -this.enemy.sizeW) {
        player.score += 1;
        displayScore();
        RemoveObjectFromArray(enemiesArray, this.enemy);
    }
    else if (player.posX < this.enemy.posX + this.enemy.sizeW && player.posX + player.sizeW > this.enemy.posX && player.posY < this.enemy.posY + this.enemy.sizeH && player.posY + player.sizeH > this.enemy.posY) {
        timerStop();
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

// ==============================================================================================
// #region ==== G A M E  T I M E R ==============================================================
function timerStart() {
    timer.start(1000);
}

function timerStop() {
    timer.stop();
}

function timerReset(levelTimeOut) {
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

// #endregion

