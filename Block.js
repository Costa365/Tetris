class Block{

  constructor(){
    this.piece = [
      [1, 1],
      [1, 1]
    ];
    this.rotation = 0;
  }
   
  rotateRight(){
    if(++this.rotation > 3){
      this.rotation = 0;
    }
    this.rotatePiece();
  }

  rotatePiece() {
    let result = [];
    for(let i = 0; i < this.piece[0].length; i++) {
        let row = this.piece.map(e => e[i]).reverse();
        result.push(row);
    }
    this.piece = result;
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

class BlockS extends Block{
  constructor(){
    super(name);
    this.piece = [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ];
  }
}
 
class BlockX extends Block{
  constructor(){
    super(name);
    this.piece = [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ];
  }
}

class BlockO extends Block{
  constructor(){
    super(name);
    this.piece = [
      [1, 1],
      [1, 1]
    ];
  }
}

class BlockL extends Block{
  constructor(){
    super(name);
    this.piece = [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 0]
    ];
  }
}

class BlockJ extends Block{
  constructor(){
    super(name);
    this.piece = [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
    ];
  }
}

class BlockT extends Block{
  constructor(){
    super(name);
    this.piece = [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0]
    ];
  }
}