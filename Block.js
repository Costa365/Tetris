class Block{

  constructor(type = 0){
    this.piece = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    this.type = type;
    this.rotation = 0;
    this.x = 4;
    this.y = 19;
  }
   
  rotateRight(){
    if(++this.rotation > 3){
      this.rotation = 0;
    }
  }

  rotateLeft(){
    if(--this.rotation < 0){
      this.rotation = 3;
    }
  }

  moveLeft(){
    if(--this.x < 0){
      this.x = 0;
    }
  }

  moveRight(){
    if(++this.x > 9){
      this.x = 9;
    }
  }

  moveDown(){
    if(--this.y < 0){
      this.y = 0;
    }
  }
}

class BlockI extends Block{
  constructor(){
    super(name);
    this.piece = [
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0]
    ];
  }
}
 