import React from "react";
import { Wrapper } from "./elements";
import Visualization from "components/Visualization";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  onChangeHandler(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const data = {
      lines: require("../../stuff.json")
    };

    return (
      <Wrapper>
        <input
          type={"range"}
          onChange={this.onChangeHandler.bind(this)}
          value={this.state.value}
        />
        <Visualization id={1} width={300} height={300} data={data} />
      </Wrapper>
    );
  }
}
