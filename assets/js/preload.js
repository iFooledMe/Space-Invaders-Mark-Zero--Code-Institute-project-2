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

// =============================================================================================
// ==== PRELOAD LIST ===========================================================================
var preLoadList = [   
    
    // #region ==== PLAYER IMAGES ==============================================================
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
    // #endregion

    // #region ==== HOSTILE OBJECTS ============================================================
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
    // #endregion

    // #region ==== BACKGROUND IMAGES ==========================================================
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
    // #endregion
    
    // #region ==== WEAPONS ====================================================================
    {   name: "laser-bullet",
        url: "assets/images/laser_bullet_40x20.png"          },
    // #endregion
    
    // #region ==== VISUAL EFFECTS =============================================================
    {   name: "static_explosion_1",
        url: "assets/images/explosion_1_400x400.png"          },
   // #endregion

    // #region ==== ANIMATION - EXPLODE_1 ======================================================
        {   name: "animation_explosion_1_1",
        url: "assets/images/animation_explosion_1/1.png"     },
        {   name: "animation_explosion_1_2",
        url: "assets/images/animation_explosion_1/2.png"     },
        {   name: "animation_explosion_1_3",
        url: "assets/images/animation_explosion_1/3.png"     },
        {   name: "animation_explosion_1_4",
        url: "assets/images/animation_explosion_1/4.png"     },
        {   name: "animation_explosion_1_5",
        url: "assets/images/animation_explosion_1/5.png"     },
        {   name: "animation_explosion_1_6",
        url: "assets/images/animation_explosion_1/6.png"     },
        {   name: "animation_explosion_1_7",
        url: "assets/images/animation_explosion_1/7.png"     },
        {   name: "animation_explosion_1_8",
        url: "assets/images/animation_explosion_1/8.png"     },
        {   name: "animation_explosion_1_9",
        url: "assets/images/animation_explosion_1/9.png"     },
        {   name: "animation_explosion_1_10",
        url: "assets/images/animation_explosion_1/10.png"     },
        {   name: "animation_explosion_1_11",
        url: "assets/images/animation_explosion_1/11.png"     },
        {   name: "animation_explosion_1_12",
        url: "assets/images/animation_explosion_1/12.png"     },
        {   name: "animation_explosion_1_13",
        url: "assets/images/animation_explosion_1/13.png"     },
        {   name: "animation_explosion_1_14",
        url: "assets/images/animation_explosion_1/14.png"     },
        {   name: "animation_explosion_1_15",
        url: "assets/images/animation_explosion_1/15.png"     },
        {   name: "animation_explosion_1_16",
        url: "assets/images/animation_explosion_1/16.png"     },
        {   name: "animation_explosion_1_17",
        url: "assets/images/animation_explosion_1/17.png"     },
        {   name: "animation_explosion_1_18",
        url: "assets/images/animation_explosion_1/18.png"     },
        {   name: "animation_explosion_1_19",
        url: "assets/images/animation_explosion_1/19.png"     },
        {   name: "animation_explosion_1_20",
        url: "assets/images/animation_explosion_1/20.png"     },
        {   name: "animation_explosion_1_21",
        url: "assets/images/animation_explosion_1/21.png"     },
        {   name: "animation_explosion_1_22",
        url: "assets/images/animation_explosion_1/22.png"     },
        {   name: "animation_explosion_1_23",
        url: "assets/images/animation_explosion_1/23.png"     },
        {   name: "animation_explosion_1_24",
        url: "assets/images/animation_explosion_1/24.png"     },
        {   name: "animation_explosion_1_25",
        url: "assets/images/animation_explosion_1/25.png"     },
        {   name: "animation_explosion_1_26",
        url: "assets/images/animation_explosion_1/26.png"     },
        {   name: "animation_explosion_1_27",
        url: "assets/images/animation_explosion_1/27.png"     },
        {   name: "animation_explosion_1_28",
        url: "assets/images/animation_explosion_1/28.png"     },
        {   name: "animation_explosion_1_29",
        url: "assets/images/animation_explosion_1/29.png"     },
        {   name: "animation_explosion_1_30",
        url: "assets/images/animation_explosion_1/30.png"     },
        {   name: "animation_explosion_1_31",
        url: "assets/images/animation_explosion_1/31.png"     },
        {   name: "animation_explosion_1_32",
        url: "assets/images/animation_explosion_1/32.png"     },
        {   name: "animation_explosion_1_33",
        url: "assets/images/animation_explosion_1/33.png"     },
        {   name: "animation_explosion_1_34",
        url: "assets/images/animation_explosion_1/34.png"     },
        {   name: "animation_explosion_1_35",
        url: "assets/images/animation_explosion_1/35.png"     },
        {   name: "animation_explosion_1_36",
        url: "assets/images/animation_explosion_1/36.png"     },
        {   name: "animation_explosion_1_37",
        url: "assets/images/animation_explosion_1/37.png"     },
        {   name: "animation_explosion_1_38",
        url: "assets/images/animation_explosion_1/38.png"     },
        {   name: "animation_explosion_1_39",
        url: "assets/images/animation_explosion_1/39.png"     },
        {   name: "animation_explosion_1_40",
        url: "assets/images/animation_explosion_1/40.png"     },
        {   name: "animation_explosion_1_41",
        url: "assets/images/animation_explosion_1/41.png"     },
        {   name: "animation_explosion_1_42",
        url: "assets/images/animation_explosion_1/42.png"     },
        {   name: "animation_explosion_1_43",
        url: "assets/images/animation_explosion_1/43.png"     },
        {   name: "animation_explosion_1_44",
        url: "assets/images/animation_explosion_1/44.png"     },
        {   name: "animation_explosion_1_45",
        url: "assets/images/animation_explosion_1/45.png"     },
        {   name: "animation_explosion_1_46",
        url: "assets/images/animation_explosion_1/46.png"     },
        {   name: "animation_explosion_1_47",
        url: "assets/images/animation_explosion_1/47.png"     },
        {   name: "animation_explosion_1_48",
        url: "assets/images/animation_explosion_1/48.png"     },
        {   name: "animation_explosion_1_49",
        url: "assets/images/animation_explosion_1/49.png"     },
        {   name: "animation_explosion_1_50",
        url: "assets/images/animation_explosion_1/50.png"     },
        {   name: "animation_explosion_1_51",
        url: "assets/images/animation_explosion_1/51.png"     },
        {   name: "animation_explosion_1_52",
        url: "assets/images/animation_explosion_1/52.png"     },
        {   name: "animation_explosion_1_53",
        url: "assets/images/animation_explosion_1/53.png"     },
        {   name: "animation_explosion_1_54",
        url: "assets/images/animation_explosion_1/54.png"     },
        {   name: "animation_explosion_1_55",
        url: "assets/images/animation_explosion_1/55.png"     },
        {   name: "animation_explosion_1_56",
        url: "assets/images/animation_explosion_1/56.png"     },
        {   name: "animation_explosion_1_57",
        url: "assets/images/animation_explosion_1/57.png"     },
        {   name: "animation_explosion_1_58",
        url: "assets/images/animation_explosion_1/58.png"     },
        {   name: "animation_explosion_1_59",
        url: "assets/images/animation_explosion_1/59.png"     },
        {   name: "animation_explosion_1_60",
        url: "assets/images/animation_explosion_1/60.png"     },
        {   name: "animation_explosion_1_61",
        url: "assets/images/animation_explosion_1/61.png"     },
        {   name: "animation_explosion_1_62",
        url: "assets/images/animation_explosion_1/62.png"     },
        {   name: "animation_explosion_1_63",
        url: "assets/images/animation_explosion_1/63.png"     },
        {   name: "animation_explosion_1_64",
        url: "assets/images/animation_explosion_1/64.png"     },
        {   name: "animation_explosion_1_65",
        url: "assets/images/animation_explosion_1/65.png"     },
        {   name: "animation_explosion_1_66",
        url: "assets/images/animation_explosion_1/66.png"     },
        {   name: "animation_explosion_1_67",
        url: "assets/images/animation_explosion_1/67.png"     },
        {   name: "animation_explosion_1_68",
        url: "assets/images/animation_explosion_1/68.png"     }
        // #endregion
];

// =============================================================================================
// ==== ANIMATION IMG ARRAYS ===================================================================
var explosion1_animation_array = [];
createAnimationImg_array("animation_explosion_1_", explosion1_animation_array);

function createAnimationImg_array(baseName, img_array) {
    let allNamesInPreLoad = preLoadList.map(a => a.name);
    let baseNameRegex = new RegExp(baseName);
    allNamesInPreLoad.forEach(name => {
        if (name.match(baseNameRegex)) {
            img_array.push(name);
        }
    })
}




