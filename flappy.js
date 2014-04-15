var ctx = $('#canvas').get(0).getContext('2d');

var keys = [];

var playing = true;

var pipe1 = {
		x: $('#canvas').width(),
		y: 0,
	};

var pipe2 = {
		x: $('#canvas').width() + 275,
		y: 0,
	};
var pipe3 = {
		x: $('#canvas').width() + 550,
		y: 0,
	};

var cutout1 = {
        x: $('#canvas').width(),
        y: Math.random() * 250 + 25,
    };

var cutout2 = {
        x: $('#canvas').width() + 275,
        y: Math.random() * 250 + 25,
    };

var cutout3 = {
        x: $('#canvas').width() + 550,
        y: Math.random() * 250 + 25,
    };

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

function pipe(){
	return  pipe = {
		x: $('#canvas').width(),
		y: 0,
	};
}

function render(){
	ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, $('#canvas').width(), $('#canvas').height());
    
    ctx.fillStyle = '#33ffdd';


    //Pipe Number one
   	ctx.fillRect(pipe1.x, 0, 50, $('#canvas').height() );
    ctx.clearRect(cutout1.x, cutout1.y, 50, 150);
    if(pipe1.x < 0){
    	pipe1.x = $('#canvas').width();
        cutout1.x = $('#canvas').width();
        cutout1.y =  Math.random() * 250 + 25;
    }

	//Pipe Number 2
    ctx.fillRect(pipe2.x, 0, 50, $('#canvas').height() );
    ctx.clearRect(cutout2.x, cutout2.y, 50, 150);
    if(pipe2.x < 0){
    	pipe2.x = $('#canvas').width();
        cutout2.x = $('#canvas').width();
        cutout2.y = Math.random() * 250 + 25;
    }

    //Pipe # 3
    ctx.fillRect(pipe3.x, 0, 50, $('#canvas').height() );
    ctx.clearRect(cutout3.x, cutout3.y, 50, 150);
    if(pipe3.x < 0){
    	pipe3.x = $('#canvas').width();
        cutout3.x = $('#canvas').width();
        cutout3.y = Math.random() * 250 + 25;
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

    ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 450);
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(800, 0);
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 450);
      ctx.lineTo(800, 450);
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(800, 0);
      ctx.lineTo(800, 450);
      ctx.lineWidth = 10;
      ctx.stroke();
 
}

function update(){

    //update pipe
    pipe1.x += -3;
    pipe2.x += -3;
    pipe3.x += -3;

    //update cutouts
    cutout1.x += -3;
    cutout2.x += -3;
    cutout3.x += -3;

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

    if (boxy.x >= cutout1.x && boxy.x <= cutout1.x+50 && boxy.y <= cutout1.y)
        playing =false;
    else if(boxy.x >= cutout1.x && boxy.x <= cutout1.x+50 && boxy.y >= cutout1.y+150)
        playing = false;

     if (boxy.x >= cutout2.x && boxy.x <= cutout2.x+50 && boxy.y <= cutout2.y)
        playing =false;
    else if(boxy.x >= cutout2.x && boxy.x <= cutout2.x+50 && boxy.y >= cutout2.y+150)
        playing = false;

    if (boxy.x >= cutout3.x && boxy.x <= cutout3.x+50 && boxy.y <= cutout3.y)
        playing =false;
    else if(boxy.x >= cutout3.x && boxy.x <= cutout3.x+50 && boxy.y >= cutout3.y+150)
        playing = false;


    console.log(boxy.x  + " " + cutout1.x);
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