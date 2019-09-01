var animate = function (callback) { window.setTimeout(callback, 1000/10)};
	
var canvas = document.createElement("canvas");
var width = 300;
var height = 600;
var framespersec = 8;
var frame = 0;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
var playfield = new PlayField();
var blockwidth = width/playfield.width();
var blockheight = height/playfield.height();

var keysDown = {};

var render = function () {
  context.fillStyle = "#000080";
  context.fillRect(0, 0, width, height);

  context.fillStyle = "#ffff00";
  // draw field with piece
  let field = playfield.getFieldWithPiece();
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
      playfield.movePieceLeft();
    } else if (value == 39) {
      playfield.movePieceRight();
    } else if (value == 40) {
      playfield.movePieceDown();
    } else if (value == 90) {
      playfield.rotatePieceRight();
    } else if (value == 88) {
      // rotate left (x)
    }
    delete keysDown[value];
  }
  
  if(++frame == framespersec)
  {
    playfield.autoPieceDown();
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