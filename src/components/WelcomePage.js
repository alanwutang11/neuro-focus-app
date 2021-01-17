import React from 'react';
import {Card, Paper, Typography, makeStyles } from '@material-ui/core';
import SubmitFile from './SubmitFile';


const useStyles = makeStyles(() => ({
    root: {
      height: '100vh',
      marginTop: '-10vh',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'flex-start',
      flexDirection: 'column'
    },
    submitButton: {
    },
    cardStyle: {
      marginBottom: '30px'
    },
    offBlack: {
      color: '#333'
    },
    space: {
      letterSpacing: '2px'
    }
  }));

function WelcomePage({handleFileChosen}) {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Card className={classes.cardStyle}>
                <Typography variant="h6" className={classes.offBlack, classes.space}>
                    WELCOME TO NEURO FOCUS
                </Typography>
                <Typography variant="h2" className={classes.offBlack}>
                    Select a file for upload
                </Typography>
            </Card>
            <Paper className={classes.submitButton} elevation={0}>
                <SubmitFile handleFileChosen={handleFileChosen} />
            </Paper>
        </div>

    );
}

export default WelcomePage;
