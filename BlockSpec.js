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

      expect(block.getPiece()).toEqual([
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ]);

      block.rotateRight();

      expect(block.getPiece()).toEqual([
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0]
      ]);
    })
  })
  
  describe('Check T piece rotation', ()=>{
    it('should rotate piece to the right', ()=>{
      let block = new BlockT();

      expect(block.getPiece()).toEqual([
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ]);
      
      block.rotateRight();
      expect(block.getPiece()).toEqual([
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
      ]);

      block.rotateRight();
      expect(block.getPiece()).toEqual([
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1]
      ]);

      block.rotateRight();
      expect(block.getPiece()).toEqual([
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
      ]);

      block.rotateRight();
      expect(block.getPiece()).toEqual([
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ]);
    })
  })

  describe('Check S piece rotation', ()=>{
    it('should rotate piece to the right', ()=>{
      let block = new BlockS();

      expect(block.getPiece()).toEqual([
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
      ]);

      block.rotateRight();
      expect(block.getPiece()).toEqual([
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
      ]);

      block.rotateRight();
      expect(block.getPiece()).toEqual([
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
      ]);

    })
  })

  describe('Check O piece rotation', ()=>{
    it('should not have any effect', ()=>{
      let block = new BlockO();

      expect(block.getPiece()).toEqual([
        [1,1],
        [1,1]
      ]);

      block.rotateRight();
      expect(block.getPiece()).toEqual([
        [1,1],
        [1,1]
      ]);

      block.rotateRight();
      expect(block.getPiece()).toEqual([
        [1,1],
        [1,1]
      ]);
    })
  })

  describe('Check T piece left rotation', ()=>{
    it('should rotate piece to the left', ()=>{
      let block = new BlockT();

      expect(block.getPiece()).toEqual([
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ]);
      
      block.rotateLeft();
      expect(block.getPiece()).toEqual([
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
      ]);

      block.rotateLeft();
      expect(block.getPiece()).toEqual([
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1]
      ]);

      block.rotateLeft();
      expect(block.getPiece()).toEqual([
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
      ]);

      block.rotateLeft();
      expect(block.getPiece()).toEqual([
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ]);
    })
  })

  describe('Piece length should be reported', ()=>{
    it('should report length of I piece', ()=>{
      let block = new BlockI();
      expect(block.length()).toEqual(4);
    })
    it('should report length of T piece', ()=>{
      let block = new BlockT();
      expect(block.length()).toEqual(3);
      block.rotateRight();
      expect(block.length()).toEqual(3);
    })
  })

  describe('Piece width should be reported', ()=>{
    it('should report width of I piece', ()=>{
      let block = new BlockI();
      expect(block.width()).toEqual(4);
    })
    
    it('should report width of T piece', ()=>{
      let block = new BlockT();
      expect(block.width()).toEqual(3);
      block.rotateRight();
      expect(block.width()).toEqual(3);
    })
  })

  describe('Piece first column with set block', ()=>{
    it('should report 0 for O piece', ()=>{
      let block = new BlockO();
      expect(block.firstColumn()).toEqual(0);
    })
    
    it('should report 0 for I piece', ()=>{
      let block = new BlockI();
      expect(block.firstColumn()).toEqual(0);
    })

    it('should report 2 for rotated I piece', ()=>{
      let block = new BlockI();
      block.rotateRight();
      expect(block.firstColumn()).toEqual(2);
    })
  })
})