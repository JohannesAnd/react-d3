import { select } from "d3-selection";
import { line } from "d3-shape";
import { scaleLinear } from "d3-scale";

export const create = (ref, props) => {
  console.log("created");

  const svg = select(ref);
  update(ref, props);
};

export const update = (ref, props) => {
  console.log("updated");
  const { data, width, height } = props;

  const maxWidth = Math.max(
    ...data.lines.map(el => Math.max(...el.points.map(p => p.x)))
  );
  const maxHeight = Math.max(
    ...data.lines.map(el => Math.max(...el.points.map(p => p.y)))
  );

  // Scales
  const xScale = scaleLinear().domain([0, maxWidth]).range([0, width]);
  const yScale = scaleLinear().domain([0, maxHeight]).range([0, height]);

  // Creates the d attribute based on array of data
  const lineGenerator = line().x(d => xScale(d.x)).y(d => yScale(d.y));

  // Get the SVG dom-element
  const svg = select(ref);
  console.log(data.lines);
  // make a selection of all lines and bind to data
  const update = svg.selectAll(".line").data(data.lines);

  // Add new paths if not enough
  const enter = update
    .enter()
    .append("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "green");

  // Remove paths if too many
  const exit = update.exit();

  // Update line with color and d-attribute
  update.merge(enter).attr("d", d => lineGenerator(d.points));
};

export const destroy = ref => {
  console.log("destroyed");
  const svg = select(ref).remove();
};
