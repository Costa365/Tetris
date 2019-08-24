describe('Check default rotation', ()=>{
  it('should be 0', ()=>{
    let block = new Block();
    
    expect(block.rotation).toBe(0);
  })
})

describe('Check rotation', ()=>{
  it('should rotate once ', ()=>{
    let block = new Block();

    block.rotateRight();
    expect(block.rotation).toBe(1);
  })

  it('should rotate back to where it started ', ()=>{
    let block = new Block();

    block.rotateRight();
    block.rotateLeft();
    
    expect(block.rotation).toBe(0);
  })

  it('should right rotate 360', ()=>{
    let block = new Block();

    for(var i=0; i<4; i++){
      block.rotateRight();
    }
    
    expect(block.rotation).toBe(0);
  })

  it('should left rotate 360', ()=>{
    let block = new Block();

    for(var i=0; i<4; i++){
      block.rotateLeft();
    }
    
    expect(block.rotation).toBe(0);
  })
})

describe('Check I piece rotation', ()=>{
  it('should rotate piece to the right', ()=>{
    let block = new BlockI();

    expect(block.piece[0]).toEqual([1, 0, 0, 0]);
    expect(block.piece[1]).toEqual([1, 0, 0, 0]);
    expect(block.piece[2]).toEqual([1, 0, 0, 0]);
    expect(block.piece[3]).toEqual([1, 0, 0, 0]);

    console.log(block.piece);
  
    block.rotatePiece();

    console.log(block.piece);

    expect(block.piece[0]).toEqual([1, 1, 1, 1]);
    expect(block.piece[1]).toEqual([0, 0, 0, 0]);
    expect(block.piece[2]).toEqual([0, 0, 0, 0]);
    expect(block.piece[3]).toEqual([0, 0, 0, 0]);
  })
})