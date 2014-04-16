var ctx = $('#canvas').get(0).getContext('2d');

var keys = [];

var playing = true;

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

var boxy = {
    x: 225,
    y: 225,
    g: 0.2,
};

var dummy = {
    x:255,
    y: 255,
    g: 0.2
}

function render(){
	ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, $('#canvas').width(), $('#canvas').height());
    
    ctx.fillStyle = '#33ffdd';

    for(var i in pipes){
     	ctx.fillRect(pipes[i].x, 0, 50, $('#canvas').height() );
      if(pipes[i].x < 0){
      	pipes[i].x = $('#canvas').width();
      }
    }

    for(var i in cutouts){
      ctx.clearRect(cutouts[i].x, cutouts[i].y, 50, 150);
      if(cutouts[i].x < 0){
          cutouts[i].x = $('#canvas').width();
          cutouts[i].y =  Math.random() * 250 + 25;
      }
    }

    var cap = Math.min(Math.max(boxy.g - 2, 0), 12);
    var rotation = (Math.PI / 2) * (cap / 12);
    
    ctx.save();
    ctx.translate(boxy.x, boxy.y);
    ctx.rotate(rotation);
    ctx.fillRect( -25/2, -25/2, 25, 25);

    ctx.fillStyle = '#000000';
    ctx.fillRect( 0, 0, 11, 2); 
    ctx.restore();
 
}

function update(){

    //update pipe
    for(var i in pipes)
       pipes[i].x += -3;

    //update cutouts
    for(var i in cutouts)
       cutouts[i].x += -3;
   

    if (keys[32]) {
        keys[32] = false;
        jumping();
        boxy.g = 0.1;
        dummy.g = 0.1;
    }
    else{
        falling();
    }

    if(boxy.y < 0)
        boxy.y = 0;
    if(boxy.y > $('#canvas').height())
        playing = false;

    collision();

}

function collision(){
    for(var i in cutouts){
        if (boxy.x >= cutouts[i].x && boxy.x <= cutouts[i].x+50 && boxy.y <= cutouts[i].y)
            playing =false;
        else if(boxy.x >= cutouts[i].x && boxy.x <= cutouts[i].x+50 && boxy.y >= cutouts[i].y+150)
            playing = false;
    }
}

function jumping(){
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
  if(playing){
    update();
    render();
  }
}, 20);