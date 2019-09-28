const COLOR_S = 0x00F000;
const COLOR_Z = 0x780000;
const COLOR_L = 0xF0A000;
const COLOR_O = 0xF0F000;
const COLOR_I = 0x00F0F0;
const COLOR_J = 0x0000F0;
const COLOR_T = 0xA000F0;

const BLANK_C = 0;

class Piece{

  constructor(){
    this.blocks = [
      [COLOR_O, COLOR_O],
      [COLOR_O, COLOR_O]
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
        [BLANK_C, BLANK_C, BLANK_C, BLANK_C],
        [BLANK_C, BLANK_C, BLANK_C, BLANK_C],
        [COLOR_I, COLOR_I, COLOR_I, COLOR_I],
        [BLANK_C, BLANK_C, BLANK_C, BLANK_C]
      ],
      [
        [BLANK_C, BLANK_C, COLOR_I, BLANK_C],
        [BLANK_C, BLANK_C, COLOR_I, BLANK_C],
        [BLANK_C, BLANK_C, COLOR_I, BLANK_C],
        [BLANK_C, BLANK_C, COLOR_I, BLANK_C]
      ]];
  }
}

class PieceS extends Piece{
  constructor(){
    super(name);
    this.blocks = [
      [
        [BLANK_C, BLANK_C, BLANK_C],
        [BLANK_C, COLOR_S, COLOR_S],
        [COLOR_S, COLOR_S, BLANK_C]
      ],
      [
        [COLOR_S, BLANK_C, BLANK_C],
        [COLOR_S, COLOR_S, BLANK_C],
        [BLANK_C, COLOR_S, BLANK_C]
      ]];
  }
}
 
class PieceZ extends Piece{
  constructor(){
    super(name);
    this.blocks = [
      [
        [BLANK_C, BLANK_C, BLANK_C],
        [COLOR_Z, COLOR_Z, BLANK_C],
        [BLANK_C, COLOR_Z, COLOR_Z]
      ],
      [
        [BLANK_C, BLANK_C, COLOR_Z],
        [BLANK_C, COLOR_Z, COLOR_Z],
        [BLANK_C, COLOR_Z, BLANK_C]
      ]];
  }
}

class PieceO extends Piece{
  constructor(){
    super(name);
    this.blocks = [
      [
        [COLOR_O, COLOR_O],
        [COLOR_O, COLOR_O]
      ]];
  }
}

class PieceL extends Piece{
  constructor(){
    super(name);
    this.blocks = [
      [
        [BLANK_C, BLANK_C, BLANK_C],
        [COLOR_L, COLOR_L, COLOR_L],
        [COLOR_L, BLANK_C, BLANK_C]
      ],
      [
        [COLOR_L, COLOR_L, BLANK_C],
        [BLANK_C, COLOR_L, BLANK_C],
        [BLANK_C, COLOR_L, BLANK_C]
      ],
      [
        [BLANK_C, BLANK_C, BLANK_C],
        [BLANK_C, BLANK_C, COLOR_L],
        [COLOR_L, COLOR_L, COLOR_L]
      ],
      [
        [BLANK_C, COLOR_L, BLANK_C],
        [BLANK_C, COLOR_L, BLANK_C],
        [BLANK_C, COLOR_L, COLOR_L]
      ]];
  }
}

class PieceJ extends Piece{
  constructor(){
    super(name);
    this.blocks = [
      [
        [BLANK_C, BLANK_C, BLANK_C],
        [COLOR_J, COLOR_J, COLOR_J],
        [BLANK_C, BLANK_C, COLOR_J]
      ],
      [
        [BLANK_C, COLOR_J, BLANK_C],
        [BLANK_C, COLOR_J, BLANK_C],
        [COLOR_J, COLOR_J, BLANK_C]
      ],
      [
        [BLANK_C, BLANK_C, BLANK_C],
        [COLOR_J, BLANK_C, BLANK_C],
        [COLOR_J, COLOR_J, COLOR_J]
      ],
      [
        [BLANK_C, COLOR_J, COLOR_J],
        [BLANK_C, COLOR_J, BLANK_C],
        [BLANK_C, COLOR_J, BLANK_C]
      ]];
  }
}

class PieceT extends Piece{
  constructor(){
    super(name);
    this.blocks = [
      [
        [BLANK_C, BLANK_C, BLANK_C],
        [COLOR_T, COLOR_T, COLOR_T],
        [BLANK_C, COLOR_T, BLANK_C]
      ],
      [
        [BLANK_C, COLOR_T, BLANK_C],
        [COLOR_T, COLOR_T, BLANK_C],
        [BLANK_C, COLOR_T, BLANK_C]
      ],
      [
        [BLANK_C, BLANK_C, BLANK_C],
        [BLANK_C, COLOR_T, BLANK_C],
        [COLOR_T, COLOR_T, COLOR_T]
      ],
      [
        [BLANK_C, COLOR_T, BLANK_C],
        [BLANK_C, COLOR_T, COLOR_T],
        [BLANK_C, COLOR_T, BLANK_C]
      ]];
  }
}