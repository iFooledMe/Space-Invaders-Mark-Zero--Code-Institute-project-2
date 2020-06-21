

// ===============================================================
// #region M E N U Functions =====================================

// **** Display Main Menu ****
function displayMainMenu() {
    $(".game-info-bar").css("display", "none");
    $(".main-menu").css("display", "block");
}

// **** Open Main Menu (from within a game) ****
function quitToMenu() {
    resetGame();
    $(".closeMe").css("display", "none");
    displayMainMenu();
}

// **** back to Main Menu ****
function backToMenu() {
    $(".closeMe").css("display", "none");
    displayMainMenu();
}
  

// ==== Get User Name and start game ====
function getUserNameAndStart() {
    $(".closeMe").css("display", "none");
    var userName = document.getElementById("userName").value;
    player.userName = userName;
    resetGame();
    runGame();
}

//#endregion

// ===============================================================
// #region M E N U Buttons =======================================

// **** Start Game Button **** 
$(".start-game-button").click(function(){
    getUserNameAndStart();
 });


// **** Open User Name Form Button **** 
$(".open-form-button").click(function(){
    $(".closeMe").css("display", "none");
    $(".user-name-form").css("display", "block");
 });

// **** Reset button **** 
$(".reset-button").click(function(){
    resetGame(player.name);
    $(".closeMe").css("display", "none");
    runGame();  
});

// **** New Level button **** 
$(".next-level-button").click(function(){
    nextLevel(player.name);
    $(".closeMe").css("display", "none");
    runGame();  
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
    displayHighScores();
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

 //#endregion