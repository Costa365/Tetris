class Block{

  constructor(){
    this.piece = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    this.rotation = 0;
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
 