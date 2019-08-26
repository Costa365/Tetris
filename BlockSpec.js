describe('Block test suite', function () {
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

      for(let i=0; i<4; i++){
        block.rotateRight();
      }
      
      expect(block.rotation).toBe(0);
    })
  })

  describe('Check I piece rotation', ()=>{
    it('should rotate piece to the right', ()=>{
      let block = new BlockI();

      expect(block.piece[0]).toEqual([1]);
      expect(block.piece[1]).toEqual([1]);
      expect(block.piece[2]).toEqual([1]);
      expect(block.piece[3]).toEqual([1]);

      block.rotatePiece();

      expect(block.piece.length).toBe(1);
      expect(block.piece[0]).toEqual([1, 1, 1, 1]);
    })
  })

  describe('Check T piece rotation', ()=>{
    it('should rotate piece to the right', ()=>{
      let block = new BlockT();

      expect(block.piece.length).toBe(2);
      expect(block.piece[0]).toEqual([1, 1, 1]);
      expect(block.piece[1]).toEqual([0, 1, 0]);
      
      block.rotatePiece();
      expect(block.piece[0]).toEqual([0, 1]);
      expect(block.piece[1]).toEqual([1, 1]);
      expect(block.piece[2]).toEqual([0, 1]);

      block.rotatePiece();
      expect(block.piece[0]).toEqual([0, 1, 0]);
      expect(block.piece[1]).toEqual([1, 1, 1]);

      block.rotatePiece();
      expect(block.piece[0]).toEqual([1, 0]);
      expect(block.piece[1]).toEqual([1, 1]);
      expect(block.piece[2]).toEqual([1, 0]);

      block.rotatePiece();
      expect(block.piece[0]).toEqual([1, 1, 1]);
      expect(block.piece[1]).toEqual([0, 1, 0]);
    })
  })

  describe('Check S piece rotation', ()=>{
    it('should rotate piece to the right', ()=>{
      let block = new BlockS();

      expect(block.piece.length).toBe(2);
      expect(block.piece[0]).toEqual([0, 1, 1]);
      expect(block.piece[1]).toEqual([1, 1, 0]);
      
      block.rotatePiece();
      expect(block.piece[0]).toEqual([1, 0]);
      expect(block.piece[1]).toEqual([1, 1]);
      expect(block.piece[2]).toEqual([0, 1]);

      block.rotatePiece();
      expect(block.piece[0]).toEqual([0, 1, 1]);
      expect(block.piece[1]).toEqual([1, 1, 0]);

      block.rotatePiece();
      expect(block.piece[0]).toEqual([1, 0]);
      expect(block.piece[1]).toEqual([1, 1]);
      expect(block.piece[2]).toEqual([0, 1]);

      block.rotatePiece();
      expect(block.piece[0]).toEqual([0, 1, 1]);
      expect(block.piece[1]).toEqual([1, 1, 0]);
    })
  })

  describe('Check O piece rotation', ()=>{
    it('should not have any effect', ()=>{
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

  describe('Piece length should be reported', ()=>{
    it('should report length of I piece', ()=>{
      let block = new BlockI();
      expect(block.length()).toEqual(4);
    })
    it('should report length of T piece', ()=>{
      let block = new BlockT();
      expect(block.length()).toEqual(2);
      block.rotateRight();
      expect(block.length()).toEqual(3);
    })
  })

  describe('Piece width should be reported', ()=>{
    it('should report width of I piece', ()=>{
      let block = new BlockI();
      expect(block.width()).toEqual(1);
    })
    
    it('should report width of T piece', ()=>{
      let block = new BlockT();
      expect(block.width()).toEqual(3);
      block.rotateRight();
      expect(block.width()).toEqual(2);
    })
  })
})