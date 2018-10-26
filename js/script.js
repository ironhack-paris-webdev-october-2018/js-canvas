class Pipe {
  constructor(pipeX, pipeY, pipeWidth, pipeHeight) {
    this.x = pipeX;
    this.y = pipeY;
    this.width = pipeWidth;
    this.height = pipeHeight;
    this.isCrashed = false;
  }

  drawMe() {
    if (!celine.isCrashed) {
      // continue moving only if Celine hasn't crashed
      this.x -= 2;
      if (this.x < -this.width) {
        // reset the pipe back to the right if it goes off-screen
        this.x = 1200;
      }
    }

    if (this.isCrashed) {
      // color the pipe red if it's crashed
      ctx.fillStyle = "tomato";
    }
    else {
      // keep it green otherwise
      ctx.fillStyle = "#057e04";
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}


var canvas = document.querySelector(".flappy-celine");
var ctx = canvas.getContext("2d");

var celineImg = new Image();
celineImg.src = "./images/celine.jpeg";

var celine = {
  x: 0,
  y: 225,
  width: 100,
  height: 100,
  isCrashed: false,
  drawMe: function () {
    ctx.drawImage(celineImg, this.x, this.y, this.width, this.height);
  },
};

var pipe1 = new Pipe(970, 0, 30, 250);

drawingLoop();

document.onkeydown = function (event) {
  if (celine.isCrashed) {
    // exit the function without moving if Celine has crashed
    return;
  }

  switch (event.keyCode) {
    case 37: // left arrow
      celine.x -= 10;
      break;

    case 38: // up arrow
      celine.y -= 10;
      break;

    case 39: // right arrow
      celine.x += 10;
      break;

    case 40: // down arrow
      celine.y += 10;
      break;
  }
};


function drawingLoop() {
  // delete everything drawn before
  ctx.clearRect(0, 0, 1200, 550);

  // draw everything again
  drawEverything();

  requestAnimationFrame(function () {
    drawingLoop();
  });
}


function drawEverything() {
  // draw a border around the canvas
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, 1200, 550);

  // draw our hero Celine
  celine.drawMe();

  // draw pipes
  pipe1.drawMe();

  if (rectangleCollision(celine, pipe1)) {
    celine.isCrashed = true;
    pipe1.isCrashed = true;
  }
}


function rectangleCollision(rectA, rectB) {
  return rectA.y + rectA.height >= rectB.y
    &&   rectA.y <= rectB.y + rectB.height
    &&   rectA.x + rectA.width >= rectB.x
    &&   rectA.x <= rectB.x + rectB.width;
}
