const COLUMNS = 10;
const ROWS = 20;
const ROTATE_RIGHT = 0;
const ROTATE_LEFT = 1;
const MOVE_RIGHT = 0;
const MOVE_LEFT = 1;

class PlayField{

  constructor(piece = undefined, startLevel = 0){
    this.defaultPiece = piece;
    this.nextPiece = piece;
    this.startLevel = startLevel;
    this.restart();
  }

  restart(){
    this.score = new Score();
    this.clearField();
    this.createNewPiece();
  }

  clearField(){
    this.field = [];
    this.fieldWithPiece = [];
    this.score.resetScore();
    for(let i = 0; i < ROWS; i++) {
      this.field.push([0,0,0,0,0,0,0,0,0,0]);
      this.fieldWithPiece.push([0,0,0,0,0,0,0,0,0,0]);
    }
  }

  createNewPiece(){
    this.pieceX = 4;
    this.pieceY = -1;
    if(this.defaultPiece == undefined){
      if(this.nextPiece ==  undefined){
        this.nextPiece = this.getRandomPiece();    
      }
      this.piece = this.nextPiece;  
      this.nextPiece = this.getRandomPiece();
    }
    else {
      this.piece = this.defaultPiece;
      this.nextPiece = this.defaultPiece;
    }
    this.adjustSoThatPieceStartsAtTop();
  }

  adjustSoThatPieceStartsAtTop(){
    if(this.piece.constructor.name == 'PieceI'){
      this.pieceY=-2;
    }
    else if (this.piece.constructor.name == 'PieceO'){
      this.pieceY = 0;
    }
  }

  getRandomPiece(){
    let rnd = Math.floor(Math.random() * (7)) + 0;
    let piece = new PieceI();
    switch (rnd) {
      case 0:
          piece = new PieceI();
          break;
      case 1:
          piece = new PieceO();
          break;
      case 2:
          piece = new PieceS();
          break;
      case 3:
          piece = new PieceZ();
          break;
      case 4:
          piece = new PieceT();
          break;
      case 5:
          piece = new PieceL();
          break;
      case 6:
          piece = new PieceJ();
          break;
      default:
          break;
    }
    return piece;
  }

  getScore(){
    return this.score.getScore();
  }

  getLines(){
    return this.score.getLines();
  }

  getLevel(){
    return this.score.getLevel() + this.startLevel;
  }

  getDropFactor(){
    let level = this.getLevel();
    if(level <= 10){
      return 70 - (level * 6);
    }
    else {
      let factor =  10 - (level-10)
      if(factor < 1){
        factor = 1;
      }
      return factor;
    }
  }

  isInBounds(i, j){
    return (this.pieceY+i>=0 && this.pieceY+i<ROWS) &&
      (this.pieceX+j>=0 && this.pieceX+j<COLUMNS);
  }

  columns(){
    return COLUMNS;
  }

  rows(){
    return ROWS;
  }

  copyFieldToFieldWithPiece(){
    for(let i = 0; i < this.field.length; i++) {
      for(let j = 0; j < this.field[0].length; j++) {
        this.fieldWithPiece[i][j] = this.field[i][j];
      }
    }
  }

  copyFieldWithPieceToField(){
    for(let i = 0; i < this.field.length; i++) {
      for(let j = 0; j < this.field[0].length; j++) {
        this.field[i][j] = this.fieldWithPiece[i][j];
      }
    }
  }

  getFieldWithPiece(){
    this.copyFieldToFieldWithPiece();
    for(let i=0; i<this.piece.length(); i++){
      for(let j=0; j<this.piece.width(); j++){
        let cell = this.piece.getPiece()[i][j];
        if(cell != 0) {
          if(this.isInBounds(i,j)){
            this.fieldWithPiece[this.pieceY+i][this.pieceX+j] = cell;
          }
        }
      }
    }
    return this.fieldWithPiece;
  }

  autoPieceDown(){
    if(this.movePieceDown() == false){
      this.freezeRows();
    }
    return true;
  }

  movePieceDown(){
    this.pieceY++;
    for(let i=0; i<this.piece.length(); i++){
      for(let j=0; j<this.piece.width(); j++){
        let newPeice = this.piece.getPiece()[i][j];
        if(this.pieceY+i >= ROWS && newPeice!=0){
          this.pieceY--;
          return false;
        }
        let existingPeice = 0
        if(this.isInBounds(i,j)){   
          existingPeice = this.field[this.pieceY+i][this.pieceX+j];
        }

        if(existingPeice != 0 && newPeice != 0){
          this.pieceY--;
          return false;
        }
      }
    }
    return true;
  }

  movePieceRight(){
    return this.movePiece(MOVE_RIGHT);
  }

  movePieceLeft(){
    return this.movePiece(MOVE_LEFT);
  }

  movePiece(direction){
    (direction == MOVE_RIGHT) ? this.pieceX++ : this.pieceX--;
    for(let i=0; i<this.piece.length(); i++){
      for(let j=0; j<this.piece.width(); j++){
        if((this.pieceX+j >= COLUMNS || this.pieceX+j < 0)  && this.piece.getPiece()[i][j]!=0){
          (direction == MOVE_RIGHT) ? this.pieceX-- : this.pieceX++;
          return false;
        }
        let existing = 0;
        if(this.isInBounds(i,j)){
          existing = this.field[this.pieceY+i][this.pieceX+j];
        }

        let piece = this.piece.getPiece()[i][j];
        if(existing != 0 && piece != 0){
          (direction == MOVE_RIGHT) ? this.pieceX-- : this.pieceX++;
          return false;
        }
      }
    }
    return true;
  }

  rotatePieceRight(){
    return this.rotatePiece(ROTATE_RIGHT);
  }

  rotatePieceLeft(){
    return this.rotatePiece(ROTATE_LEFT);
  }

  rotatePiece(direction){
    //console.log(`x:${this.pieceX}, y:${this.pieceY}, len:${this.piece.length()}, width:${this.piece.width()}, firstCol:${this.piece.firstColumn()}`);
    if(this.pieceX >= 0 && this.pieceX+this.piece.width() <= COLUMNS && 
    this.pieceY+this.piece.length() <=ROWS)
    {
      (direction == ROTATE_LEFT) ? this.piece.rotateLeft() : this.piece.rotateRight();
    }

    for(let i=0; i<this.piece.length(); i++){
      for(let j=0; j<this.piece.width(); j++){
        let existing = 0;
        if(this.isInBounds(i,j)){
          existing = this.field[this.pieceY+i][this.pieceX+j];
        }
        
        let piece = this.piece.getPiece()[i][j];
        if(existing != 0 && piece != 0){
          (direction == ROTATE_LEFT) ? this.piece.rotateRight() : this.piece.rotateLeft();
        }
      }
    }
  }

  checkForCompletedRows(){
    let newField = [];
    let completedRows = 0;
    
    for(let i = 0; i < this.field.length; i++) {
      let rowComplete = true;
      for(let j = 0; j < this.field[0].length; j++) {
        if(this.field[i][j] == 0){
          rowComplete = false;
          break;
        }
      }
      if(!rowComplete){
        newField.push(this.field[i]);
      }else{
        completedRows++;
      }
    }

    if(completedRows>0){
      for(let i=newField.length; i<20; i++){
        newField.unshift([0,0,0,0,0,0,0,0,0,0]);
      }
      this.field = newField;
    }

    return completedRows;
  }

  checkForGameOver(){
    for(let i = 0; i < this.field[0].length; i++) {
      if(this.field[0][i] !=0){
        return true;
      }
    }
    return false;
  }

  freezeRows(){
    this.getFieldWithPiece();
    this.copyFieldWithPieceToField();
    this.createNewPiece();
    this.score.rowsCompleted(this.checkForCompletedRows());
  }

  getNextPiece(){
    let nextPieceNoBlankRows = [];
    let nextPiece = this.nextPiece.getPiece();

    for(let i = 0; i < nextPiece.length; i++) {
      for(let j = 0; j < nextPiece[i].length; j++) {
        if(nextPiece[i][j]!=0){
          nextPieceNoBlankRows.push(nextPiece[i]);
          break;
        }
      }
    }
    return nextPieceNoBlankRows;
  }
}