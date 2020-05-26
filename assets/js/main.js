

//will run once the entire page (images or iframes), not just the DOM, is ready
$( window ).on( "load", function() { 
    $(".winLoad").html("Window loaded!");
    draw();
});



function draw() {
    var canvas = $("#playGround");
    var ctx = canvas.getContext('2d');
    
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, 50, 50);

        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(30, 30, 50, 50);
        
    
    }

   




/*
.playGround {
    width: 1024px;
    height: 700px;
    background: rgba(0,0,0,.3);
    border: 1px solid rgba(160,90,90,.3);   
    border-radius: 5px;
    margin: 0;
    padding: 0;
}*/









