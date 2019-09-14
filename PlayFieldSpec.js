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
      playfield.clearField();
      
      expect(playfield.field.length).toBe(20);
    })

    it('should have 10 empty columns in each row after being cleared', ()=>{
      let playfield = new PlayField();
      playfield.clearField();
      
      for(let i=0; i<20; i++){
        expect(playfield.field[i]).toEqual([0,0,0,0,0,0,0,0,0,0]);
      }
    })
  })

  describe('Get Field with Piece', ()=>{
    it('should return a valid field with a piece', ()=>{
      let playfield = new PlayField(new PieceT());
      let field = playfield.getFieldWithPiece();
      
      expect(field[0]).not.toEqual([0,0,0,0,0,0,0,0,0,0]);
    })

    it('should return main playfield without piece', ()=>{
      let playfield = new PlayField();
      let field = playfield.getFieldWithPiece();
      
      for(let i=0; i<20; i++){
        expect(playfield.field[i]).toEqual([0,0,0,0,0,0,0,0,0,0]);
      }
    })
  })

  describe('Move piece around the play field', ()=>{
    it('should move the piece down', ()=>{
      let playfield = new PlayField();
      let field = playfield.getFieldWithPiece();
      let firstRow = [];
      for(let i=0; i<10; i++){
        firstRow.push(field[0][i]);
      }
      playfield.autoPieceDown();
      let field2 = playfield.getFieldWithPiece();

      expect(field2[1]).toEqual(firstRow);
    })

    it('should dock the piece at the bottom moved down many times', ()=>{
      let playfield = new PlayField(new PieceT());
      let field = playfield.getFieldWithPiece();
      let firstRow = [];
      for(let i=0; i<10; i++){
        firstRow.push(field[0][i]);
      }
      for(let i=0; i<56; i++){
        playfield.autoPieceDown();
      }

      let field2 = playfield.getFieldWithPiece();
      expect(field2[17]).not.toEqual([0,0,0,0,0,0,0,0,0,0]);
    })

    it('should move the piece to the right', ()=>{
      let playfield = new PlayField();
      let field = playfield.getFieldWithPiece();
      let firstRow = [];
      for(let i=0; i<10; i++){
        firstRow.push(field[0][i]);
      }
      playfield.movePieceRight();
      let field2 = playfield.getFieldWithPiece();

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

    it('should move the piece to the far right', ()=>{
      let playfield = new PlayField(new PieceZ());
      let field = playfield.getFieldWithPiece(new PieceO())
      let firstRow = [];
      for(let i=0; i<10; i++){
        firstRow.push(field[0][i]);
      }
      for(let i=0; i<56; i++){
        playfield.movePieceRight();
      }
      let field2 = playfield.getFieldWithPiece();

      expect(field2[0]).not.toEqual([0,0,0,0,0,0,0,0,0,0]);
      expect(field2[0].length).toEqual(10);
    })
  
    it('should move the piece to the left', ()=>{
      let playfield = new PlayField();
      let field = playfield.getFieldWithPiece();
      let firstRow = [];
      for(let i=0; i<10; i++){
        firstRow.push(field[0][i]);
      }
      playfield.movePieceLeft();
      let field2 = playfield.getFieldWithPiece();

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

    it('should move the piece to the far left', ()=>{
      let playfield = new PlayField(new PieceS());
      let field = playfield.getFieldWithPiece();

      for(let i=0; i<56; i++){
        playfield.movePieceLeft();
      }
      
      let field2 = playfield.getFieldWithPiece();

      expect(field2[0]).not.toEqual([0,0,0,0,0,0,0,0,0,0]);
      expect(field2[0].length).toEqual(10);
    })
  })

  describe('Rotate T piece while keeping it centered', ()=>{
    it('should rotate piece', ()=>{
      let playfield = new PlayField(new PieceT);
      let field = playfield.getFieldWithPiece();
      expect(field[0]).toEqual([0,0,0,0,1,1,1,0,0,0]);
      expect(field[1]).toEqual([0,0,0,0,0,1,0,0,0,0]);
      
      playfield.rotatePieceRight();
      field = playfield.getFieldWithPiece();
      expect(field[0]).toEqual([0,0,0,0,1,1,0,0,0,0]);
      expect(field[1]).toEqual([0,0,0,0,0,1,0,0,0,0]);

      playfield.rotatePieceRight();
      field = playfield.getFieldWithPiece();
      expect(field[0]).toEqual([0,0,0,0,0,1,0,0,0,0]);
      expect(field[1]).toEqual([0,0,0,0,1,1,1,0,0,0]);

      playfield.rotatePieceRight();
      field = playfield.getFieldWithPiece();
      expect(field[0]).toEqual([0,0,0,0,0,1,1,0,0,0]);
      expect(field[1]).toEqual([0,0,0,0,0,1,0,0,0,0]);     
    })
  })

  describe('Try to rotate Z piece on the far left', ()=>{
    it('should not rotate piece', ()=>{
      let playfield = new PlayField(new PieceZ);
      playfield.movePieceDown();
      playfield.rotatePieceRight();

      for(let i=0; i<6; i++){
        playfield.movePieceLeft();
      }

      field = playfield.getFieldWithPiece();
      expect(field[0]).toEqual([0,1,0,0,0,0,0,0,0,0]);
      expect(field[1]).toEqual([1,1,0,0,0,0,0,0,0,0]);
      expect(field[2]).toEqual([1,0,0,0,0,0,0,0,0,0]);

      playfield.rotatePieceRight();
      field = playfield.getFieldWithPiece();
      expect(field[0]).toEqual([0,1,0,0,0,0,0,0,0,0]);
      expect(field[1]).toEqual([1,1,0,0,0,0,0,0,0,0]);
      expect(field[2]).toEqual([1,0,0,0,0,0,0,0,0,0]);
    })
  })

  describe('Try to rotate T piece when on 2nd column', ()=>{
    it('should be able to rotate piece', ()=>{
      let playfield = new PlayField(new PieceT);
      playfield.movePieceDown();

      for(let i=0; i<3; i++){
        playfield.rotatePieceRight();
        playfield.movePieceLeft();
      }

      playfield.movePieceLeft();

      field = playfield.getFieldWithPiece();
      expect(field[0]).toEqual([0,1,0,0,0,0,0,0,0,0]);
      expect(field[1]).toEqual([0,1,1,0,0,0,0,0,0,0]);
      expect(field[2]).toEqual([0,1,0,0,0,0,0,0,0,0]);

      playfield.rotatePieceRight();
      field = playfield.getFieldWithPiece();
      expect(field[0]).toEqual([0,0,0,0,0,0,0,0,0,0]);
      expect(field[1]).toEqual([1,1,1,0,0,0,0,0,0,0]);
      expect(field[2]).toEqual([0,1,0,0,0,0,0,0,0,0]);

      playfield.rotatePieceRight();
      field = playfield.getFieldWithPiece();
      expect(field[0]).toEqual([0,1,0,0,0,0,0,0,0,0]);
      expect(field[1]).toEqual([1,1,0,0,0,0,0,0,0,0]);
      expect(field[2]).toEqual([0,1,0,0,0,0,0,0,0,0]);

      playfield.rotatePieceRight();
      field = playfield.getFieldWithPiece();
      expect(field[0]).toEqual([0,0,0,0,0,0,0,0,0,0]);
      expect(field[1]).toEqual([0,1,0,0,0,0,0,0,0,0]);
      expect(field[2]).toEqual([1,1,1,0,0,0,0,0,0,0]);

    })
  })

  describe('Try to rotate S piece on the far right', ()=>{
    it('should rotate piece', ()=>{
      let playfield = new PlayField(new PieceS());

      for(let i=0; i<7; i++){
        playfield.movePieceRight();
      }

      field = playfield.getFieldWithPiece();
      expect(field[0]).toEqual([0,0,0,0,0,0,0,0,1,1]);
      expect(field[1]).toEqual([0,0,0,0,0,0,0,1,1,0]);
      expect(field[2]).toEqual([0,0,0,0,0,0,0,0,0,0]);

      playfield.rotatePieceRight();
      field = playfield.getFieldWithPiece();
      expect(field[0]).toEqual([0,0,0,0,0,0,0,1,1,0]);
      expect(field[1]).toEqual([0,0,0,0,0,0,0,0,1,0]);
    })
  })

  describe('Try to rotate rotated S piece on the far right', ()=>{
    it('should not rotate piece', ()=>{
      let playfield = new PlayField(new PieceS());

      playfield.rotatePieceRight();
      for(let i=0; i<7; i++){
        playfield.movePieceRight();
      }

      field = playfield.getFieldWithPiece();
      expect(field[0]).toEqual([0,0,0,0,0,0,0,0,1,1]);
      expect(field[1]).toEqual([0,0,0,0,0,0,0,0,0,1]);

      playfield.rotatePieceRight();
      field = playfield.getFieldWithPiece();
      expect(field[0]).toEqual([0,0,0,0,0,0,0,0,1,1]);
      expect(field[1]).toEqual([0,0,0,0,0,0,0,0,0,1]);
    })
  })

  describe('Fully populated row should be handled', ()=>{
    it('should remove full line', ()=>{
      let playfield = new PlayField(new PieceO());

      for(let i=0; i<4; i++){
        playfield.movePieceLeft();
      }

      for(let i=0; i<21; i++){
        playfield.autoPieceDown();
      }

      for(let i=0; i<2; i++){
        playfield.movePieceLeft();
      }

      for(let i=0; i<20; i++){
        playfield.autoPieceDown();
      }

      for(let i=0; i<20; i++){
        playfield.autoPieceDown();
      }

      for(let i=0; i<18; i++){
        playfield.autoPieceDown();
      }

      for(let i=0; i<4; i++){
        playfield.movePieceRight();
      }

      for(let i=0; i<20; i++){
        playfield.autoPieceDown();
      }

      for(let i=0; i<2; i++){
        playfield.movePieceRight();
      }

      for(let i=0; i<20; i++){
        playfield.autoPieceDown();
      }

      field = playfield.getFieldWithPiece();
      expect(field[18]).toEqual([0,0,0,0,1,1,0,0,0,0]);
      expect(field[19]).toEqual([0,0,0,0,1,1,0,0,0,0]);
    })
  })

  describe('Get next piece', ()=>{
    it('should return valid piece', ()=>{
      let playfield = new PlayField(new PieceO());
      let piece = playfield.getNextPiece();
      expect(piece.length).toEqual(2);
      expect(piece[0].length).toEqual(2);
    })
  })

  describe('Game over before moves', ()=>{
    it('should not be game over', ()=>{
      let playfield = new PlayField();
      expect(playfield.checkForGameOver()).toEqual(false);
    })
  })

  describe('Game over before top row filled', ()=>{
    it('should not be game over', ()=>{
      let playfield = new PlayField(new PieceS());
      for(let i=0; i<50; i++){
        playfield.autoPieceDown();
      }
      expect(playfield.checkForGameOver()).toEqual(false);
    })
  })

  describe('Game over when top row filled', ()=>{
    it('should be game over', ()=>{
      let playfield = new PlayField(new PieceS());
      for(let i=0; i<100; i++){
        playfield.autoPieceDown();
      }
      expect(playfield.checkForGameOver()).toEqual(true);
    })
  })

  describe('Drop factor', ()=>{
    it('should be 70 after construction', ()=>{
      let playfield = new PlayField(new PieceS());
      
      expect(playfield.getDropFactor()).toEqual(70);
    })

    it('should be 64 on level 1', ()=>{
      let playfield = new PlayField(new PieceS(), 1);
      
      expect(playfield.getDropFactor()).toEqual(64);
    })

    it('should be 10 on level 10', ()=>{
      let playfield = new PlayField(new PieceS(), 10);
      
      expect(playfield.getDropFactor()).toEqual(10);
    })

    it('should be 5 on level 15', ()=>{
      let playfield = new PlayField(new PieceS(), 15);
      
      expect(playfield.getDropFactor()).toEqual(5);
    })

    it('should be 1 on level 30', ()=>{
      let playfield = new PlayField(new PieceS(), 30);
      
      expect(playfield.getDropFactor()).toEqual(1);
    })
  })
})
