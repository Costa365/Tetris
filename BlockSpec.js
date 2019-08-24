describe('Create block of default type', ()=>{
  it('should be 0', ()=>{
    let block = new Block();
    
    expect(block.type).toBe(0);
  })
})

describe('Create block of specified type', ()=>{
  it('should be 1', ()=>{
    let block = new Block(1);
    
    expect(block.type).toBe(1);
  })
})

describe('Check default rotation', ()=>{
  it('should be 0', ()=>{
    let block = new Block(1);
    
    expect(block.rotation).toBe(0);
  })
})

describe('Check rotation', ()=>{
  it('should rotate once ', ()=>{
    let block = new Block(1);

    block.rotateRight();
    expect(block.rotation).toBe(1);
  })

  it('should rotate back to where it started ', ()=>{
    let block = new Block(1);

    block.rotateRight();
    block.rotateLeft();
    
    expect(block.rotation).toBe(0);
  })

  it('should right rotate 360', ()=>{
    let block = new Block(1);

    for(var i=0; i<4; i++){
      block.rotateRight();
    }
    
    expect(block.rotation).toBe(0);
  })

  it('should left rotate 360', ()=>{
    let block = new Block(1);

    for(var i=0; i<4; i++){
      block.rotateLeft();
    }
    
    expect(block.rotation).toBe(0);
  })
})

describe('Check position', ()=>{
  it('default should be center top ', ()=>{
    let block = new Block();

    expect(block.x).toBe(4);
    expect(block.y).toBe(19);
  })

  it('should move left', ()=>{
    let block = new Block();

    block.moveLeft();

    expect(block.x).toBe(3);
    expect(block.y).toBe(19);
  })

  it('should move to far left', ()=>{
    let block = new Block();

    for(var i=0; i<10; i++){
      block.moveLeft();
    }

    expect(block.x).toBe(0);
    expect(block.y).toBe(19);
  })

  it('should move right', ()=>{
    let block = new Block();

    block.moveRight();

    expect(block.x).toBe(5);
    expect(block.y).toBe(19);
  })

  it('should move to far right', ()=>{
    let block = new Block();

    for(var i=0; i<10; i++){
      block.moveRight();
    }

    expect(block.x).toBe(9);
    expect(block.y).toBe(19);
  })

  it('should move down', ()=>{
    let block = new Block();

    block.moveDown();

    expect(block.x).toBe(4);
    expect(block.y).toBe(18);
  })

  it('should move to bottom', ()=>{
    let block = new Block();

    for(var i=0; i<30; i++){
      block.moveDown();
    }

    expect(block.x).toBe(4);
    expect(block.y).toBe(0);
  })

})