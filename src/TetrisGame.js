const HEADER_OFFSET = 70;
const PLAYFIELD_WIDTH = 400;
const PLAYFIELD_HEIGHT = 800;

const SCORE_X_POS = 4;
const LINES_Y_POS = 17;
const SCORE_Y_POS = 41;
const LEVEL_Y_POS = 65;
const NEXT_Y_POS = 89;
const GAME_OVER_Y_POS = 89;
const NEXT_PIECE_Y_OFFSET = 96;
const SCORE_PANEL_WIDTH = 160;
const BUTTON_Y_POS = 200;
const BUTTON_WIDTH = 148;
const BUTTON_HEIGHT = 30;
const KEYS_Y_POS = 260;
const KEYS2_Y_POS = 278;

const SCORE_BACKGROUND_COLOR = "#E03020";
const FIELD_BACKGROUND_COLOR = "#ffffff";
const SCORE_TEXT_COLOR = "#ffffff";
const BUTTON_COLOR = "#990000";
const PIECE_BORDER_COLOR = "#000000";

const STATE_IDLE = 0;
const STATE_PLAY = 1;
const STATE_PAUSE = 2;
const STATE_GAME_OVER = 3;

let state = STATE_IDLE;

let animate = function (callback) { window.setTimeout(callback, 10)};

let canvas = document.createElement("canvas");
let playfieldWidth = PLAYFIELD_WIDTH;
let playfieldHeight = PLAYFIELD_HEIGHT;
adjustDimensions();

let frame = 0;
let context = canvas.getContext('2d');
let playfield = new PlayField();
let blockwidth = playfieldWidth/playfield.columns();
let blockheight = playfieldHeight/playfield.rows();
let buttonXPos = playfieldWidth+8;
let keysDown = {};
let clearedRowsSound = new Audio("cleared.mp3");
let clearedTetrisSound = new Audio("cleared-tetris.mp3");
let startSound = new Audio("start.mp3");
let dropSound = new Audio("drop.mp3");
let bottomSound = new Audio("bottom.mp3");

canvas.width = playfieldWidth+SCORE_PANEL_WIDTH;
canvas.height = playfieldHeight;
canvas.style = "border:1px solid " + SCORE_BACKGROUND_COLOR;
context.font = "20px Monospace";

document.getElementById('header').width = canvas.width;

function adjustDimensions() {
  let availablePlayFieldWidth = window.innerWidth-20 - SCORE_PANEL_WIDTH;
  let availablePlayFieldHeight = window.innerHeight-HEADER_OFFSET-20;
  if(availablePlayFieldHeight < PLAYFIELD_HEIGHT || availablePlayFieldWidth < PLAYFIELD_WIDTH)
  {
    if(availablePlayFieldHeight > availablePlayFieldWidth*2){
      playfieldWidth = availablePlayFieldWidth;
      playfieldHeight = availablePlayFieldWidth*2;
    }
    else{
      playfieldHeight = availablePlayFieldHeight;
      playfieldWidth = availablePlayFieldHeight/2;
    }
  }
};

let render = function () {
  context.fillStyle = FIELD_BACKGROUND_COLOR;
  context.fillRect(0, 0, playfieldWidth+1, playfieldHeight);
  
  drawScorePanel();

  // Draw field with piece
  if(state != STATE_IDLE){
    let field = playfield.getFieldWithPiece();
    for(let i = 0; i < field.length; i++) {
      for(let j = 0; j < field[0].length; j++) {
        if(field[i][j]!=0){
          let x = j*blockwidth;
          let y = i*blockheight;
          context.fillStyle = "#" + ("000000" + field[i][j].toString(16)).substr(-6);
          context.fillRect(x, y, blockwidth, blockheight);

          context.lineWidth = 1;
          context.strokeStyle = PIECE_BORDER_COLOR;
          context.beginPath();
          context.rect(x,y, blockwidth, blockheight);
          context.stroke();
        }
      }
    }
  }

  if(state == STATE_GAME_OVER){
    drawGameOver();
  }
  else{
    drawNextPiece();
  }
};

let drawScorePanel = function (){
  context.fillStyle = SCORE_BACKGROUND_COLOR;
  context.fillRect(playfieldWidth + 2, 0, SCORE_PANEL_WIDTH, playfieldHeight);
  context.fillStyle = SCORE_TEXT_COLOR;
  context.fillText(`Lines: ${playfield.getLines()}`, playfieldWidth + SCORE_X_POS, LINES_Y_POS);
  context.fillText(`Score: ${playfield.getScore()}`, playfieldWidth + SCORE_X_POS, SCORE_Y_POS);
  context.fillText(`Level: ${playfield.getLevel()}`, playfieldWidth + SCORE_X_POS, LEVEL_Y_POS);
  drawActionButton();
} 

let drawActionButton = function (){
  context.fillStyle = BUTTON_COLOR;
  context.fillRect(buttonXPos, BUTTON_Y_POS, BUTTON_WIDTH, BUTTON_HEIGHT);
  context.fillStyle = SCORE_TEXT_COLOR;
  let btnText = "";

  switch(state){
    case STATE_IDLE:
      btnText = "Start";
      break;
    case STATE_PLAY:
      btnText = "Pause";
      break;
    case STATE_PAUSE:
      btnText = "Continue";
      break;
    case STATE_GAME_OVER:
      btnText = "Start";
      break;
  }

  let btnX = buttonXPos + ((BUTTON_WIDTH - context.measureText(btnText).width)/2);
  context.fillText(btnText, btnX, 222);
}

let drawNextPiece = function (){
  if(state != STATE_IDLE){
    context.fillStyle = SCORE_TEXT_COLOR;
    context.fillText(`Next: `, playfieldWidth + SCORE_X_POS, NEXT_Y_POS);
    let piece = playfield.getNextPiece();
    for(let i = 0; i < piece.length; i++) {
      for(let j = 0; j < piece[0].length; j++) {
        if(piece[i][j]!=0){
          let x = j*blockwidth + playfieldWidth + SCORE_X_POS;
          let y = i*blockheight+NEXT_PIECE_Y_OFFSET;
          
          context.fillRect(x, y, blockwidth, blockheight);
          context.strokeStyle = 'black';
          context.beginPath();
          context.rect(x, y, blockwidth, blockheight);
          context.stroke();
        }
      }
    }
  }
}

let drawGameOver = function (){
  context.fillStyle = SCORE_TEXT_COLOR;
  context.fillText(`Game Over!`, playfieldWidth + SCORE_X_POS, GAME_OVER_Y_POS);
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
      playfield.rotatePieceLeft();
    } else if (value == 88) {
      playfield.rotatePieceRight();
    }
    delete keysDown[value];
  }
  if(state == STATE_PLAY){
    if(++frame == playfield.getDropFactor())
    {
      let completedRows = playfield.autoPieceDown();
      if(completedRows==4){
        clearedTetrisSound.play();
      }
      else if(completedRows>0){
        clearedRowsSound.play();
      }
      else if(completedRows==0){
        bottomSound.play();
      }

      frame = 0;
      if(playfield.checkForGameOver() == true){
        state = STATE_GAME_OVER;
      }
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
  if(state == STATE_PLAY){
    keysDown[event.keyCode] = true;
  }
});

window.addEventListener("keyup", function (event) {
  if(state == STATE_PLAY){
    delete keysDown[event.keyCode];
  }
});

canvas.addEventListener('click', function(event) {
  if (
    event.x > buttonXPos && 
    event.x < buttonXPos + BUTTON_WIDTH &&
    event.y > BUTTON_Y_POS+HEADER_OFFSET && 
    event.y < BUTTON_Y_POS+HEADER_OFFSET + BUTTON_HEIGHT) {
      switch(state){
        case STATE_IDLE:
            state = STATE_PLAY;
            startSound.play();
          break;
        case STATE_PLAY:
            state = STATE_PAUSE;
            break;
        case STATE_PAUSE:
            state = STATE_PLAY;
            break;
        case STATE_GAME_OVER:
            playfield.restart();
            state = STATE_PLAY;
            break;
      }
    return;
  }
  if(state == STATE_PLAY){
    if(event.x<100){
      keysDown[37] = true;
    }
    else if(event.x>200){
      keysDown[39] = true;
    } 
    else{
      keysDown[90] = true;
    }
  }
});
