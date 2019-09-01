const WIDTH = 10;
const HEIGHT = 20;

class PlayField{

  constructor(piece = undefined){
    this.clearField();
    this.createNewPiece(piece);
  }

  clearField(){
    this.field = [];
    this.fieldWithPiece = [];
    for(let i = 0; i < HEIGHT; i++) {
      this.field.push([0,0,0,0,0,0,0,0,0,0]);
      this.fieldWithPiece.push([0,0,0,0,0,0,0,0,0,0]);
    }
  }

  createNewPiece(piece){
    this.pieceX = 4;
    this.pieceY = -1;
    if(piece == undefined){
      this.piece = this.getRandomPiece();  
    }
    else {
      this.piece = piece;
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

  isInBounds(i, j){
    return (this.pieceY+i>=0 && this.pieceY+i<HEIGHT) &&
      (this.pieceX+j>=0 && this.pieceX+j<WIDTH);
  }

  width(){
    return WIDTH;
  }

  height(){
    return HEIGHT;
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
        if(this.pieceY+i >= HEIGHT && newPeice==1){
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
        if(this.pieceX+j >= WIDTH && this.piece.getPiece()[i][j]==1){
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
    if(this.pieceX >= 0 && this.pieceX+this.piece.width() <= WIDTH && 
      this.pieceY+this.piece.length() <=HEIGHT)
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

  freezeRows(){
    this.getFieldWithPiece();
    this.copyFieldWithPieceToField();
    this.createNewPiece();
  }
}