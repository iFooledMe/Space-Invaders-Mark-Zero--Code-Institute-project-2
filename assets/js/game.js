// ==============================================================================================
// #region ==== R E Q U E S T  A N I M A T I O N  F R A M E  P O L Y F I L L ====================
// ==== http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// ==== http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// ==== requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// ==== MIT license
// ==============================================================================================
(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame =
            window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] ||
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
})();

//#endregion

// ==============================================================================================
// #region ==== G L O B A L   V A R I A B L E S =================================================
var ctx;
var game;
var player;

var bullets_array = [];
var enemiesArray = [];
var visualEffectsArray = [];
var messages_array = [];

// **** TIMERS ****************************************************************
var timer;
var messageTimer;
var rechargeTimer;

// ==== S E T T I N G S =========================================================================
var inGameMessageTime = 1;

// **** PLAYER ****
var playerSpeed = 5;
var playerHitPoints = 10;
var playerMaxEnergyPoints = 10;
var playerEnergyRechargeRate = 3; //seconds to recharge 1 energy point

// **** WEAPON ****
var weaponSpeed = -10;
var weaponDamage = 1;
var weaponEnergyCost = 1;
var weaponFireMode = 1; //How many bullets fired in burst on keydown

// **** SCORE ****
var completeLevelScore = 50;

// **** LEVEL MODIFIERS ****
var levelCountdownTime = 30; //In seconds
var enemyCount = 10;
var enemyDamageModifier = 1;
var enemyHitPointsModifier = 1;
var enemySpeedModifier = 1;

//#endregion

// ==============================================================================================
// #region ==== G A M E - O B J E C T S =========================================================

// .... GAME ...................................................................................
function Game() {
    this.canvas = null;
    this.context = null;
    this.width = null;
    this.height = null;
    this.create = function (canvasId, width, height) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');
        return this.context;
    };
    this.isPaused = true;
    this.isOver = false;
    this.level = 1;
    this.levelClear = false;
    this.run = function () {
        this.isPaused = false;
        this.isOver = false;
        this.levelClear = false;
        timerStart();
        window.requestAnimationFrame(gameLoop);
    };
    this.reset = function () {
        ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
        visualEffectsArray.length = 0;
        bullets_array.length = 0;
        enemiesArray.length = 0;
        resetAllTimers();
        player.setStartPos();
        player.reset();
    };
    this.nextLevel = function () {
        ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
        visualEffectsArray.length = 0;
        bullets_array.length = 0;
        enemiesArray.length = 0;
        messages_array.length = 0;
        resetAllTimers();
        2;
        player.setStartPos();
        player.nextLevelSet();
        this.level += 1;
    };
}

// .... PLAYER ..................................................................................
function Player() {
    this.userName = 'User Name not set';
    this.score = 0;
    this.energy = playerMaxEnergyPoints;
    this.hitPoints = playerHitPoints;
    this.sizeW = 160; //Width at start
    this.sizeH = 80; //Height at start
    this.posX = 100; //Horizontal axis at start
    this.posY = game.canvas.height / 2 - this.sizeH; //Vertical axis at start
    this.gameScoresList = [];
    this.gameScoresListJSON = [];
    this.draw = function () {
        return ctx.drawImage(
            Images['player_starship_1000'],
            this.posX,
            this.posY,
            this.sizeW,
            this.sizeH
        );
    };
    this.setStartPos = function () {
        this.posX = 100; //Horizontal axis at start
        this.posY = game.canvas.height / 2 - this.sizeH; //Vertical axis at start
    };
    this.reset = function () {
        this.score = 0;
        this.hitPoints = playerHitPoints;
        this.energy = playerMaxEnergyPoints;
    };
    this.nextLevelSet = function () {
        this.hitPoints = playerHitPoints;
        this.energy = playerMaxEnergyPoints;
    };
}

// .... WEAPON ..................................................................................
function Weapon() {
    this.sizeW = 30; //Width at start
    this.sizeH = 5; //Height at start
    this.posX = player.posX + player.sizeW; //Horizontal axis at start
    this.posY = player.posY + player.sizeH / 2 - this.sizeH / 2; //Vertical axis at start
    this.speed = weaponSpeed;
    this.damage = weaponDamage;
    this.energyCost = weaponEnergyCost;
    this.draw = function (newX, newY) {
        this.posX -= newX;
        this.posY -= newY;
        return ctx.drawImage(
            Images['laser-bullet'],
            this.posX,
            this.posY,
            this.sizeW,
            this.sizeH
        );
    };
}

// .... ENEMY ..................................................................................
function Enemy(posY, size, speed) {
    this.size = size;
    this.sizeW;
    this.sizeH; //Height at start
    this.posX = game.canvas.width; //Horizontal axis at start
    this.posY = posY; //Vertical axis at start
    this.speed = speed * enemySpeedModifier;
    this.damage;
    this.hitPoints;
    this.image;
    this.passScore = Math.round(this.size * this.speed);
    this.destroyScore;
    this.crashScorePenalty;
    this.hitScore;
    this.draw = function (newX, newY) {
        this.posX -= newX;
        this.posY -= newY;
        return ctx.drawImage(
            Images[this.image],
            this.posX,
            this.posY,
            this.sizeW,
            this.sizeH
        );
    };
    this.setSizeProps = function () {
        if (this.size == 1) {
            (this.sizeW = 20), (this.sizeH = 20);
            this.image = 'enemy_astroid_20';
            this.setDmgHP(this.size);
            this.getHitDestroyScore(this.size, this.speed);
        } else if (this.size == 2) {
            (this.sizeW = 50), (this.sizeH = 50);
            this.image = 'enemy_astroid_50';
            this.setDmgHP(this.size);
            this.getHitDestroyScore(this.size, this.speed);
        } else if (this.size == 3) {
            (this.sizeW = 100), (this.sizeH = 100);
            this.image = 'enemy_astroid_100';
            this.setDmgHP(this.size);
            this.getHitDestroyScore(this.size, this.speed);
        } else if (this.size == 4) {
            (this.sizeW = 200), (this.sizeH = 200);
            this.image = 'enemy_astroid_200';
            this.setDmgHP(this.size);
            this.getHitDestroyScore(this.size, this.speed);
        } else if (this.size == 5) {
            (this.sizeW = 300), (this.sizeH = 300);
            this.image = 'enemy_astroid_300';
            this.setDmgHP(this.size);
            this.getHitDestroyScore(this.size, this.speed);
        } else {
            console.log('No enemy size (1-5) is set!');
        }
    };
    this.setDmgHP = function (size) {
        this.damage = size * enemyDamageModifier;
        this.hitPoints = size * enemyHitPointsModifier;
    };
    this.getHitDestroyScore = function (size, speed) {
        if (this.size == 5) {
            this.hitScore = Math.round((1 * this.speed) / 5);
            this.destroyScore = Math.round(1 * this.speed);
            if (this.speed == 5) {
                this.crashScorePenalty = -1;
            } else if (this.speed == 4) {
                this.crashScorePenalty = -2;
            } else if (this.speed == 3) {
                this.crashScorePenalty = -3;
            } else if (this.speed == 2) {
                this.crashScorePenalty = -4;
            } else if (this.speed == 1) {
                this.crashScorePenalty = -5;
            } else this.crashScorePenalty = 0;
        } else if (this.size == 4) {
            this.hitScore = Math.round((2 * this.speed) / 5);
            this.destroyScore = Math.round(2 * this.speed);
            if (this.speed == 5) {
                this.crashScorePenalty = -6;
            } else if (this.speed == 4) {
                this.crashScorePenalty = -7;
            } else if (this.speed == 3) {
                this.crashScorePenalty = -8;
            } else if (this.speed == 2) {
                this.crashScorePenalty = -9;
            } else if (this.speed == 1) {
                this.crashScorePenalty = -10;
            } else this.crashScorePenalty = 0;
        } else if (this.size == 3) {
            this.hitScore = Math.round((3 * this.speed) / 5);
            this.destroyScore = Math.round(3 * this.speed);
            if (this.speed == 5) {
                this.crashScorePenalty = -11;
            } else if (this.speed == 4) {
                this.crashScorePenalty = -12;
            } else if (this.speed == 3) {
                this.crashScorePenalty = -13;
            } else if (this.speed == 2) {
                this.crashScorePenalty = -14;
            } else if (this.speed == 1) {
                this.crashScorePenalty = -15;
            } else this.crashScorePenalty = 0;
        } else if (this.size == 2) {
            this.hitScore = Math.round((4 * this.speed) / 5);
            this.destroyScore = Math.round(4 * this.speed);
            if (this.speed == 5) {
                this.crashScorePenalty = -16;
            } else if (this.speed == 4) {
                this.crashScorePenalty = -17;
            } else if (this.speed == 3) {
                this.crashScorePenalty = -18;
            } else if (this.speed == 2) {
                this.crashScorePenalty = -19;
            } else if (this.speed == 1) {
                this.crashScorePenalty = -20;
            } else this.crashScorePenalty = 0;
        } else if (this.size == 1) {
            this.hitScore = Math.round((5 * this.speed) / 5);
            this.destroyScore = Math.round(5 * this.speed);
            if (this.speed == 5) {
                this.crashScorePenalty = -21;
            } else if (this.speed == 4) {
                this.crashScorePenalty = -22;
            } else if (this.speed == 3) {
                this.crashScorePenalty = -23;
            } else if (this.speed == 2) {
                this.crashScorePenalty = -24;
            } else if (this.speed == 1) {
                this.crashScorePenalty = -25;
            } else this.crashScorePenalty = 0;
        } else {
            (this.hitScore = 0), (this.destroyScore = 0);
        }
    };
}

// .... VISUAL EFFECT ...........................................................................
function VisualEffect(posX, posY, sizeW, sizeH, type, framesPerImg, source) {
    this.sizeW = sizeW;
    this.sizeH = sizeH;
    this.sizeScaleW = 5;
    this.sizeScaleH = 3;
    this.posX = posX;
    this.posY = posY;
    this.frameCounter = 0;
    this.imageCounter = 0;
    this.type = type;
    this.framesPerImg = framesPerImg;
    this.source = source;
    this.draw = function (visualEffect) {
        this.visualEffect = visualEffect;
        if (this.type == 'static') {
            this.drawStatic(this.visualEffect);
        } else if (this.type == 'animation') {
            //runAnimation not working properly at the moment, do not use!
            this.runAnimation(this.visualEffect);
        } else {
            console.log('Visual effect type not set!');
        }
    };

    this.drawStatic = function (visualEffect) {
        this.visualEffect = visualEffect;
        if (this.frameCounter < this.framesPerImg) {
            return ctx.drawImage(
                Images[this.source],
                this.posX,
                this.posY,
                this.sizeW,
                this.sizeH
            );
        } else {
            RemoveObjectFromArray(visualEffectsArray, this.visualEffect);
        }
    };

    this.runAnimation = function (visualEffect) {
        this.visualEffect = visualEffect;
        if (this.imageCounter <= this.source.length) {
            if (this.frameCounter < this.framesPerImg) {
                //console.log(Images[this.source[this.imageCounter].toString()]);
                return ctx.drawImage(
                    Images[this.source[this.imageCounter].toString()],
                    this.posX,
                    this.posY,
                    this.sizeW,
                    this.sizeH
                );
            } else {
                this.frameCounter = 0;
                this.imageCounter += 1;
            }
        } else {
            RemoveObjectFromArray(visualEffectsArray, this.visualEffect);
        }
    };
}

// .... SOUND EFFECTS (Multiple simultanious channels)...........................................................................
// .... Source: Tim Cotten - https://blog.cotten.io/playing-audio-resources-simultaneously-in-javascript-546ec4d6216a
// ...................................................................................................................

function Channel(audio_uri) {
    this.audio_uri = audio_uri;
    this.resource = new Audio(audio_uri);
}

Channel.prototype.play = function () {
    // Try refreshing the resource altogether
    this.resource.play();
};

function Switcher(audio_uri, num) {
    this.channels = [];
    this.num = num;
    this.index = 0;

    for (var i = 0; i < num; i++) {
        this.channels.push(new Channel(audio_uri));
    }
}

Switcher.prototype.play = function () {
    this.channels[this.index++].play();
    this.index = this.index < this.num ? this.index : 0;
};

Sound = (function () {
    var self = {};

    self.playLaser_SFX = function () {
        sfx_laser.play();
    };

    self.playExplosion_SFX = function () {
        let random = getRndInteger(1, 3);
        switch (random) {
            case 1:
                sfx_explosion1.play();
                break;
            case 2:
                sfx_explosion2.play();
                break;
            case 3:
                sfx_explosion3.play();
                break;
            default:
                sfx_explosion3.play();
        }
    };

    self.playBulletHit_SFX = function () {
        sfx_bulletHit1.play();
    };

    self.playNoEnergy_SFX = function () {
        sfx_no_energy.play();
    };

    self.init = function () {
        sfx_laser = new Switcher('assets/sound/laser1.mp3', 10);
        sfx_explosion1 = new Switcher('assets/sound/explosion1.mp3', 10);
        sfx_explosion2 = new Switcher('assets/sound/explosion2.mp3', 10);
        sfx_explosion3 = new Switcher('assets/sound/explosion3.mp3', 10);
        sfx_bulletHit1 = new Switcher('assets/sound/bulletHit1.mp3', 10);
        sfx_no_energy = new Switcher('assets/sound/no_energy.wav', 10);
    };

    return self;
})();

// #endregion

// ==============================================================================================
// #region ==== S T A R T =======================================================================

// ==== Preload resources and Main entry point ====
preload(preLoadList, function () {
    $(document).ready(function () {
        setUpGame();
        setControls();
        Sound.init();
        //laser_sound_1 = new soundEffect("assets/sound/laser1.mp3");
        displayMainMenu();
    });
});

// ==== SetUp Game (New game object and context) ====
function setUpGame() {
    game = new Game();
    var width = document.documentElement.clientWidth;
    var height = document.documentElement.clientHeight;
    ctx = game.create('canvas-1', width, height);
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

// ==== Reset Game ====
function resetGame() {
    game.reset();
}

// #endregion

// ==============================================================================================
// #region ==== G A M E - L O O P ===============================================================

gameLoop = function () {
    // ==== CANVAS SETTINGS ======================================================================

    //Dynamically set the canvas size to match client size
    game.canvas.width = document.documentElement.clientWidth;
    game.canvas.height = document.documentElement.clientHeight;

    //Clear Frame
    ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);

    //Image Smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // ==== GET PLAYER CONTROL INPUT ===============================================================
    getPlayerInput();

    // ==== UPDATE TIMERS ==========================================================================
    //Check for need to recharge energy
    rechargeCheck();

    //In game timer updates
    showTimers();

    //Updates Display values
    updateDisplayInfo();

    // ==== UPDATE OBJECTS IN THE FRAME ==========================================================
    //Draw enemies..........................................................
    create_enemies(enemyCount);
    enemiesArray.forEach((enemy) => {
        drawEnemy(enemy);
    });

    //Draw player...........................................................
    player.draw();

    //Draw bullets..........................................................

    bullets_array.forEach((bullet) => {
        drawBullet(bullet);
    });

    //Draw visual effects...................................................
    visualEffectsArray.forEach((visualEffect) => {
        this.visualEffect = visualEffect;
        drawVisualEffect(this.visualEffect);
    });

    // ==== ACTIVATE A GAMESTATE OR CONTINUE RUNNING BY REQUESTING THE NEXT FRAME ===============
    if (game.isOver) {
        gameOver();
    } else if (game.levelClear) {
        levelClear();
    } else if (game.isPaused) {
        console.log('Game Paused');
    } else {
        window.requestAnimationFrame(gameLoop);
    }
};

// ==== GAME STATES ==============================================================================

// **** PAUSED **************************************

function pauseGame() {
    $('.closeMe').css('display', 'none');
    game.isPaused = true;
    timerStop();
    $('.game-paused').css('display', 'block');
}

function inGameMenu() {
    $('.closeMe').css('display', 'none');
    game.isPaused = true;
    timerStop();
    $('.in-game-menu').css('display', 'block');
}

function unPauseGame() {
    $('.closeMe').css('display', 'none');
    game.isPaused = false;
    timerStart();
    requestAnimationFrame(gameLoop);
}

// **** GAME OVER ************************************
function gameOver() {
    //saveGameScore(player.userName, player.score, game.level, "Game Over");
    $('.closeMe').css('display', 'none');
    $('.game-over').css('display', 'block');
}

// **** LEVEL CLEAR **********************************
function levelClear() {
    player.score += completeLevelScore;
    displayScore();
    //saveGameScore(player.userName, player.score, game.level, "Finished");
    $('.closeMe').css('display', 'none');
    $('.level-clear').css('display', 'block');
}

// #endregion

// ==============================================================================================
// #region ==== O N  S C R E E N  O B J E C T S =================================================

// ==== GENERIC GENERAL PURPOSE FUNCTIONS ===============================================================

// **** REMOVE OBJECTS FROM ARRAY OF OBJECTS ****
function RemoveObjectFromArray(array, object) {
    array.splice(array.indexOf(object), 1);
}

// **** TEST IF AN OBJECT IS HITTING ANY OBJECTS IN AN ARRAY OF OBJECTS ****
function testForHit(arrayObjectsToHit_, objectTryHit_, arrayObjectTryHit_) {
    arrayObjectsToHit = arrayObjectsToHit_;
    arrayObjectTryHit = arrayObjectTryHit_;
    this.objectTryHit = objectTryHit_;
    arrayObjectsToHit.forEach((arrayObject) => {
        this.arrayObject = arrayObject;
        if (
            this.arrayObject.posX <
                this.objectTryHit.posX + this.objectTryHit.sizeW &&
            this.arrayObject.posX + this.arrayObject.sizeW >
                this.objectTryHit.posX &&
            this.arrayObject.posY <
                this.objectTryHit.posY + this.objectTryHit.sizeH &&
            this.arrayObject.posY + this.arrayObject.sizeH >
                this.objectTryHit.posY
        ) {
            this.arrayObject.hitPoints -= this.objectTryHit.damage;
            if (this.arrayObject.hitPoints <= 0) {
                player.score += this.arrayObject.destroyScore;
                create_visualEffect(
                    this.arrayObject.posX,
                    this.arrayObject.posY,
                    this.arrayObject.sizeW * 2,
                    this.arrayObject.sizeH * 2,
                    'static',
                    15,
                    'static_explosion_1'
                );
                Sound.playBulletHit_SFX();
                Sound.playExplosion_SFX();
                RemoveObjectFromArray(arrayObjectsToHit, this.arrayObject);
                RemoveObjectFromArray(bullets_array, this.objectTryHit);
            } else {
                create_visualEffect(
                    this.objectTryHit.posX,
                    this.objectTryHit.posY,
                    this.objectTryHit.sizeW * 2,
                    this.objectTryHit.sizeH * 5,
                    'static',
                    15,
                    'static_explosion_1'
                );
                Sound.playBulletHit_SFX();
                RemoveObjectFromArray(bullets_array, this.objectTryHit);
                player.score += this.arrayObject.hitScore;
            }
        }
    });
}

// ==== CREATE VISUAL EFFECT ===========================================================================
// Create an array of bullets
function create_visualEffect(
    targetPosX,
    targetPosY,
    targetSizeW,
    targetSizeH,
    type,
    framesPerImg,
    source
) {
    visualEffectsArray.push(
        new VisualEffect(
            targetPosX,
            targetPosY,
            targetSizeW,
            targetSizeH,
            type,
            framesPerImg,
            source
        )
    );
}

function drawVisualEffect(visualEffect) {
    this.visualEffect = visualEffect;
    this.visualEffect.frameCounter += 1;
    this.visualEffect.draw(this.visualEffect);
}

// ==== CREATE BULLET ===========================================================================
// Create an array of bullets
function create_bullet() {
    if (player.energy >= weaponEnergyCost) {
        bullets_array.push(new Weapon());
        playerCannonInCoolDown = true;
        player.energy -= weaponEnergyCost;
        Sound.playLaser_SFX();
    } else {
        Sound.playNoEnergy_SFX();
        showMessage('Out of energy!');
    }
}

function drawBullet(bullet) {
    this.bullet = bullet;

    testForHit(enemiesArray, this.bullet, bullets_array);

    if (this.bullet.posX >= game.canvas.width + this.bullet.sizeW) {
        RemoveObjectFromArray(bullets_array, this.bullet);
    } else {
        this.bullet.draw(this.bullet.speed, 0);
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
        player.score += this.enemy.passScore;
        RemoveObjectFromArray(enemiesArray, this.enemy);
    } else if (
        player.posX < this.enemy.posX + this.enemy.sizeW &&
        player.posX + player.sizeW > this.enemy.posX &&
        player.posY < this.enemy.posY + this.enemy.sizeH &&
        player.posY + player.sizeH > this.enemy.posY
    ) {
        player.hitPoints -= this.enemy.damage;
        displayHitPoints();
        if (player.hitPoints <= 0) {
            timerStop();
            create_visualEffect(
                this.enemy.posX,
                this.enemy.posY,
                this.enemy.sizeW,
                this.enemy.sizeH,
                'animation',
                6,
                explosion1_animation_array
            );
            Sound.playExplosion_SFX();
            create_visualEffect(
                player.posX - player.sizeW,
                player.posY - player.sizeH,
                player.sizeW * 3,
                player.sizeH * 3,
                'static',
                15,
                'static_explosion_1'
            );
            Sound.playExplosion_SFX();
            game.isOver = true;
        } else {
            create_visualEffect(
                this.enemy.posX,
                this.enemy.posY,
                this.enemy.sizeW,
                this.enemy.sizeH,
                'static',
                15,
                'static_explosion_1'
            );
            Sound.playExplosion_SFX();
            RemoveObjectFromArray(enemiesArray, this.enemy);
            player.score += this.enemy.crashScorePenalty;
            console.log(
                'Crash score penalty: ' +
                    this.enemy.crashScorePenalty +
                    ' - Size:' +
                    this.enemy.size +
                    ' Speed: ' +
                    this.enemy.speed
            );
        }
    } else {
        this.enemy.draw(this.enemy.speed, 0);
    }
}

// Return a enemy object with random properties
function random_enemy() {
    var y,
        speed,
        size = null; //reset
    y = getRndInteger(50, game.canvas.height);
    speed = getRndInteger(1, 5);
    size = randomSize();

    function randomSize() {
        var rndSize = getRndInteger(1, 100);
        if (rndSize <= 10) {
            return 1;
        } else if (rndSize > 10 && rndSize <= 50) {
            return 2;
        } else if (rndSize > 50 && rndSize <= 90) {
            return 3;
        } else if (rndSize > 90 && rndSize <= 98) {
            return 4;
        } else if (rndSize > 98) {
            return 5;
        } else {
            return 3;
        }
    }

    var newEnemy = new Enemy(y, size, speed);
    newEnemy.setSizeProps();
    return newEnemy;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// #endregion

// ==============================================================================================
// #region ==== C O N T R O L S =================================================================
var keys = [];
var key;
var pKeyOn = false;
var mrg_vrt = 30; // Margin to top and bottom canvas borders
var mrg_hrz = 30; // Margin to left and right canvas borders
var bulletsFired = 0;

function setControls() {
    window.addEventListener('keydown', function (e) {
        keys[e.keyCode] = true;
        key = e.keyCode;
        menuButtons(key);
    });
    window.addEventListener('keyup', function (e) {
        keys[e.keyCode] = false;
    });
}

function getPlayerInput() {
    // **** Arrow up - Move up ****
    if (keys[38]) {
        if (player.posY >= mrg_vrt + 50) {
            player.posY -= playerSpeed;
        }
    }

    // **** Arrow down - Move down ****
    if (keys[40]) {
        if (player.posY <= game.canvas.height - player.sizeH - mrg_vrt) {
            player.posY += playerSpeed;
        }
    }

    // **** Space - Shoot ****
    if (keys[32]) {
        if (bulletsFired < weaponFireMode) {
            for (var i = 1; i <= weaponFireMode; i++) {
                create_bullet();
                bulletsFired++;
                console.log(bulletsFired);
            }
        }
    }

    if (!keys[32]) {
        bulletsFired = 0;
    }
}

function menuButtons(key) {
    switch (key) {
        // === Pause ===
        case 80:
            if (!game.isPaused) {
                pauseGame();
            } else {
                unPauseGame();
            }
            break;

        // === In game menu ===
        case 27:
            if (!game.isPaused) {
                inGameMenu();
            } else {
                unPauseGame();
            }
            break;

        // === Default ===
        default:
            break;
    }
}

// #endregion

// ==============================================================================================
// #region ==== G A M E   I N F O   B A R =======================================================
function updateDisplayInfo() {
    displayUserName();
    displayScore();
    displayHitPoints();
    displayEnergyPoints();
    displayLevel();
    $('.game-info-bar').css('display', 'block');
}

function displayScore() {
    var scoreStr = '' + Math.abs(player.score);
    var length = 5;

    while (scoreStr.length < length) {
        scoreStr = '0' + scoreStr;
    }

    function checkNeg() {
        if (player.score < 0) {
            $('.negSign').css('display', 'block');
        } else {
            $('.negSign').css('display', 'none');
        }
    }
    checkNeg();
    $('.score').html(`${scoreStr}`);
}

function displayUserName() {
    $('.userName').html(
        `Welcome Captain<br><span class="highlight">${player.userName}</span><br> Enjoy your Game!`
    );
}

function displayHitPoints() {
    if (player.hitPoints < 0) {
        player.hitPoints = 0;
    }
    $('.hitpoints').html(`${player.hitPoints}`);
}

function displayEnergyPoints() {
    $('.energypoints').html(`${player.energy}`);
}

function displayLevel() {
    $('.level').html(`${game.level}`);
}

// #endregion

// ==============================================================================================
// #region ==== G A M E  T I M E R ==============================================================

// **** DISPLAY TIMERS (updates every frame in gameLoop) ****************************************
function showTimers() {
    var gameTime = timer.getTime();
    var rechargeTime = rechargeTimer.getTime();

    showTime(gameTime, '.gameTimer');
    showRechargeTime(rechargeTime);

    function showTime(time, targetClass) {
        var second = time % 60;
        var minute = Math.floor(time / 60) % 60;
        var hour = Math.floor(time / 3600) % 60;

        second = second < 10 ? '0' + second : second;
        minute = minute < 10 ? '0' + minute : minute;
        hour = hour < 10 ? '0' + hour : hour;

        targetSec = targetClass + ' span.second';
        targetMin = targetClass + ' span.minute';
        targetHour = targetClass + ' span.hour';

        $(targetSec).html(second);
        $(targetMin).html(minute);
        $(targetHour).html(hour);
    }

    function showRechargeTime(rechargeTime) {
        if (player.energy < playerMaxEnergyPoints) {
            $('.energyTimer').html(
                `Recharging... <span>${rechargeTime}</span> sec`
            );
        } else {
            $('.energyTimer').html(`Fully recharged`);
        }
    }
}

//Timers reset
function resetAllTimers() {
    timer.reset(levelCountdownTime);
    rechargeTimer.reset(playerEnergyRechargeRate);
    rechargeIsRunning = false;
    messages_array.length = 0;
}

// **** GAME LEVEL TIMER ****************************************************************
function timerStart() {
    timer.start(1000);
}

function timerStop() {
    timer.stop();
}

function timerReset() {
    timer.reset(levelCountdownTime);
}

timer = new _timer(function (time) {
    if (time == 0) {
        timer.stop();
        game.levelClear = true;
    }
});
timer.reset(0);
timer.mode(0);

// **** IN GAME INFO MESSAGE TIMER ****************************************************
function showMessage(message) {
    $('.in-game-message').css('display', 'block');
    $('.in-game-message-display').html(`${message}`);
    messageTimer.reset(inGameMessageTime);
    messageTimer.start(1000);
}

messageTimer = new _timer(function (time) {
    if (time == 0) {
        messageTimer.stop();
        $('.in-game-message').css('display', 'none');
    }
});
messageTimer.mode(0);

// **** RECHARGE ENERGY POINTS TIMER ****************************************************
var rechargeIsRunning = false;
function rechargeCheck() {
    if (player.energy < playerMaxEnergyPoints && !rechargeIsRunning) {
        rechargeTimer.reset(playerEnergyRechargeRate);
        rechargeIsRunning = true;
        rechargeTimer.start(1000);
    }
}

rechargeTimer = new _timer(function (time) {
    if (time == 0) {
        if (player.energy < playerMaxEnergyPoints) {
            player.energy += 1;
            rechargeTimer.stop();
            rechargeTimer.reset(playerEnergyRechargeRate);
            rechargeIsRunning = false;
        }
    }
});
rechargeTimer.reset(0);
rechargeTimer.mode(0);

// #endregion

// ==============================================================================================
// #region ==== G A M E  T I M E R - S O U R C E  C O D E =======================================
// ==== Source: da vinci harsha - https://codepen.io/davinciharsha/pen/vGBXzR ===================
function _timer(callback) {
    var time = 0; //  The default time of the timer
    var mode = 0; //    Mode: count up or count down
    var status = 0; //    Status: timer is running or stoped
    var timer_id; //    This is used by setInterval function

    // this will start the timer ex. start the timer with 1 second interval timer.start(1000)
    this.start = function (interval) {
        interval = typeof interval !== 'undefined' ? interval : 1000;

        if (status == 0) {
            status = 1;
            timer_id = setInterval(function () {
                switch (mode) {
                    default:
                        if (time) {
                            time--;
                            generateTime();
                            if (typeof callback === 'function') callback(time);
                        }
                        break;

                    case 1:
                        if (time < 86400) {
                            time++;
                            generateTime();
                            if (typeof callback === 'function') callback(time);
                        }
                        break;
                }
            }, interval);
        }
    };

    //  Same as the name, this will stop or pause the timer ex. timer.stop()
    this.stop = function () {
        if (status == 1) {
            status = 0;
            clearInterval(timer_id);
        }
    };

    // Reset the timer to zero or reset it to your own custom time ex. reset to zero second timer.reset(0)
    this.reset = function (sec) {
        sec = typeof sec !== 'undefined' ? sec : 0;
        time = sec;
        generateTime(time);
    };

    // Change the mode of the timer, count-up (1) or countdown (0)
    this.mode = function (tmode) {
        mode = tmode;
    };

    // This methode return the current value of the timer
    this.getTime = function () {
        return time;
    };

    // This methode return the current mode of the timer count-up (1) or countdown (0)
    this.getMode = function () {
        return mode;
    };

    // This methode return the status of the timer running (1) or stoped (1)
    this.getStatus;
    {
        return status;
    }

    // This methode will render the time variable to hour:minute:second format
    function generateTime() {
        var second = time % 60;
        var minute = Math.floor(time / 60) % 60;
        var hour = Math.floor(time / 3600) % 60;

        second = second < 10 ? '0' + second : second;
        minute = minute < 10 ? '0' + minute : minute;
        hour = hour < 10 ? '0' + hour : hour;

        $('div.timer span.second').html(second);
        $('div.timer span.minute').html(minute);
        $('div.timer span.hour').html(hour);
    }
}

// #endregion

// ==============================================================================================
// #region ==== H I G H   S C O R E =============================================================

function saveGameScore(userName_, score_, level_, gameEnd_) {
    var scoreToSave = {
        userName: userName_,
        score: score_,
        date: getDateTime(),
        level: level_,
        gameTime: 'gameTime',
        gameEnd: gameEnd_,
    };

    var scoreToSaveJSON = JSON.stringify(scoreToSave);

    //player.gameScoresList.push(scoreToSave);
    player.gameScoresListJSON.push(scoreToSaveJSON);
    localStorage.setItem('localHighScores', player.gameScoresList);
}

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
    var datetime =
        currentdate.getDate() +
        '/' +
        currentdate.getMonth() +
        '/' +
        currentdate.getFullYear() +
        ' ' +
        currentdate.getHours() +
        ':' +
        currentdate.getMinutes() +
        ':' +
        currentdate.getSeconds();
    return datetime;
}

// #endregion
