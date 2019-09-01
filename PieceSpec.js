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
        [0,0,0,0],
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0]
      ]);

      piece.rotateRight();

      expect(piece.getPiece()).toEqual([
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0]
      ]);
    })
  })
  
  describe('Check T piece rotation', ()=>{
    it('should rotate piece to the right', ()=>{
      let piece = new PieceT();

      expect(piece.getPiece()).toEqual([
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ]);
      
      piece.rotateRight();
      expect(piece.getPiece()).toEqual([
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
      ]);

      piece.rotateRight();
      expect(piece.getPiece()).toEqual([
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1]
      ]);

      piece.rotateRight();
      expect(piece.getPiece()).toEqual([
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
      ]);

      piece.rotateRight();
      expect(piece.getPiece()).toEqual([
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ]);
    })
  })

  describe('Check S piece rotation', ()=>{
    it('should rotate piece to the right', ()=>{
      let piece = new PieceS();

      expect(piece.getPiece()).toEqual([
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
      ]);

      piece.rotateRight();
      expect(piece.getPiece()).toEqual([
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
      ]);

      piece.rotateRight();
      expect(piece.getPiece()).toEqual([
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
      ]);

    })
  })

  describe('Check O piece rotation', ()=>{
    it('should not have any effect', ()=>{
      let piece = new PieceO();

      expect(piece.getPiece()).toEqual([
        [1,1],
        [1,1]
      ]);

      piece.rotateRight();
      expect(piece.getPiece()).toEqual([
        [1,1],
        [1,1]
      ]);

      piece.rotateRight();
      expect(piece.getPiece()).toEqual([
        [1,1],
        [1,1]
      ]);
    })
  })

  describe('Check T piece left rotation', ()=>{
    it('should rotate piece to the left', ()=>{
      let piece = new PieceT();

      expect(piece.getPiece()).toEqual([
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ]);
      
      piece.rotateLeft();
      expect(piece.getPiece()).toEqual([
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
      ]);

      piece.rotateLeft();
      expect(piece.getPiece()).toEqual([
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1]
      ]);

      piece.rotateLeft();
      expect(piece.getPiece()).toEqual([
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
      ]);

      piece.rotateLeft();
      expect(piece.getPiece()).toEqual([
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
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