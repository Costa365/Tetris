class PlayField{

  constructor(block = undefined){
    this.clearFields();
    this.createNewBlock(block);
  }

  clearFields(){
    this.field = [];
    this.fieldWithBlock = [];
    for(let i = 0; i < 20; i++) {
      this.field.push([0,0,0,0,0,0,0,0,0,0]);
      this.fieldWithBlock.push([0,0,0,0,0,0,0,0,0,0]);
    }
  }

  createNewBlock(block){
    if(block == undefined){
      this.block = this.getRandomBlock();  
    }
    else {
      this.block = block;
    }
    this.blockX = 4;
    this.blockY = 0;
  }

  getRandomBlock(){
    let rnd = Math.floor(Math.random() * (7)) + 0;
    let block = new BlockI();
    switch (rnd) {
      case 0:
          block = new BlockI();
          break;
      case 1:
          block = new BlockO();
          break;
      case 2:
          block = new BlockS();
          break;
      case 3:
          block = new BlockZ();
          break;
      case 4:
          block = new BlockT();
          break;
      case 5:
          block = new BlockL();
          break;
      case 6:
          block = new BlockJ();
          break;
      default:
          break;
    }
    return block;
  }

  copyFieldToFieldWithBlock(){
    for(let i = 0; i < this.field.length; i++) {
      for(let j = 0; j < this.field[0].length; j++) {
        if(this.field[i][j] == 1) {
          this.fieldWithBlock[i][j] = 1;
        }
        else {
          this.fieldWithBlock[i][j] = 0;
        }
      }
    }
  }

  copyFieldWithBlockToField(){
    for(let i = 0; i < this.field.length; i++) {
      for(let j = 0; j < this.field[0].length; j++) {
        if(this.fieldWithBlock[i][j] == 1) {
          this.field[i][j] = 1;
        }
        else {
          this.field[i][j] = 0;
        }
      }
    }
  }

  getFieldWithBlock(){
    this.copyFieldToFieldWithBlock();
    for(let i=0; i<this.block.length(); i++){
      for(let j=0; j<this.block.width(); j++){
        if(this.block.getPiece()[i][j] == 1) {
          this.fieldWithBlock[this.blockY+i][this.blockX+j] = 1;
        }
      }
    }
    return this.fieldWithBlock;
  }

  autoBlockDown(){
    if(this.moveBlockDown() == false){
      this.freezeRows();
    }
    return true;
  }

  moveBlockDown(){
    this.blockY++;
    for(let i=0; i<this.block.length(); i++){
      for(let j=0; j<this.block.width(); j++){
        let newPeice = this.block.getPiece()[i][j];
        if(this.blockY+i >= 20 && newPeice==1){
          this.blockY--;
          return false;
        }
        let existingPeice = 0
        if(this.blockY+i < 20 && this.blockX+j < 10){
          existingPeice = this.field[this.blockY+i][this.blockX+j];
        }

        if(existingPeice == 1 && newPeice == 1){
          this.blockY--;
          return false;
        }
      }
    }
    return true;
  }

  moveBlockRight(){
    this.blockX++;
    for(let i=0; i<this.block.length(); i++){
      for(let j=0; j<this.block.width(); j++){
        if(this.blockX+j >= 10 && this.block.getPiece()[i][j]==1){
          this.blockX--;
          return false;
        }
        let existing = 0;
        if(this.blockY+i < 20 && this.blockX+j < 10){
          existing = this.field[this.blockY+i][this.blockX+j];
        }
        let block = this.block.getPiece()[i][j];
        if(existing == 1 && block == 1){
          this.blockX--;
          return false;
        }
      }
    }
    return true;
  }

  moveBlockLeft(){
    this.blockX--;
    for(let i=0; i<this.block.length(); i++){
      for(let j=0; j<this.block.width(); j++){
        if(this.blockX+j < 0 && this.block.getPiece()[i][j]==1){
          this.blockX++;
          return false;
        }
        let existing = 0;
        if(this.blockY+i < 20 && this.blockX+j < 10 ){
          existing = this.field[this.blockY+i][this.blockX+j];
        }
        
        let block = this.block.getPiece()[i][j];
        if(existing == 1 && block == 1){
          this.blockX++;
          return false;
        }
      }
    }
    return true;
  }

  rotateBlockRight(){
    //console.log(`x:${this.blockX}, len:${this.block.length()}, width:${this.block.width()}, firstCol:${this.block.firstColumn()}`);
    if(this.blockX >= 0 && this.blockX+this.block.width() <= 10)
    {
      this.block.rotateRight();
    }
  }

  freezeRows(){
    this.getFieldWithBlock();
    this.copyFieldWithBlockToField();
    this.createNewBlock();
  }
}