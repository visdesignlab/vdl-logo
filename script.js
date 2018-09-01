let leftSource = d3.select('.left-source');
let midSource = d3.select('.mid-source');
let rightSource = d3.select('.right-source');

setInterval(() => {
  animateBubble(...addBubble(leftSource));
  animateBubble(...addBubble(midSource))
  animateBubble(...addBubble(rightSource))
}, 10)

function addBubble(source) {
  let radius = getRandomRadius();
  let xShift = shiftRandom(radius);
  return [source.append('circle').classed("bubble", true).attr('r', radius).attr('transform', `translate(${xShift}, 0)`), xShift];
}

function getRandomRadius() {
  return randomFloatInRange(0.5, 3)
}

function shiftRandom(radius) {
  let a = randomFloatInRange(-5, 5);
  if (Math.abs(a) + radius > 5) {
    if (a < 0) a = a + radius;
    else a = a - radius;
  }
  return a;
}

function animateBubble(bubble, xShift) {
  let points = getPoints(xShift);
  let path = getPath(points);
  bubble.transition().duration(sToMs(getRandomTime())).attrTween('transform', translateAlongPath(path.node())).remove();
}

function getPath(points) {
  return d3.select('svg').append('path').attr('class', `random-path `).datum(points).attr('d', d3.line().x(d => d[0]).y(d => d[1]).curve(d3.curveBasis))
}

function getRandomTime() {
  return randomFloatInRange(10, 15)
}

function sToMs(s) {
  return s * 1000;
}

function translateAlongPath(path) {
  let l = path.getTotalLength();
  return function (d, i, a) {
    return function (t) {
      let p = path.getPointAtLength(t * l);
      return `translate(${p.x}, ${p.y})`;
    }
  }
}

function getPoints(xShift) {
  let points = [
    [xShift, 0],
    [xShift, -40],
  ]
  points.push(...[
    [xShift, -55],
  ])
  return points;
}

function randomFloatInRange(min, max) {
  return Math.random() * (max - min) + min;
}