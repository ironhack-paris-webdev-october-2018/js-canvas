// get the <canvas> tag from the document
var canvas = document.querySelector(".my-canvas");

// with jQuery
// var canvas = $(".my-canvas")[0];

// get the context object (has all the methods for drawing things)
var ctx = canvas.getContext("2d");


var zombieImg = new Image();
var michaelImg = new Image();
// specify "src" as if it was from the HTML file
zombieImg.src = "./images/zombie.jpeg";
michaelImg.src = "./images/michael.png";

var zombieX = 850;
var zombieY = 200;
var michaelX = 0;
var michaelY = 200;

// call "drawingLoop" the first time to begin the loop
drawingLoop();

// keydown event handler (when user presses down on any key)
document.onkeydown = function (event) {
  switch (event.keyCode) {
    case 37: // left arrow
      michaelX -= 10;
      break;

    case 38: // up arrow
      michaelY -= 10;
      break;

    case 39: // right arrow
      michaelX += 10;
      break;

    case 40: // down arrow
      michaelY += 10;
      break;
  }
};


function drawingLoop() {
  // erase the whole canvas before drawing the scene again (x, y, width, height)
  ctx.clearRect(0, 0, 1000, 550);

  drawBackground();

  // automatically change the zombie's X variable
  zombieX -= 5;
  if (zombieX < -150) {
    zombieX = 1000;
    // give the zombie a random new Y coordinate every time it resets
    zombieY = Math.floor(Math.random() * 500);
  }

  // draw the zombie image (image, x, y, width, height)
  ctx.drawImage(zombieImg, zombieX, zombieY, 150, 150);

  // draw the Michael Jackson image (image, x, y, width, height)
  ctx.drawImage(michaelImg, michaelX, michaelY, 150, 150);

  // ask the browser for the next chance to re-draw the scene
  requestAnimationFrame(function () {
    // set up a recursive loop (the "drawingLoop" function calls itself)
    drawingLoop();
  });
}


function drawBackground() {
  // Drawing Rectangles
  // -----------------------------------------------------------------------------
  // color ALL the next fills "deeppink"
  ctx.fillStyle = "deeppink";
  // draw a solid rectangle (x, y, width, height)
  ctx.fillRect(0, 0, 1000, 550);

  // color ALL the next strokes "gold"
  ctx.strokeStyle = "gold";
  // set the width of ALL the next strokes
  ctx.lineWidth = 10;
  // draw a rectangle outline (x, y, width, height)
  ctx.strokeRect(500, 200, 100, 100);

  ctx.fillStyle = "black";
  ctx.fillRect(500, 200, 80, 80);


  // Drawing Text
  // -----------------------------------------------------------------------------
  // change the size or font family of ALL the next text
  ctx.font = "40px Baskerville, serif";
  // draw some text (string, x, y)
  ctx.fillText("Hello", 900, 40);


  // Drawing Circles
  // -----------------------------------------------------------------------------
  // start a path (custom drawing needed for circles)
  ctx.beginPath();
  // draw a circle (x, y, radius, startAngle, endAngle)
  ctx.arc(400, 100, 75, 0, 2 * Math.PI);
  // stroke the circle
  ctx.strokeStyle = "rebeccapurple";
  ctx.stroke();
  // end the path
  ctx.closePath();

  // draw another circle inside the first one
  ctx.beginPath();
  ctx.arc(400, 100, 40, 0, 2 * Math.PI);
  ctx.fillStyle = "rebeccapurple";
  ctx.fill();
  ctx.closePath();
}
