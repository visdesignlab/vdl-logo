let leftSource = d3.select('.left-source');
let midSource = d3.select('.mid-source');
let rightSource = d3.select('.right-source');

let bubble = addBubble(leftSource);
addBubble(midSource);
addBubble(rightSource);

animateBubble(bubble, 'left');

function addBubble(source) {
  return source.append('circle').attr('r', 1)
}

function animateBubble(bubble, position) {
  let points = getPoints(position);

  let path = getPath(points, position);

  bubble.transition().duration(sToMs(7)).attrTween('transform', translateAlongPath(path.node())).remove();
}

function getPoints(position) {
  let points = [
    [0, 0]
  ]

  points.push(...[
    [10 / 2, -30 / 2],
    [20 / 2, -60 / 2],
    [40 / 2, -50 / 2],
    [50 / 2, -80 / 2]
  ])

  return points;
}

function getPath(points, location) {
  return d3.select('svg').append('path').attr('class', `random-path ${location}`).datum(points).attr('d', d3.line().x(d => d[0]).y(d => d[1]).curve(d3.curveBasis))
}

function sToMs(s) {
  return s * 1000;
}

function translateAlongPath(path) {
  let l = path.getTotalLength();
  console.log(l)
  return function (d, i, a) {
    return function (t) {
      let p = path.getPointAtLength(t * l);
      return `translate(${p.x},${p.y})`
    }
  }
}