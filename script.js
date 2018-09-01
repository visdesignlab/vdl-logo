let leftSource = d3.select('.left-source');
let midSource = d3.select('.mid-source');
let rightSource = d3.select('.right-source');

setInterval(() => {
  animateBubble(...addBubble(leftSource), 'left');
  animateBubble(...addBubble(midSource), 'mid')
  animateBubble(...addBubble(rightSource), 'right')
}, 2000)

function addBubble(source) {
  let radius = getRandomRadius();
  let xShift = shiftRandom(radius);
  return [source.append('circle').attr('r', radius).attr('transform', `translate(${xShift}, 0)`), xShift];
}

function getRandomRadius() {
  let a = Math.random();
  while (a * 10 < 0.5 && a * 10 > 5) {
    a = Math.random();
  }
  return a * 5;
}

function shiftRandom(radius) {
  let pos = Math.random() > 0.5;
  let a = Math.random() * 10;
  while (a > 5 && a < 1) {
    a = Math.random() * 10;
  }
  if (pos)
    return a - radius * 2;
  return -a + radius * 2;
}

function animateBubble(bubble, xShift, position) {
  let points = getPoints(position, xShift);
  let path = getPath(points, position);
  bubble.transition().duration(sToMs(getRandomTime())).attrTween('transform', translateAlongPath(path.node())).remove();
}

function getPath(points, location) {
  return d3.select('svg').append('path').attr('class', `random-path ${location}`).datum(points).attr('d', d3.line().x(d => d[0]).y(d => d[1]).curve(d3.curveBasis))
}

function getRandomTime() {
  let a = Math.random() * 10;
  while (a < 10 && a > 15) {
    a = Math.random() * 10;
  }
  return a;
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

function getPoints(position, xShift) {
  let points = [
    [xShift, 0],
    [xShift, -50],
  ]
  // points.push(...[
  //   [0, -30 / 2],
  //   [3, -60 / 2],
  //   [40 / 2, -50 / 2],
  //   [50 / 2, -80 / 2],
  //   [40 / 2, -50 / 2],
  //   [20 / 2, -60 / 2],
  //   [30 / 2, -70 / 2],
  //   [50 / 2, -80 / 2],
  //   [80 / 2, -90 / 2],
  //   [10 / 2, -100 / 2],
  // ])
  return points;
}