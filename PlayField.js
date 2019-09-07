const COLUMNS = 10;
const ROWS = 20;

class PlayField{

  constructor(piece = undefined){
    this.defaultPiece = piece;
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
      this.piece = this.getRandomPiece();  
    }
    else {
      this.piece = this.defaultPiece;
    }
  }

  getRandomPiece(){
    let rnd = Math.floor(Math.random() * (7)) + 0;
    let piece = new PieceI();
    switch (rnd) {
      case 0:
          piece = new PieceI();
          this.pieceY=-2; // Adjust so that piece appears at the top
          break;
      case 1:
          piece = new PieceO();
          this.pieceY = 0; // Adjust so that piece appears at the top
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
        if(this.field[i][j] == 1) {
          this.fieldWithPiece[i][j] = 1;
        }
        else {
          this.fieldWithPiece[i][j] = 0;
        }
      }
    }
  }

  copyFieldWithPieceToField(){
    for(let i = 0; i < this.field.length; i++) {
      for(let j = 0; j < this.field[0].length; j++) {
        if(this.fieldWithPiece[i][j] == 1) {
          this.field[i][j] = 1;
        }
        else {
          this.field[i][j] = 0;
        }
      }
    }
  }

  getFieldWithPiece(){
    this.copyFieldToFieldWithPiece();
    for(let i=0; i<this.piece.length(); i++){
      for(let j=0; j<this.piece.width(); j++){
        if(this.piece.getPiece()[i][j] == 1) {
          if(this.isInBounds(i,j)){
            this.fieldWithPiece[this.pieceY+i][this.pieceX+j] = 1;
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
        if(this.pieceY+i >= ROWS && newPeice==1){
          this.pieceY--;
          return false;
        }
        let existingPeice = 0
        if(this.isInBounds(i,j)){   
          existingPeice = this.field[this.pieceY+i][this.pieceX+j];
        }

        if(existingPeice == 1 && newPeice == 1){
          this.pieceY--;
          return false;
        }
      }
    }
    return true;
  }

  movePieceRight(){
    this.pieceX++;
    for(let i=0; i<this.piece.length(); i++){
      for(let j=0; j<this.piece.width(); j++){
        if(this.pieceX+j >= COLUMNS && this.piece.getPiece()[i][j]==1){
          this.pieceX--;
          return false;
        }
        let existing = 0;
        if(this.isInBounds(i,j)){
          existing = this.field[this.pieceY+i][this.pieceX+j];
        }
        let piece = this.piece.getPiece()[i][j];
        if(existing == 1 && piece == 1){
          this.pieceX--;
          return false;
        }
      }
    }
    return true;
  }

  movePieceLeft(){
    this.pieceX--;
    for(let i=0; i<this.piece.length(); i++){
      for(let j=0; j<this.piece.width(); j++){
        if(this.pieceX+j < 0 && this.piece.getPiece()[i][j]==1){
          this.pieceX++;
          return false;
        }
        let existing = 0;
        if(this.isInBounds(i,j)){
          existing = this.field[this.pieceY+i][this.pieceX+j];
        }
        
        let piece = this.piece.getPiece()[i][j];
        if(existing == 1 && piece == 1){
          this.pieceX++;
          return false;
        }
      }
    }
    return true;
  }

  rotatePieceRight(){
    //console.log(`x:${this.pieceX}, y:${this.pieceY}, len:${this.piece.length()}, width:${this.piece.width()}, firstCol:${this.piece.firstColumn()}`);
    if(this.pieceX >= 0 && this.pieceX+this.piece.width() <= COLUMNS && 
      this.pieceY+this.piece.length() <=ROWS)
    {
      this.piece.rotateRight();
    }

    for(let i=0; i<this.piece.length(); i++){
      for(let j=0; j<this.piece.width(); j++){
        let existing = 0;
        if(this.isInBounds(i,j)){
          existing = this.field[this.pieceY+i][this.pieceX+j];
        }
        
        let piece = this.piece.getPiece()[i][j];
        if(existing == 1 && piece == 1){
          this.piece.rotateLeft();
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

  freezeRows(){
    this.getFieldWithPiece();
    this.copyFieldWithPieceToField();
    this.createNewPiece();
    this.score.rowsCompleted(this.checkForCompletedRows());
  }
}