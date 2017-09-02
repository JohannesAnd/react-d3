import React from "react";
import { create, update, destroy } from "./visualization";

export default class Visualization extends React.Component {
  componentDidMount() {
    create(this.svg, this.props);
  }

  componentDidUpdate() {
    update(this.svg, this.props);
  }

  componentWillUnmount() {
    destroy(this.svg);
  }

  render() {
    return (
      <svg
        id={`visualization${this.props.id}`}
        ref={svg => (this.svg = svg)}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}
