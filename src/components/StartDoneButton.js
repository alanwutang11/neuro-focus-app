import React, {useState, useEffect} from 'react';
import {Button, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    root: {
      // flexGrow: 1,  
    },
    title: {
        // flexGrow: 1
    },
    startBttn: {
        color: '#00c853',
        borderColor: '#00c853'

    },
    stopBttn: {
        color: '#d50000',
        borderColor: '#d50000'
    }

  }));




function StartDoneButton({handleClickStart, handleClickDone, start}) {
    const classes = useStyles();



    return(
        <div className={classes.root}>
            {start ? <Button className={classes.startBttn} onClick={handleClickStart} variant="outlined" component="span" size="large">
                Start
            </Button> : <Button className={classes.stopBttn} onClick={handleClickDone} variant="outlined" component="span" size="large">
                Stop
            </Button>}
        </div>

    );
}
export default StartDoneButton
