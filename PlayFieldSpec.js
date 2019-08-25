describe('Default playfield after construction', ()=>{
  it('should be all rows', ()=>{
    let playfield = new PlayField();
    
    expect(playfield.field.length).toBe(20);
  })

  it('all rows should have 10 empty columns', ()=>{
    let playfield = new PlayField();
    
    for(let i=0; i<20; i++){
      expect(playfield.field[i]).toEqual([0,0,0,0,0,0,0,0,0,0]);
    }
  })
})

describe('Clear playfield', ()=>{
  it('should be 20 rows', ()=>{
    let playfield = new PlayField();
    playfield.clearFields();
    
    expect(playfield.field.length).toBe(20);
  })

  it('all rows should have 10 empty columns', ()=>{
    let playfield = new PlayField();
    playfield.clearFields();
    
    for(let i=0; i<20; i++){
      expect(playfield.field[i]).toEqual([0,0,0,0,0,0,0,0,0,0]);
    }
  })
})

describe('Random block generation', ()=>{
  it('should return a valid block', ()=>{
    let playfield = new PlayField();
    let block = playfield.getRandomBlock();
    
    expect(block.piece.length >= 2).toBe(true);
  })

  it('all rows should have 10 empty columns', ()=>{
    let playfield = new PlayField();
    playfield.clearFields();
    
    for(let i=0; i<20; i++){
      expect(playfield.field[i]).toEqual([0,0,0,0,0,0,0,0,0,0]);
    }
  })
})

describe('Get Field with Block', ()=>{
  it('should return a valid field with a block', ()=>{
    let playfield = new PlayField();
    let field = playfield.getFieldWithBlock();
    
    expect(field[0]).not.toEqual([0,0,0,0,0,0,0,0,0,0]);
  })

  it('main playfield should not include block', ()=>{
    let playfield = new PlayField();
    let field = playfield.getFieldWithBlock();
    
    for(let i=0; i<20; i++){
      expect(playfield.field[i]).toEqual([0,0,0,0,0,0,0,0,0,0]);
    }
  })
})

describe('Move block around the play field', ()=>{
  it('block should be moved down', ()=>{
    let playfield = new PlayField();
    let field = playfield.getFieldWithBlock();
    let firstRow = [];
    for(let i=0; i<10; i++){
      firstRow.push(field[0][i]);
    }
    playfield.moveBlockDown();
    let field2 = playfield.getFieldWithBlock();

    expect(field2[1]).toEqual(firstRow);
  })

  it('block should be docked at the bottom of field when moved dow', ()=>{
    let playfield = new PlayField();
    let field = playfield.getFieldWithBlock();
    let firstRow = [];
    for(let i=0; i<10; i++){
      firstRow.push(field[0][i]);
    }
    for(let i=0; i<56; i++){
      playfield.moveBlockDown();
    }

    let field2 = playfield.getFieldWithBlock();

    expect(field2[17]).not.toEqual([0,0,0,0,0,0,0,0,0,0]);

    //console.log(playfield.fieldWithBlock);
  })

  it('block should be moved right', ()=>{
    let playfield = new PlayField();
    let field = playfield.getFieldWithBlock();
    let firstRow = [];
    for(let i=0; i<10; i++){
      firstRow.push(field[0][i]);
    }
    playfield.moveBlockRight();
    let field2 = playfield.getFieldWithBlock();

    expect(field2[0][1]).toEqual(firstRow[0]);
    expect(field2[0][2]).toEqual(firstRow[1]);
    expect(field2[0][3]).toEqual(firstRow[2]);
    expect(field2[0][4]).toEqual(firstRow[3]);
    expect(field2[0][5]).toEqual(firstRow[4]);
    expect(field2[0][6]).toEqual(firstRow[5]);
    expect(field2[0][7]).toEqual(firstRow[6]);
    expect(field2[0][8]).toEqual(firstRow[7]);
    expect(field2[0][9]).toEqual(firstRow[8]);
  })

  it('block should be moved to far right', ()=>{
    let playfield = new PlayField();
    let field = playfield.getFieldWithBlock();
    let firstRow = [];
    for(let i=0; i<10; i++){
      firstRow.push(field[0][i]);
    }
    for(let i=0; i<56; i++){
      playfield.moveBlockRight();
    }
    let field2 = playfield.getFieldWithBlock();
    //console.log(field2);

    expect(field2[0]).not.toEqual([0,0,0,0,0,0,0,0,0,0]);
    expect(field2[0].length).toEqual(10);
  })
})

it('block should be moved left', ()=>{
  let playfield = new PlayField();
  let field = playfield.getFieldWithBlock();
  let firstRow = [];
  for(let i=0; i<10; i++){
    firstRow.push(field[0][i]);
  }
  playfield.moveBlockLeft();
  let field2 = playfield.getFieldWithBlock();

  expect(field2[0][0]).toEqual(firstRow[1]);
  expect(field2[0][0]).toEqual(firstRow[2]);
  expect(field2[0][2]).toEqual(firstRow[3]);
  expect(field2[0][3]).toEqual(firstRow[4]);
  expect(field2[0][4]).toEqual(firstRow[5]);
  expect(field2[0][5]).toEqual(firstRow[6]);
  expect(field2[0][6]).toEqual(firstRow[7]);
  expect(field2[0][7]).toEqual(firstRow[8]);
  expect(field2[0][8]).toEqual(firstRow[9]);
})

it('block should be moved to far left', ()=>{
  let playfield = new PlayField();
  let field = playfield.getFieldWithBlock();
  let firstRow = [];
  for(let i=0; i<10; i++){
    firstRow.push(field[0][i]);
  }
  for(let i=0; i<56; i++){
    playfield.moveBlockLeft();
  }
  
  let field2 = playfield.getFieldWithBlock();
  //console.log(field2);

  expect(field2[0]).not.toEqual([0,0,0,0,0,0,0,0,0,0]);
  expect(field2[0].length).toEqual(10);
})
