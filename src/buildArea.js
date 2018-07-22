import * as d3 from "d3";

let areaFunction = d3
  .area()
  .curve(d3.curveCardinal)
  .x(function(d, i, a) {
    return i * (300 / (a.length - 1));
  })
  .y0(() => {
    return 120;
  })
  .y1(function(d) {
    return 110 - d;
  });

export default areaFunction;
