//var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
//        window.setTimeout(callback, 10000);
//    };

var animate = function (callback) { window.setTimeout(callback, 1000/10)};
	
var canvas = document.createElement("canvas");
var width = 300;
var height = 600;
var framespersec = 10;
var blockwidth = width/framespersec;
var blockheight = height/20;
var frame = 0;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
var brick = new Brick();

var keysDown = {};

var render = function () {
    context.fillStyle = "#000080";
    context.fillRect(0, 0, width, height);
    brick.render();
};

var update = function () {
    brick.update();
};

var step = function () {
    update();
    render();
    animate(step);
};

function Brick() {
  this.type = 1;
  this.rotate = 0;
  this.y = 0;
  this.x = 0;
}

Brick.prototype.render = function () {
  context.fillStyle = "#ffff00";
  switch (this.type){
    case 0:
      if(this.rotate==0 || this.rotate==2){
        for (i = 0; i < 4; i++) { 
          context.fillRect(this.x, this.y+(blockheight*i), blockwidth, blockheight);
        }
      } else{
        for (i = 0; i < 4; i++) { 
          context.fillRect(this.x+(blockwidth*i), this.y, blockwidth, blockheight);
        }
      }
      break;

    case 1:
      if(this.rotate==0){
        for (i = 0; i < 3; i++) { 
          context.fillRect(this.x+(blockwidth*i), this.y, blockwidth, blockheight);
        }
        context.fillRect(this.x+(blockwidth*1), this.y+(blockheight*1), blockwidth, blockheight);
      }else if(this.rotate==1){
        for (i = 0; i < 3; i++) { 
          context.fillRect(this.x, this.y+(blockheight*i), blockwidth, blockheight);
        }
        context.fillRect(this.x+(blockwidth*1), this.y+(blockheight*1), blockwidth, blockheight);
      }else if(this.rotate==2){
        for (i = 0; i < 3; i++) { 
          context.fillRect(this.x+(blockwidth*i), this.y+(blockheight*1), blockwidth, blockheight);
        }
        context.fillRect(this.x+(blockwidth*1), this.y, blockwidth, blockheight);
      }else if(this.rotate==3){
        for (i = 0; i < 3; i++) { 
          context.fillRect(this.x+(blockwidth*1), this.y+(blockheight*i), blockwidth, blockheight);
        }
        context.fillRect(this.x, this.y+(blockheight*1), blockwidth, blockheight);
      }
      break;

    default:
      break;
  }
  
  
};

Brick.prototype.update = function () {
  for (var key in keysDown) {
    var value = Number(key);
    if (value == 37) {
      this.x=this.x-blockwidth;
      if(this.x<0)this.x=0;
    } else if (value == 39) {
      this.x=this.x+blockwidth;
      if(this.x>width-blockwidth)this.x=width-blockwidth;
    } else if (value == 90) {
      this.rotate = this.rotate+1;
      if(this.rotate>3)this.rotate=0;
    } else if (value == 88) {
      this.rotate = this.rotate-1;
      if(this.rotate<0)this.rotate=3;
    }
    delete keysDown[value];
  }

  if(++frame == framespersec)
  {
    this.y = this.y + blockheight;
    if(this.y > 600) this.y = 0;
    frame = 0;
  }
};

document.body.appendChild(canvas);
animate(step);

window.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
});