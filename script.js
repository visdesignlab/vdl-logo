let leftSource = d3.select('.left-source');
let midSource = d3.select('.mid-source');
let rightSource = d3.select('.right-source');

addBubble(leftSource);
addBubble(midSource);
addBubble(rightSource);

function addBubble(source) {
  source.append('circle').attr('r', 2)
}