class Piece{

  constructor(){
    this.blocks = [
      [1, 1],
      [1, 1]
    ];
    this.rotation = 0;
  }

  getPiece(){
    return this.blocks[this.rotation];
  }
   
  rotateRight(){
    if(++this.rotation >= this.blocks.length){
      this.rotation = 0;
    }
  }

  rotateLeft(){
    if(--this.rotation < 0){
      this.rotation = this.blocks.length-1;
    }
  }

  length(){
    return this.blocks[this.rotation].length;
  }

  width(){
    return this.blocks[this.rotation][0].length;
  }

  firstColumn(){
    let blocks = this.getPiece();
    for(let i=0; i<blocks[0].length; i++){
      for(let j=0; j<blocks.length; j++){
        if(blocks[j][i] != 0){  
          return i;
        }
      }
    }
    return 0;
  }
}

class PieceI extends Piece{
  constructor(){
    super(name);
    this.blocks = [
      [
        [0,0,0,0],
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0]
      ],
      [
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0]
      ]];
  }
}

class PieceS extends Piece{
  constructor(){
    super(name);
    this.blocks = [
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
      ]];
  }
}
 
class PieceZ extends Piece{
  constructor(){
    super(name);
    this.blocks = [
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1]
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
      ]];
  }
}

class PieceO extends Piece{
  constructor(){
    super(name);
    this.blocks = [
      [
        [1, 1],
        [1, 1]
      ]];
  }
}

class PieceL extends Piece{
  constructor(){
    super(name);
    this.blocks = [
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
      ],
      [
        [0, 0, 0],
        [0, 0, 1],
        [1, 1, 1]
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
      ]];
  }
}

class PieceJ extends Piece{
  constructor(){
    super(name);
    this.blocks = [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1]
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
      ],
      [
        [0, 0, 0],
        [1, 0, 0],
        [1, 1, 1]
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
      ]];
  }
}

class PieceT extends Piece{
  constructor(){
    super(name);
    this.blocks = [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
      ],
      [
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1]
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
      ]];
  }
}