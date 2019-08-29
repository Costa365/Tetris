describe('Playfield test suite', function () {

  describe('Default playfield after construction', ()=>{
    it('should have 20 rows', ()=>{
      let playfield = new PlayField();
      
      expect(playfield.field.length).toBe(20);
    })

    it('should have 10 empty columns in each row', ()=>{
      let playfield = new PlayField();
      
      for(let i=0; i<20; i++){
        expect(playfield.field[i]).toEqual([0,0,0,0,0,0,0,0,0,0]);
      }
    })
  })

  describe('Clear playfield', ()=>{
    it('should be 20 rows after being cleared', ()=>{
      let playfield = new PlayField();
      playfield.clearFields();
      
      expect(playfield.field.length).toBe(20);
    })

    it('should have 10 empty columns in each row after being cleared', ()=>{
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
  })

  describe('Get Field with Block', ()=>{
    /*it('should return a valid field with a block', ()=>{
      let playfield = new PlayField();
      let field = playfield.getFieldWithBlock();
      
      expect(field[0]).not.toEqual([0,0,0,0,0,0,0,0,0,0]);
    })*/

    it('should return main playfield without block', ()=>{
      let playfield = new PlayField();
      let field = playfield.getFieldWithBlock();
      
      for(let i=0; i<20; i++){
        expect(playfield.field[i]).toEqual([0,0,0,0,0,0,0,0,0,0]);
      }
    })
  })

  describe('Move block around the play field', ()=>{
    it('should move the block down', ()=>{
      let playfield = new PlayField();
      let field = playfield.getFieldWithBlock();
      let firstRow = [];
      for(let i=0; i<10; i++){
        firstRow.push(field[0][i]);
      }
      playfield.autoBlockDown();
      let field2 = playfield.getFieldWithBlock();

      expect(field2[1]).toEqual(firstRow);
    })

    it('should docked the block at the bottom moved down many times', ()=>{
      let playfield = new PlayField();
      let field = playfield.getFieldWithBlock();
      let firstRow = [];
      for(let i=0; i<10; i++){
        firstRow.push(field[0][i]);
      }
      for(let i=0; i<56; i++){
        playfield.autoBlockDown();
      }

      let field2 = playfield.getFieldWithBlock();

      expect(field2[17]).not.toEqual([0,0,0,0,0,0,0,0,0,0]);

      //console.log(playfield.fieldWithBlock);
    })

    it('should move the block to the right', ()=>{
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

    /*it('should move the block to the far right', ()=>{
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
    })*/
  
    it('should move the block to the left', ()=>{
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

    /*it('should move the block to the far left', ()=>{
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
    })*/
  })

  /*describe('Rotate T block while keeping it centered', ()=>{
    it('should rotate block', ()=>{
      let playfield = new PlayField(new BlockT);
      let field = playfield.getFieldWithBlock();
      expect(field[0]).toEqual([0,0,0,0,1,1,1,0,0,0]);
      expect(field[1]).toEqual([0,0,0,0,0,1,0,0,0,0]);
      
      playfield.rotateBlockRight();
      field = playfield.getFieldWithBlock();
      expect(field[0]).toEqual([0,0,0,0,0,1,0,0,0,0]);
      expect(field[1]).toEqual([0,0,0,0,1,1,0,0,0,0]);
      expect(field[2]).toEqual([0,0,0,0,0,1,0,0,0,0]);

      playfield.rotateBlockRight();
      field = playfield.getFieldWithBlock();
      expect(field[0]).toEqual([0,0,0,0,0,1,0,0,0,0]);
      expect(field[1]).toEqual([0,0,0,0,1,1,1,0,0,0]);
      expect(field[2]).toEqual([0,0,0,0,0,0,0,0,0,0]);

      playfield.rotateBlockRight();
      field = playfield.getFieldWithBlock();
      //expect(field[0]).toEqual([0,0,0,0,0,1,0,0,0,0]);
      //expect(field[1]).toEqual([0,0,0,0,0,1,1,0,0,0]);
      //expect(field[2]).toEqual([0,0,0,0,0,1,0,0,0,0]);
      expect(field[0]).toEqual([0,0,0,0,1,0,0,0,0,0]);
      expect(field[1]).toEqual([0,0,0,0,1,1,0,0,0,0]);
      expect(field[2]).toEqual([0,0,0,0,1,0,0,0,0,0]);
      
    })
  })*/
})
