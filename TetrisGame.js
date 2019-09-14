let animate = function (callback) { window.setTimeout(callback, 10)};
	
let canvas = document.createElement("canvas");
let width = 300;
let height = 600;
let framespersec = 7; // 70 -> 7
let frame = 0;
canvas.width = width+135;
canvas.height = height;
let context = canvas.getContext('2d');
let playfield = new PlayField();
let blockwidth = width/playfield.columns();
let blockheight = height/playfield.rows();

let keysDown = {};

let render = function () {
  context.fillStyle = "#000080";
  context.fillRect(0, 0, width, height);
  context.fillStyle = "#000050";
  context.fillRect(width + 5, 0, 130, height);
  context.fillStyle = "#ffffff";
  context.fillText(`Lines: ${playfield.getLines()}`, width + 7, 10);
  context.fillText(`Score: ${playfield.getScore()}`, width + 7, 33);
  context.fillText(`Level: ${playfield.getLevel()}`, width + 7, 56);
  context.fillText(`Next: `, width + 7, 79);

  context.fillStyle = "#ffff00";
  // Draw field with piece
  let field = playfield.getFieldWithPiece();
  for(let i = 0; i < field.length; i++) {
    for(let j = 0; j < field[0].length; j++) {
      if(field[i][j]==1){
        context.fillRect(j*blockwidth, i*blockheight, blockwidth, blockheight);
      }
    }
  }
  if(playfield.checkForGameOver() == true){
    drawGameOver();
  }
  else{
    drawNextPiece();
  }
};

let drawNextPiece = function (){
  let piece = playfield.getNextPiece();
  for(let i = 0; i < piece.length; i++) {
    for(let j = 0; j < piece[0].length; j++) {
      if(piece[i][j]==1){
        context.fillRect(j*blockwidth  + width + 7, i*blockheight+86, blockwidth, blockheight);
      }
    }
  }
}

let drawGameOver = function (){
  context.fillStyle = "#ffffff";
  context.fillText(`Game Over!`, width + 7, 100);
}

let update = function () {
  for (let key in keysDown) {
    let value = Number(key);
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
  
  if(++frame == playfield.getDropFactor())
  {
    playfield.autoPieceDown();
    frame = 0;

    if(playfield.checkForGameOver() == true){
      animate = undefined;
    }
  }
};

let step = function () {
  update();
  render();
  if(animate != undefined){
    animate(step);
  }
};


document.body.appendChild(canvas);
animate(step);

window.addEventListener("keydown", function (event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
  delete keysDown[event.keyCode];
});