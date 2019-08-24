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

  it('should right rotate 360', ()=>{
    let block = new Block();

    for(var i=0; i<4; i++){
      block.rotateRight();
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

    block.rotatePiece();

    expect(block.piece[0]).toEqual([1, 1, 1, 1]);
    expect(block.piece[1]).toEqual([0, 0, 0, 0]);
    expect(block.piece[2]).toEqual([0, 0, 0, 0]);
    expect(block.piece[3]).toEqual([0, 0, 0, 0]);
  })
})

describe('Check T piece rotation', ()=>{
  it('should rotate piece to the right', ()=>{
    let block = new BlockT();

    expect(block.piece[0]).toEqual([1, 1, 1]);
    expect(block.piece[1]).toEqual([0, 1, 0]);
    expect(block.piece[2]).toEqual([0, 0, 0]);

    block.rotatePiece();
    block.rotatePiece();
    block.rotatePiece();
    
    expect(block.piece[0]).toEqual([1, 0, 0]);
    expect(block.piece[1]).toEqual([1, 1, 0]);
    expect(block.piece[2]).toEqual([1, 0, 0]);

    block.rotatePiece();

    expect(block.piece[0]).toEqual([1, 1, 1]);
    expect(block.piece[1]).toEqual([0, 1, 0]);
    expect(block.piece[2]).toEqual([0, 0, 0]);
  })
})

describe('Check O piece rotation', ()=>{
  it('rotation should have no effect', ()=>{
    let block = new BlockO();

    expect(block.piece[0]).toEqual([1, 1]);
    expect(block.piece[1]).toEqual([1, 1]);

    block.rotatePiece();
    expect(block.piece[0]).toEqual([1, 1]);
    expect(block.piece[1]).toEqual([1, 1]);
    
    block.rotatePiece();
    expect(block.piece[0]).toEqual([1, 1]);
    expect(block.piece[1]).toEqual([1, 1]);
  })
})