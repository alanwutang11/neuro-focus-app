import React from 'react';
import {Card, Paper, Typography, makeStyles } from '@material-ui/core';
import SubmitFile from './SubmitFile';


const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,  
    },
    submitButton: {
        

    }
    
   
  }));


function WelcomePage({handleFileChosen}) {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Card> 
                <Typography variant="h1">
                    Welcome To Neuro Focus
                </Typography>
            </Card>
            <Paper className={classes.submitButton} elevation={0}>
                <SubmitFile handleFileChosen={handleFileChosen} />
            </Paper>
        </div>

    );
}
export default WelcomePage;