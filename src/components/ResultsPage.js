import React from 'react';
import {Card, Paper, Typography, Button, makeStyles } from '@material-ui/core';
import Chart from './Chart';


const useStyles = makeStyles(() => ({
    root: {
      height: '100vh',
      marginTop: '-5vh',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'row'
    },
    leftSide: {
    },
    rightSideL: {

    },
    cardStyle: {
      marginBottom: '30px',
      boxShadow: 'none'
    },
    offBlack: {
      color: '#333'
    },
    space: {
      letterSpacing: '2px',
      paddingBottom: '5px'
    }
  }));

function ResultsPage() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
          {/* questions and right/wrong answers */}
          <div className={classes.leftSide}>
            <Typography variant="h6" className={classes.offBlack, classes.space}>
              Questions
            </Typography>
          <Card className={classes.question, classes.cardStyle}>

          </Card>
          <Card className={classes.question, classes.cardStyle}>

          </Card>
          <Card className={classes.question, classes.cardStyle}>

          </Card>
          </div>

          {/* graph and send to email */}
          <div className={classes.rightSide}>
            <Chart/>
            <Button variant="outlined" color="secondary">Email my results</Button>
          </div>
        </div>

    );
}

export default ResultsPage;
