import React from "react";
import { Wrapper, Input } from "./elements";
import Visualization from "components/Visualization";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, value: "y", text: "Depth" };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  onChangeHandler() {
    if (this.state.value === "y") {
      this.setState({ value: "age", text: "Age" });
    } else {
      this.setState({ value: "y", text: "Depth" });
    }
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const data = {
      lines: require("../../stuff.json"),
      yKey: this.state.value
    };

    return (
      <Wrapper>
        <Input
          type={"button"}
          onClick={this.onChangeHandler.bind(this)}
          value={this.state.text}
        />
        <Visualization
          id={1}
          width={this.state.width}
          height={Math.max(this.state.height - 30, 0)}
          data={data}
        />
      </Wrapper>
    );
  }
}
