import React from 'react';
import {makeStyles} from '@material-ui/core';
import {Line} from 'react-chartjs-2';


const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },

  }));

const state = {
  /* series: [{
    name: 'Attention',
    data: [10, 50, 70]
  }] */
  labels: ['one', 'two', 'three', 'four', 'five'],
  datasets: [
    {
      lineTension: 0.5,
      borderColor: 'black',
      borderWidth: 7,
      fill: true,
      data: [1, 3, 2, 5, 4]
    }
  ]
}

const options = {
  title: {
    display: true,
    text: 'Attention Over Time',
    align: 'center',
    fontSize: 24
  },
  legend: {
    display: false
  },
  chart: {
    height: 500,
    type: 'line',
  }
}


function Chart() {
    const classes = useStyles();
    return(
        <div id="chart">
          <Line
            data={state}
            options={options}
          />
        </div>
    );
}


export default Chart