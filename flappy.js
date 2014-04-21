var ctx = $('#canvas').get(0).getContext('2d');

var keys = [];

var playing = true;

//An array of the three pipes the circle around the canvas
var pipes = [{
		x: $('#canvas').width(),
		y: 0,
	},{
		x: $('#canvas').width() + 275,
		y: 0,
	}, {
		x: $('#canvas').width() + 550,
		y: 0,
	}];

//an array of the "randomized" cutouts that the block goes through
var cutouts = [{
        x: $('#canvas').width(),
        y: Math.random() * 250 + 25,
    }, {
        x: $('#canvas').width() + 275,
        y: Math.random() * 250 + 25,
    }, {
        x: $('#canvas').width() + 550,
        y: Math.random() * 250 + 25,
    }];

//the box
var boxy = {
    x: 225,
    y: 225,
    g: 0.2,
};

//shows the gravity in the game. 
var dummy = {
    x:255,
    y: 255,
    
    g: 0.2
}

function render(){
    //wipes the canvas clean before redrawing
	ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, $('#canvas').width(), $('#canvas').height());
    
    ctx.fillStyle = '#33ffdd';

    //draws each pipe
    for(var i in pipes){
     	ctx.fillRect(pipes[i].x, 0, 50, $('#canvas').height() );
      if(pipes[i].x < 0){
      	pipes[i].x = $('#canvas').width();
      }
    }

    //draws each cut out in the pipe
    for(var i in cutouts){
      ctx.clearRect(cutouts[i].x, cutouts[i].y, 50, 150);
      if(cutouts[i].x < 0){
          cutouts[i].x = $('#canvas').width();
          cutouts[i].y =  Math.random() * 250 + 25;
      }
    }

    //calculates the current gravity on boxy
    var cap = Math.min(Math.max(boxy.g - 2, 0), 12);
    var rotation = (Math.PI / 2) * (cap / 12);
    
    //saves the current canvas so that we are able to just rotate the box with the calculated gravity. 
    ctx.save();
    ctx.translate(boxy.x, boxy.y);
    ctx.rotate(rotation);
    ctx.fillRect( -25/2, -25/2, 25, 25);  // makes it so the box is being drawn around a center point, instead of top left

    ctx.fillStyle = '#000000';
    ctx.fillRect( 0, 0, 11, 2); 
    ctx.restore();
 
}

function update(){

    //update all the pipes positions
    for(var i in pipes)
       pipes[i].x += -3;

    //update all the cutouts position, to make sure they stay with the pipes
    for(var i in cutouts)
       cutouts[i].x += -3;
   
    //finds if the player is currently jumping or now, calls the function that corresponds with this action
    if (keys[32]) {
        keys[32] = false;
        jumping();
        //since the box is jumping the gravity should be reset 
        boxy.g = 0.1;
        dummy.g = 0.1;
    }
    else{
        falling();
    }


    // if the box trys to go about the canvas, it stops it
    if(boxy.y < 0)
        boxy.y = 0;
    //if the box falls to the bottom the game ends
    if(boxy.y > $('#canvas').height())
        playing = false;

    collision();

}

function collision(){

    //checks if the box is between the pipes two ex values, if it is, then it checks to see if it is hitting the top or bottomw of the pipe
    for(var i in cutouts){
        if (boxy.x >= cutouts[i].x && boxy.x <= cutouts[i].x+50 && boxy.y <= cutouts[i].y)
            playing =false;
        else if(boxy.x >= cutouts[i].x && boxy.x <= cutouts[i].x+50 && boxy.y >= cutouts[i].y+150)
            playing = false;
    }
}

function jumping(){
    //updates the y value (height) and adds a smooth transition for when it is moving
    $({ y : boxy.y }).animate({                    
                y: boxy.y - 100
            }, {
                duration: 350,
                step: function(value) {
                    boxy.y = value;
                },
                easing: 'easeOutCubic'
            });
}

function falling(){
    //keeps create more gravity ans the box keeps falling
    boxy.g += 0.2;
    boxy.y += boxy.g;

    dummy.g = boxy.g;
    dummy.y = boxy.y;
}

$(document).keydown(function(e) {
      keys[e.keyCode] = true;
   });

$(document).keyup(function(e) {
      keys[e.keyCode] = false;
   });

//function to declare how often to run the other functions
setInterval(function() {
  if(playing){ // only update if the game is not over 
    update();
    render();
  }
}, 20);