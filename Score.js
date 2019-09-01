class Score{

  constructor(){
    this.score = 0;
    this.scoreMultipliers = [0, 100, 250, 400, 1000];
  }

  resetScore(){
    this.score = 0;
  }

  getScore(){
    return this.score;
  }

  rowsCompleted(numRows){
    if(numRows>0 && numRows<5){
      this.score += this.scoreMultipliers[numRows];  
    }
  }
}