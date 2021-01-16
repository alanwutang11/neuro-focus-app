import React from 'react';
import {makeStyles } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,  
    },

  }));


function Chart() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
        
        </div>

    );
}
export default Chart