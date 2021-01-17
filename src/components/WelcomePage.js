import React from 'react';
import {AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,  
    },
    
   
  }));


function Header() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            
        </div>

    );
}
export default Header