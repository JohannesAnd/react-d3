import React from 'react';
import { Wrapper, Input } from './elements';
import Visualization from 'components/Visualization';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'y', text: 'Depth' };
  }

  onChangeHandler() {
    if (this.state.value === 'y') {
      this.setState({ value: 'age', text: 'Age' });
    } else {
      this.setState({ value: 'y', text: 'Depth' });
    }
  }

  render() {
    const data = {
      lines: require('../../stuff.json').reverse(),
      yKey: this.state.value
    };

    return (
      <Wrapper>
        <Input
          type={'button'}
          onClick={this.onChangeHandler.bind(this)}
          value={this.state.text}
        />
        <Visualization id={1} data={data} />
      </Wrapper>
    );
  }
}
