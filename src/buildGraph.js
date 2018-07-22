import * as d3 from "d3";
window["d3"] = d3;

let line = d3.line();
let curve = line.curve(d3.curveCardinal);
let graphBuild = curve.x((data, i, a) => {
  return i * (300 / (a.length - 1));
});
graphBuild = graphBuild.y((data, i) => {
  return 110 - data;
});

export default graphBuild;
