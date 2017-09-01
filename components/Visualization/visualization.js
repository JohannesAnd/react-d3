import { select } from "d3-selection";
import { line } from "d3-shape";

export const create = ref => {
  console.log("created");

  const svg = select(ref);
};

export const update = (ref, data) => {
  console.log("updated");

  // Creates the d attribute based on array of data
  const lineGenerator = line().x(d => d.x).y(d => d.y);

  // Get the SVG dom-element
  const svg = select(ref);

  // make a selection of all lines and bind to data
  const update = svg.selectAll(".line").data(data.lines);

  // Add new paths if not enough
  const enter = update.enter().append("path").attr("class", "line");

  // Remove paths if too many
  const exit = update.exit();

  // Update line with color and d-attribute
  update
    .merge(enter)
    .attr("d", d => lineGenerator(d.points))
    .attr("stroke", d => d.color);
};

export const destroy = ref => {
  console.log("destroyed");
  const svg = select(ref).remove();
};
