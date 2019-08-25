class PlayField{

  constructor(){
    this.clearFields();
    this.block = this.getRandomBlock();
    this.blockX = 4;
    this.blockY = 0;
  }

  clearFields(){
    this.field = [];
    this.fieldWithBlock = [];
    for(let i = 0; i < 20; i++) {
      this.field.push([0,0,0,0,0,0,0,0,0,0]);
      this.fieldWithBlock.push([0,0,0,0,0,0,0,0,0,0]);
    }
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
        this.fieldWithBlock[i][j] = this.field[i][j];
      }
    }
  }

  getFieldWithBlock(){
    this.copyFieldToFieldWithBlock();

    for(let i=0; i<this.block.piece.length; i++){
      for(let j=0; j<this.block.piece[0].length; j++){
        this.fieldWithBlock[this.blockY+i][this.blockX+j] = this.block.piece[i][j];
      }
    }
    console.log(this.fieldWithBlock);
    return this.fieldWithBlock;
  }
  
}