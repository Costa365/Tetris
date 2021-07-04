class AudioWithReplay{

  constructor(file = undefined){
    this.sound = new Audio(file);
  }

  play(){
    if (this.sound.paused){
      this.sound.play();
    }
    else {
      this.sound.pause();
      this.sound.currentTime = 0;
      this.sound.play();
    }
  }
}