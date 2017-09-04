import { select } from "d3-selection";
import { line } from "d3-shape";
import { scaleLinear } from "d3-scale";
import { transition } from "d3-transition";

const margin = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10
};

export const create = (ref, props, state) => {
  console.log("created");

  const svg = select(ref);
  update(ref, props, state);
};

export const update = (ref, props, state) => {
  console.log("updated");
  const { data, yKey } = props;
  const { width, height } = state;
  const maxWidth = Math.max(
    ...data.lines.map(el => Math.max(...el.points.map(p => p.x || 0)))
  );
  const maxHeight = Math.max(
    ...data.lines.map(el => Math.max(...el.points.map(p => p[data.yKey] || 0)))
  );

  // Scales
  const xScale = scaleLinear()
    .domain([0, maxWidth])
    .range([margin.left, width - margin.left - margin.right]);
  const yScale = scaleLinear()
    .domain([0, maxHeight])
    .range([margin.top, height - margin.top - margin.bottom]);

  // Creates the d attribute based on array of data
  const lineGenerator = line().x(d => xScale(d.x)).y(d => yScale(d[data.yKey]));

  // Get the SVG dom-element
  const svg = select(ref);

  // make a selection of all lines and bind to data
  const update = svg
    .selectAll(".line")
    .data(
      data.lines.filter(d => (data.yKey === "y" ? true : d.type === "layer")),
      d => d.id
    );

  // Add new paths if not enough
  const enter = update
    .enter()
    .append("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("opacity", 0)
    .attr("stroke", d => d.color || "black");

  // Remove paths if too many
  const exit = update
    .exit()
    .transition()
    .duration(500)
    .attr("opacity", 0)
    .remove();

  // Update line with color and d-attribute
  update
    .merge(enter)
    .transition()
    .duration(1000)
    .attr("opacity", 1)
    .attr("d", d => lineGenerator(d.points));
};

export const destroy = ref => {
  console.log("destroyed");
  const svg = select(ref).remove();
};
