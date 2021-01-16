import React from 'react';
import { Button } from "@material-ui/core";
import Chart from './Chart';

  class DisplayChart extends React.Component {
    constructor() {
      super();
      this.state = {
        clicked: false
      };
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      this.setState({clicked: true});
    }

    render() {
      return (
        <div>
          <Button onClick={this.handleClick} variant="contained" color="primary">Click this</Button>
          {this.state.clicked ? <Chart/> : null}
        </div>
      );
    }
  };

export default DisplayChart
