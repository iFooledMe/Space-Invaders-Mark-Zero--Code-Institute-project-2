// =============================================================================================
// ==          Source: Derek Leung - http://jsfiddle.net/DerekL/uCQAH/                        ==
//#region ==== P R E - L O A D =================================================================

var Images = {};

//

function preload(list, callback){
    var total = 0;

    $(".load-page").css("display", "block");
    
    for(var i = 0; i < list.length; i++){
        var img = new Image();
        Images[list[i].name] = img;
        $(".total-to-load").html(list.length);
        
        img.onload = function(){
            total++;
            $(".load-counter").html(total);
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
    {   name: "player_starship_100",
        url: "assets/images/spaceship2_100x50.png"          },
    {   name: "player_starship_120",
        url: "assets/images/spaceship2_120x60.png"          },
    {   name: "player_starship_250",
        url: "assets/images/spaceship2_250x125.png"         },
    {   name: "player_starship_500",
        url: "assets/images/spaceship2_500x250.png"         },
    {   name: "player_starship_1000",
        url: "assets/images/spaceship2_1000x500.png"        },
    {   name: "enemy_astroid_20",
        url: "assets/images/astroid1_20x20.png"             },
    {   name: "enemy_astroid_50",
        url: "assets/images/astroid1_50x50.png"             },
    {   name: "enemy_astroid_100",
        url: "assets/images/astroid1_100x100.png"           },
    {   name: "enemy_astroid_200",
        url: "assets/images/astroid1_200x200.png"           },
    {   name: "enemy_astroid_300",
        url: "assets/images/astroid1_300x300.png"           },
    {   name: "enemy_astroid_400",
        url: "assets/images/astroid1_400x400.png"           },
    {   name: "bg-1",
        url: "assets/images/bg-space1-2560x1700.jpg"        },
    {   name: "bg-2",
        url: "assets/images/bg-space2-2560x1700.jpg"         },
    {   name: "bg-3",
        url: "assets/images/bg-space3-2560x1700.jpg"         },
    {   name: "bg-4",
        url: "assets/images/bg-space4-2560x1700.jpg"         },
    {   name: "bg-5",
        url: "assets/images/bg-space5-2560x1700.jpg"         },
    {   name: "bg-6",
        url: "assets/images/bg-space6-2560x1700.jpg"         },
    {   name: "bg-7",
        url: "assets/images/bg-space7-2560x1700.jpg"         },
    {   name: "bg-8",
        url: "assets/images/bg-space8-2560x1700.jpg"         },
    {   name: "bg-9",
        url: "assets/images/bg-space9-2560x1700.jpg"         },
    {   name: "lg-1",
        url: "assets/images/large1.jpg"                      },
    {   name: "lg-2",
        url: "assets/images/large2.jpg"                      },
    {   name: "lg-3",
        url: "assets/images/large3.jpg"                      }
]