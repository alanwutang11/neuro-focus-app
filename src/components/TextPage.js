import React from 'react';
import {Card, Paper, Typography, makeStyles } from '@material-ui/core';
import TextDisplay from "./TextDisplay";


const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,  
    },
    
    
   
  }));


function TextPage({text}) {
    const classes = useStyles();
    return(
        <div className={classes.root}>
          <TextDisplay text={text} />
        </div>

    );
}
export default TextPage;