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
})