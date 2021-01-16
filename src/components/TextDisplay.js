import React from 'react';
import {makeStyles} from '@material-ui/core';


const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,  
    },
    
   
    
  }));


function TextDisplay() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            
        </div>

    );
}
export default TextDisplay;