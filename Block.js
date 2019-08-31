class Block{

  constructor(){
    this.piece = [
      [1, 1],
      [1, 1]
    ];
    this.rotation = 0;
  }

  getPiece(){
    return this.piece[this.rotation];
  }
   
  rotateRight(){
    if(++this.rotation >= this.piece.length){
      this.rotation = 0;
    }
  }

  length(){
    return this.piece[this.rotation].length;
  }

  width(){
    return this.piece[this.rotation][0].length;
  }

  firstColumn(){
    let piece = this.getPiece();
    for(let i=0; i<piece[0].length; i++){
      for(let j=0; j<piece.length; j++){
        if(piece[j][i] != 0){  
          return i;
        }
      }
    }
    return 0;
  }
}

class BlockI extends Block{
  constructor(){
    super(name);
    this.piece = [
      [
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
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

class BlockS extends Block{
  constructor(){
    super(name);
    this.piece = [
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
      ]];
  }
}
 
class BlockZ extends Block{
  constructor(){
    super(name);
    this.piece = [
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
      ]];
  }
}

class BlockO extends Block{
  constructor(){
    super(name);
    this.piece = [
      [
        [1, 1],
        [1, 1]
      ]];
  }
}

class BlockL extends Block{
  constructor(){
    super(name);
    this.piece = [
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

class BlockJ extends Block{
  constructor(){
    super(name);
    this.piece = [
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

class BlockT extends Block{
  constructor(){
    super(name);
    this.piece = [
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