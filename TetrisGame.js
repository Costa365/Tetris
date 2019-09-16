const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 600;
const SCORE_X_POS = 7;
const LINES_Y_POS = 17;
const SCORE_Y_POS = 41;
const LEVEL_Y_POS = 65;
const NEXT_Y_POS = 89;
const GAME_OVER_Y_POS = 89;
const NEXT_PIECE_Y_OFFSET = 96;
const SCORE_PANEL_WIDTH = 135;

let animate = function (callback) { window.setTimeout(callback, 10)};
	
let canvas = document.createElement("canvas");
let width = CANVAS_WIDTH;
let height = CANVAS_HEIGHT;
let frame = 0;
let context = canvas.getContext('2d');
let playfield = new PlayField();
let blockwidth = width/playfield.columns();
let blockheight = height/playfield.rows();
let keysDown = {};

canvas.width = width+SCORE_PANEL_WIDTH;
canvas.height = height;

let render = function () {
  context.fillStyle = "#000080";
  context.fillRect(0, 0, width, height);
  context.fillStyle = "#000050";
  context.fillRect(width + 5, 0, 130, height);
  context.fillStyle = "#ffffff";
  context.font = "20px Monospace";
  context.fillText(`Lines: ${playfield.getLines()}`, width + SCORE_X_POS, LINES_Y_POS);
  context.fillText(`Score: ${playfield.getScore()}`, width + SCORE_X_POS, SCORE_Y_POS);
  context.fillText(`Level: ${playfield.getLevel()}`, width + SCORE_X_POS, LEVEL_Y_POS);

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
  context.fillStyle = "#ffffff";
  context.fillText(`Next: `, width + SCORE_X_POS, NEXT_Y_POS);
  context.fillStyle = "#ffff00";
  let piece = playfield.getNextPiece();
  for(let i = 0; i < piece.length; i++) {
    for(let j = 0; j < piece[0].length; j++) {
      if(piece[i][j]==1){
        context.fillRect(j*blockwidth  + width + SCORE_X_POS, 
          i*blockheight+NEXT_PIECE_Y_OFFSET, blockwidth, blockheight);
      }
    }
  }
}

let drawGameOver = function (){
  context.fillStyle = "#ffffff";
  context.fillText(`Game Over!`, width + SCORE_X_POS, GAME_OVER_Y_POS);
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