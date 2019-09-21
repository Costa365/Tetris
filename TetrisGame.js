const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 600;
const SCORE_X_POS = 4;
const LINES_Y_POS = 17;
const SCORE_Y_POS = 41;
const LEVEL_Y_POS = 65;
const NEXT_Y_POS = 89;
const GAME_OVER_Y_POS = 89;
const NEXT_PIECE_Y_OFFSET = 96;
const SCORE_PANEL_WIDTH = 135;
const SCORE_BACKGROUND_COLOR = "#404040";
const FIELD_BACKGROUND_COLOR = "#ffffff";
const SCORE_TEXT_COLOR = "#ffffff";

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
canvas.style = "border:1px solid " + SCORE_BACKGROUND_COLOR;

let render = function () {
  context.fillStyle = FIELD_BACKGROUND_COLOR;
  context.fillRect(0, 0, width, height);
  context.fillStyle = SCORE_BACKGROUND_COLOR;
  context.fillRect(width + 2, 0, SCORE_PANEL_WIDTH, height);
  context.fillStyle = SCORE_TEXT_COLOR;
  context.font = "20px Monospace";
  context.fillText(`Lines: ${playfield.getLines()}`, width + SCORE_X_POS, LINES_Y_POS);
  context.fillText(`Score: ${playfield.getScore()}`, width + SCORE_X_POS, SCORE_Y_POS);
  context.fillText(`Level: ${playfield.getLevel()}`, width + SCORE_X_POS, LEVEL_Y_POS);

  // Draw field with piece
  let field = playfield.getFieldWithPiece();
  for(let i = 0; i < field.length; i++) {
    for(let j = 0; j < field[0].length; j++) {
      if(field[i][j]!=0){
        context.fillStyle = "#" + ("000000" + field[i][j].toString(16)).substr(-6);
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
  context.fillStyle = SCORE_TEXT_COLOR;
  context.fillText(`Next: `, width + SCORE_X_POS, NEXT_Y_POS);
  let piece = playfield.getNextPiece();
  for(let i = 0; i < piece.length; i++) {
    for(let j = 0; j < piece[0].length; j++) {
      if(piece[i][j]!=0){
        context.fillRect(j*blockwidth  + width + SCORE_X_POS, 
          i*blockheight+NEXT_PIECE_Y_OFFSET, blockwidth, blockheight);
      }
    }
  }
}

let drawGameOver = function (){
  context.fillStyle = SCORE_TEXT_COLOR;
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