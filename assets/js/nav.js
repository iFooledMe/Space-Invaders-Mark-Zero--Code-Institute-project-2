// ==============================================================================================
// ==== M E N U Functions ===============================================================

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

// ==== Get User Name and start game ====
function getUserNameAndStart() {
    var userName = document.getElementById("userName").value;
    newGame(userName);
}

// **** New Game ****
function newGame(userName) {
    resetGame(userName);
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

// **** Open User Name Form Button **** 
$(".open-form-button").click(function(){
    $(".closeMe").css("display", "none");
    $(".user-name-form").css("display", "block");
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

 // **** High Scores button **** 
$(".high-scores-button").click(function(){
    $(".closeMe").css("display", "none");
    $(".high-scores").css("display", "block");
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