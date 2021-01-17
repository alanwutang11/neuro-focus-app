import React from 'react';
import { Button } from "@material-ui/core";
import Chart from './Chart';

  class DisplayChart extends React.Component {
    constructor() {
      super();
      this.state = {
        doneClicked: false
      };
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      this.setState({doneClicked: true});
    }

    render() {
      return (
        <div>
          <Button onClick={this.handleClick} variant="outlined" color="secondary">View Results</Button>
          {this.state.doneClicked ? <Chart vals={this.props.vals}/> : null}
        </div>
      );
    }
  };

export default DisplayChart
