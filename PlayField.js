class PlayField{

  constructor(){
    this.clearFields();
    this.createNewBlock();
  }

  clearFields(){
    this.field = [];
    this.fieldWithBlock = [];
    for(let i = 0; i < 20; i++) {
      this.field.push([0,0,0,0,0,0,0,0,0,0]);
      this.fieldWithBlock.push([0,0,0,0,0,0,0,0,0,0]);
    }
  }

  createNewBlock(){
    this.block = this.getRandomBlock();
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
        if(this.block.piece[i][j] == 1) {
          this.fieldWithBlock[this.blockY+i][this.blockX+j] = 1;
        }
        else {
          this.fieldWithBlock[this.blockY+i][this.blockX+j] = 0;
        }
      }
    }
    return this.fieldWithBlock;
  }

  moveBlockDown(){
    this.blockY++;
    for(let i=0; i<this.block.length(); i++){
      for(let j=0; j<this.block.width(); j++){
        if(this.blockY+i >= 20){
          this.blockY--;
          this.freezeRows();
          return false;
        }
        let existing = this.field[this.blockY+i][this.blockX+j];
        let block = this.block.piece[i][j];
        if(existing == 1 && block == 1){
          this.blockY--;
          this.freezeRows();
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
        if(this.blockX+j >= 10){
          this.blockX--;
          return false;
        }
        let existing = this.field[this.blockY+i][this.blockX+j];
        let block = this.block.piece[i][j];
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
        if(this.blockX < 0){
          this.blockX = 0;
          return false;
        }
        let existing = this.field[this.blockY+i][this.blockX+j];
        let block = this.block.piece[i][j];
        if(existing == 1 && block == 1){
          this.blockX--;
          return false;
        }
      }
    }
    return true;
  }

  freezeRows(){
    this.getFieldWithBlock();
    this.copyFieldWithBlockToField();
    this.createNewBlock();
  }
}