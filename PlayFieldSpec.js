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