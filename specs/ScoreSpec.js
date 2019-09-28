describe('Score test suite', function () {

  describe('Default score after construction', ()=>{
    it('score should be 0', ()=>{
      let score = new Score();
      
      expect(score.getScore()).toBe(0);
    })
  })

  describe('Score after completed rows', ()=>{
    it('should score a single', ()=>{
      let score = new Score();
      score.rowsCompleted(1);
      expect(score.getScore()).toBe(100);
    })

    it('should score a double', ()=>{
      let score = new Score();
      score.rowsCompleted(2);
      expect(score.getScore()).toBe(250);
    })

    it('should score a triple', ()=>{
      let score = new Score();
      score.rowsCompleted(3);
      expect(score.getScore()).toBe(400);
    })

    it('should score a tetris', ()=>{
      let score = new Score();
      score.rowsCompleted(4);
      expect(score.getScore()).toBe(1000);
    })

    it('should score a single followed by a double', ()=>{
      let score = new Score();
      score.rowsCompleted(1);
      score.rowsCompleted(2);
      expect(score.getScore()).toBe(350);
    })
  })

  describe('Score after completed rows', ()=>{
    it('should scoreset score', ()=>{
      let score = new Score();
      score.rowsCompleted(1);
      score.resetScore();
      expect(score.getScore()).toBe(0);
    })
  })

  describe('Default lines after construction', ()=>{
    it('lines should be 0', ()=>{
      let score = new Score();
      
      expect(score.getLines()).toBe(0);
    })
  })

  describe('Lines after scoring', ()=>{
    it('lines should be 7 after triple and tetris', ()=>{
      let score = new Score();
      score.rowsCompleted(3);
      score.rowsCompleted(4);
      expect(score.getLines()).toBe(7);
    })
  })

  describe('Lines after reset', ()=>{
    it('lines should be 0 after scoring then reset', ()=>{
      let score = new Score();
      score.rowsCompleted(3);
      score.resetScore();
      expect(score.getLines()).toBe(0);
    })
  })

  describe('Level reporting', ()=>{
    it('Level should be 0 after construction', ()=>{
      let score = new Score();
      expect(score.getLevel()).toBe(0);
    })

    it('Level should be 1 after making 12 lines', ()=>{
      let score = new Score();
      
      for(let i=0; i<4; i++){
        score.rowsCompleted(4);
      }
      expect(score.getLevel()).toBe(1);
    })

    it('Level should be 0 after scoring 12 and then resetting', ()=>{
      let score = new Score();
      
      for(let i=0; i<4; i++){
        score.rowsCompleted(4);
      }
      score.resetScore();

      expect(score.getLevel()).toBe(0);
    })
  })
})