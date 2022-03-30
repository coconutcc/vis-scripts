function _1(md){return(
md`# Tree Explorer Assignment`
)}

function _trees(d3){return(
d3.csv(
  "https://gis-cityofchampaign.opendata.arcgis.com/datasets/979bbeefffea408e8f1cb7a397196c64_22.csv?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D",
  d3.autoType
)
)}

function _3(md){return(
md`### Individually Selected Trees with Pan and Zoom`
)}

function _4(md){return(
md` The location of the individual tree selected is displayed.`
)}

function _5(html){return(
html`<div id="locations"></div>`
)}

function* _6(d3,trees)
{
  function selectTrees() {  
  const svgheight = 500; 
  const svgwidth = 500;
  
  const svg = d3
  .create("svg")
  .attr("height", svgheight)
  .attr("width", svgwidth)
  .attr("viewBox", "0 0 10 10")
  .style("border", "1px solid #566573");

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(trees, d => d.X))
    .range([0.0, 10]);
  
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(trees, d => d.Y))
    .range([10, 0.0]);
  
  svg.append("g")
  .attr("id", "tree")
  .selectAll("circle")
  .data(trees)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.X))
  .attr("cy", d => yScale(d.Y))
  .attr("r", 0.03)
  .attr('fill', '#2AFBF6 ')
  
  .on('mouseover', function(e, d) {    
       d3.select("#locations").text(`Tree Location: ${d.ADDRESS}${d.STREET}`);
    });

  return {svg: svg, xScale: xScale, yScale: yScale};
  }  
  
  const {svg, xScale, yScale} = selectTrees();
  yield svg.node();
  
  const zoom = d3.zoom();
  const tree = svg.select("g#tree");
  function zoomCalled(event) {   
    const x = event.transform.rescaleX(xScale);
    const y = event.transform.rescaleY(yScale);
    tree.transition().duration(0).attr("transform", event.transform);
  }
  svg.call(zoom.on("zoom", zoomCalled))
}


function _7(md){return(
md`The individual tree selected is marked with an orange dot.`
)}

function* _8(d3,trees)
{
  function selectTrees() {  
  const svgheight = 500; 
  const svgwidth = 500;
  
  const svg = d3
  .create("svg")
  .attr("height", svgheight)
  .attr("width", svgwidth)
  .attr("viewBox", "0 0 10 10")
  .style("border", "1px solid #566573");

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(trees, d => d.X))
    .range([0.0, 10]);
  
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(trees, d => d.Y))
    .range([10, 0.0]);
  
  svg.append("g")
  .attr("id", "tree")
  .selectAll("circle")
  .data(trees)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.X))
  .attr("cy", d => yScale(d.Y))
  .attr("r", 0.03)
  .attr('fill', '#2A74E3')
  
  .on('mouseover', function(e, d) {    
      d3.select(this)
        .attr('r', 0.05)
        .attr('fill', '#FF5733');
    })
  .on('mouseout', function(d, i) {
      d3.select(this)
        .attr('r', 0.01)
        .attr('fill', '#2A74E3');
    });
    
  return {svg: svg, xScale: xScale, yScale: yScale};
  }  
  
  const {svg, xScale, yScale} = selectTrees();
  yield svg.node();
  
  const zoom = d3.zoom();
  const tree = svg.select("g#tree");
  function zoomCalled(event) {   
    const x = event.transform.rescaleX(xScale);
    const y = event.transform.rescaleY(yScale);
    tree.transition().duration(0).attr("transform", event.transform);
  }
  svg.call(zoom.on("zoom", zoomCalled))
}


function _9(md){return(
md`### Brushed Selections of Trees`
)}

function _10(md){return(
md` Areas of trees selected are filled with purple.`
)}

function _11(html){return(
html`<style>
  .selected { fill: #C064ED; }
</style>`
)}

function* _Brush(createTrees,d3,trees)
{
  const {svg, xScale, yScale} = createTrees();
  yield svg.node();
  const tree = svg.select("g#trees");
  const brush = d3.brush().extent([[0, 0], [35, 25]]).handleSize(0.1);
  
  function brushCalled(event) {
    tree.selectAll("circle")
    .data(trees)
    .classed("selected", d => xScale(d.X) > event.selection[0][0]
                && xScale(d.X) < event.selection[1][0]
                && yScale(d.Y) > event.selection[0][1]
                && yScale(d.Y) < event.selection[1][1] );
  }
  
  svg.append("g")
    .style("stroke-width", 0.01)
    .call(brush.on("brush", brushCalled));
}


function _createTrees(d3,trees){return(
function createTrees() {
  const svgWidth = 500;
  const svgHeight = 500; 
  const svg = d3
  .create("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("viewBox", [0, 0, 40, 40])
  .style("border", "solid 1px #566573");
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(trees, d => d.X))
    .range([0.0, 40.0]);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(trees, d => d.Y))
    .range([40.0, 0.0]);
  
  svg.append("g")
    .attr("id", "trees")
    .selectAll("circle")
    .data(trees)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.X))
    .attr("cy", d => yScale(d.Y))
    .attr("r", 0.1)
    .attr('fill', '#4CFB2C ');
  return {svg: svg, xScale: xScale, yScale: yScale};
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("trees")).define("trees", ["d3"], _trees);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["html"], _5);
  main.variable(observer()).define(["d3","trees"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["d3","trees"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["html"], _11);
  main.variable(observer("Brush")).define("Brush", ["createTrees","d3","trees"], _Brush);
  main.variable(observer("createTrees")).define("createTrees", ["d3","trees"], _createTrees);
  return main;
}
