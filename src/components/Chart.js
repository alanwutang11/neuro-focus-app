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
  }
}

//vals is the variable that has all the data values 

function Chart({vals}) {
    const classes = useStyles();

    
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
