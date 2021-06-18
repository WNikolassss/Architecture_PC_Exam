let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');
let path = [],
  id = 0,
  speed = 1;

let radius = 10;

// Handling speed change
document.getElementsByName('speed')[0].addEventListener('change', function () {
  speed = parseInt(this.value);
});

// Handling radius change
document.getElementsByName('radius')[0].addEventListener('change', function () {
  radius = parseInt(this.value);
});

let point = {
  x: 0,
  y: 0,
  draw: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.closePath();
  },
};

function makePoints(numPoints) {
  const diffBetweenPoints = (Math.PI * 2) / (numPoints - 1);
  let arr = [];
  for (let i = 0; i < numPoints; i++) {
    arr.push(Math.sin(i * diffBetweenPoints));
  }
  console.log(arr);
  return arr;
}

function getCurvePath(arr) {
  let x,
    y,
    path = [];
  arr.map((t) => {
    // Удлиненная эпитрохоида
    x = (5 * (0.2 + 1) * Math.cos(0.2 * t) - 0.3 * Math.cos((0.2 + 1) * t)) + 100;
    y = (5 * (0.2 + 1) * Math.sin(0.2 * t) - 0.3 * Math.sin((0.2 + 1) * t)) + 100;
    path.push({ x, y });
  });
  console.log(path);
  return path;
}

function drawCurve(path) {
  ctx.beginPath();
  for (let i = 0; i < path.length; i++) {
    ctx.lineTo(path[i].x, path[i].y);
  }
  ctx.stroke();
  ctx.closePath();
}

path = getCurvePath(makePoints(100));
let i = 0;

function render() {
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  drawCurve(path);
  if (i < path.length) (point.x = path[i].x), (point.y = path[i].y);
  else {
    i = 0;
  }
  i += speed;
  point.draw();
  id = requestAnimationFrame(render);
}
render();
