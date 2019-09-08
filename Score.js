class Score{

  constructor(){
    this.score = 0;
    this.lines = 0;
    this.scoreMultipliers = [0, 100, 250, 400, 1000];
  }

  resetScore(){
    this.score = 0;
    this.lines = 0;
  }

  getScore(){
    return this.score;
  }

  getLines(){
    return this.lines;
  }

  rowsCompleted(numRows){
    if(numRows>0 && numRows<5){
      this.score += this.scoreMultipliers[numRows];  
      this.lines += numRows;
    }
  }
}