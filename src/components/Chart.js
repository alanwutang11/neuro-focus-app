import React from 'react';
import {makeStyles, Typography} from '@material-ui/core';
import {Line} from 'react-chartjs-2';

const useStyles = makeStyles(() => ({



  }));

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
  },
  scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Percent Change',
        fontSize: 24
      }
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Time',
        fontSize: 24
      }
    }],
  }
}

//vals is the variable that has all the data values

function Chart({vals}) {
    var ceil = require('math-ceil');
    const array = [0, 1, 2, 3];
    const duration = array.length;

    console.log(0.8);
    const classes = useStyles();
    const state = {
      /* series: [{
        name: 'Attention',
        data: [10, 50, 70]
      }] */

      labels: [
        0.8,
        0.8+ceil(duration/4)*0.8,
        0.8+ceil(duration/2)*0.8,
        0.8+(duration-1)*0.8
      ],
      datasets: [
        {
          lineTension: 0.5,
          borderColor: 'black',
          borderWidth: 3,
          fill: false,
          data: vals //put the vals here?
        }
      ]

    }
    return(
        <div className={classes.root}>
          <Line
            data={state}
            options={options}
          />

        </div>
    );
}

export default Chart
