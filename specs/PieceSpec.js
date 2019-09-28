describe('Piece test suite', function () {
  describe('Check default rotation', ()=>{
    it('should be 0', ()=>{
      let piece = new Piece();
      
      expect(piece.rotation).toBe(0);
    })
  })

  describe('Check rotation', ()=>{
    it('should rotate once ', ()=>{
      let piece = new Piece();

      piece.rotateRight();
      expect(piece.rotation).toBe(1);
    })

    it('should right rotate 360', ()=>{
      let piece = new Piece();

      for(let i=0; i<4; i++){
        piece.rotateRight();
      }
      
      expect(piece.rotation).toBe(0);
    })
  })

  describe('Check I piece rotation', ()=>{
    it('should rotate piece to the right', ()=>{
      let piece = new PieceI();

      expect(piece.getPiece()).toEqual([
        [BLANK_C, BLANK_C, BLANK_C, BLANK_C],
        [BLANK_C, BLANK_C, BLANK_C, BLANK_C],
        [COLOR_I, COLOR_I, COLOR_I, COLOR_I],
        [BLANK_C, BLANK_C, BLANK_C, BLANK_C]
      ]);

      piece.rotateRight();

      expect(piece.getPiece()).toEqual([
        [BLANK_C, BLANK_C, COLOR_I, BLANK_C],
        [BLANK_C, BLANK_C, COLOR_I, BLANK_C],
        [BLANK_C, BLANK_C, COLOR_I, BLANK_C],
        [BLANK_C, BLANK_C, COLOR_I, BLANK_C]
      ]);
    })
  })
  
  describe('Check T piece rotation', ()=>{
    it('should rotate piece to the right', ()=>{
      let piece = new PieceT();

      expect(piece.getPiece()).toEqual([
        [BLANK_C, BLANK_C, BLANK_C],
        [COLOR_T, COLOR_T, COLOR_T],
        [BLANK_C, COLOR_T, BLANK_C]
      ]);
      
      piece.rotateRight();
      expect(piece.getPiece()).toEqual([
        [BLANK_C, COLOR_T, BLANK_C],
        [COLOR_T, COLOR_T, BLANK_C],
        [BLANK_C, COLOR_T, BLANK_C]
      ]);

      piece.rotateRight();
      expect(piece.getPiece()).toEqual([
        [BLANK_C, BLANK_C, BLANK_C],
        [BLANK_C, COLOR_T, BLANK_C],
        [COLOR_T, COLOR_T, COLOR_T]
      ]);

      piece.rotateRight();
      expect(piece.getPiece()).toEqual([
        [BLANK_C, COLOR_T, BLANK_C],
        [BLANK_C, COLOR_T, COLOR_T],
        [BLANK_C, COLOR_T, BLANK_C]
      ]);

      piece.rotateRight();
      expect(piece.getPiece()).toEqual([
        [BLANK_C, BLANK_C, BLANK_C],
        [COLOR_T, COLOR_T, COLOR_T],
        [BLANK_C, COLOR_T, BLANK_C]
      ]);
    })
  })

  describe('Check S piece rotation', ()=>{
    it('should rotate piece to the right', ()=>{
      let piece = new PieceS();

      expect(piece.getPiece()).toEqual([
        [BLANK_C, BLANK_C, BLANK_C],
        [BLANK_C, COLOR_S, COLOR_S],
        [COLOR_S, COLOR_S, BLANK_C]
      ]);

      piece.rotateRight();
      expect(piece.getPiece()).toEqual([
        [COLOR_S, BLANK_C, BLANK_C],
        [COLOR_S, COLOR_S, BLANK_C],
        [BLANK_C, COLOR_S, BLANK_C]
      ]);

      piece.rotateRight();
      expect(piece.getPiece()).toEqual([
        [BLANK_C, BLANK_C, BLANK_C],
        [BLANK_C, COLOR_S, COLOR_S],
        [COLOR_S, COLOR_S, BLANK_C]
      ]);

    })
  })

  describe('Check O piece rotation', ()=>{
    it('should not have any effect', ()=>{
      let piece = new PieceO();

      expect(piece.getPiece()).toEqual([
        [COLOR_O, COLOR_O],
        [COLOR_O, COLOR_O]
      ]);

      piece.rotateRight();
      expect(piece.getPiece()).toEqual([
        [COLOR_O, COLOR_O],
        [COLOR_O, COLOR_O]
      ]);

      piece.rotateRight();
      expect(piece.getPiece()).toEqual([
        [COLOR_O, COLOR_O],
        [COLOR_O, COLOR_O]
      ]);
    })
  })

  describe('Check T piece left rotation', ()=>{
    it('should rotate piece to the left', ()=>{
      let piece = new PieceT();

      expect(piece.getPiece()).toEqual([
        [BLANK_C, BLANK_C, BLANK_C],
        [COLOR_T, COLOR_T, COLOR_T],
        [BLANK_C, COLOR_T, BLANK_C]
      ]);
      
      piece.rotateLeft();
      expect(piece.getPiece()).toEqual([
        [BLANK_C, COLOR_T, BLANK_C],
        [BLANK_C, COLOR_T, COLOR_T],
        [BLANK_C, COLOR_T, BLANK_C]
      ]);

      piece.rotateLeft();
      expect(piece.getPiece()).toEqual([
        [BLANK_C, BLANK_C, BLANK_C],
        [BLANK_C, COLOR_T, BLANK_C],
        [COLOR_T, COLOR_T, COLOR_T]
      ]);

      piece.rotateLeft();
      expect(piece.getPiece()).toEqual([
        [BLANK_C, COLOR_T, BLANK_C],
        [COLOR_T, COLOR_T, BLANK_C],
        [BLANK_C, COLOR_T, BLANK_C]
      ]);

      piece.rotateLeft();
      expect(piece.getPiece()).toEqual([
        [BLANK_C, BLANK_C, BLANK_C],
        [COLOR_T, COLOR_T, COLOR_T],
        [BLANK_C, COLOR_T, BLANK_C]
      ]);
    })
  })

  describe('Piece length should be reported', ()=>{
    it('should report length of I piece', ()=>{
      let piece = new PieceI();
      expect(piece.length()).toEqual(4);
    })
    it('should report length of T piece', ()=>{
      let piece = new PieceT();
      expect(piece.length()).toEqual(3);
      piece.rotateRight();
      expect(piece.length()).toEqual(3);
    })
  })

  describe('Piece width should be reported', ()=>{
    it('should report width of I piece', ()=>{
      let piece = new PieceI();
      expect(piece.width()).toEqual(4);
    })
    
    it('should report width of T piece', ()=>{
      let piece = new PieceT();
      expect(piece.width()).toEqual(3);
      piece.rotateRight();
      expect(piece.width()).toEqual(3);
    })
  })

  describe('Piece first column with set piece', ()=>{
    it('should report 0 for O piece', ()=>{
      let piece = new PieceO();
      expect(piece.firstColumn()).toEqual(0);
    })
    
    it('should report 0 for I piece', ()=>{
      let piece = new PieceI();
      expect(piece.firstColumn()).toEqual(0);
    })

    it('should report 2 for rotated I piece', ()=>{
      let piece = new PieceI();
      piece.rotateRight();
      expect(piece.firstColumn()).toEqual(2);
    })
  })
})