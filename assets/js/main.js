// ==== Global variables ====================================================================
var paused = true;

// ==== Images pre-load =====================================================================
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

loadImages([{
    name: "player_starship",
    url: "assets/images/spaceship-200x100.png",
},{
    name: "weirdCircles",
    url: "http://www.nasa.gov/images/content/498887main_Fermi_bubble_art_no_labels.jpg"
}]);

// ==== START =====================================================================================
function start(){
  var ctx = $("canvas")[0].getContext("2d");
  ctx.drawImage(Images["player_starship"], 100, 300, 60, 40);
}

//some jQuery stuff that is not related
$(".game-info-bar button").click(function(){
    
    if (paused){
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











