var animate = function (callback) { window.setTimeout(callback, 1000/10)};
	
var canvas = document.createElement("canvas");
var width = 300;
var height = 600;
var framespersec = 8;
var blockwidth = width/10;
var blockheight = height/20;
var frame = 0;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
var playfield = new PlayField();

var keysDown = {};

var render = function () {
  context.fillStyle = "#000080";
  context.fillRect(0, 0, width, height);

  context.fillStyle = "#ffff00";
  // draw field with block
  let field = playfield.getFieldWithBlock();
  for(let i = 0; i < field.length; i++) {
    for(let j = 0; j < field[0].length; j++) {
      if(field[i][j]==1){
        context.fillRect(j*blockwidth, i*blockheight, blockwidth, blockheight);
      }
    }
  }
};

var update = function () {
  for (var key in keysDown) {
    var value = Number(key);
    if (value == 37) {
      playfield.moveBlockLeft();
    } else if (value == 39) {
      playfield.moveBlockRight();
    } else if (value == 40) {
      playfield.moveBlockDown();
    } else if (value == 90) {
      playfield.rotateBlockRight();
    } else if (value == 88) {
      // rotate left (x)
    }
    delete keysDown[value];
  }
  
  if(++frame == framespersec)
  {
    playfield.autoBlockDown();
    frame = 0;
  }
};

var step = function () {
  update();
  render();
  animate(step);
};


document.body.appendChild(canvas);
animate(step);

window.addEventListener("keydown", function (event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
  delete keysDown[event.keyCode];
});