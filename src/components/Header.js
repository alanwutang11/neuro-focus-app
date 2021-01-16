import React from 'react';
import SubmitFile from './SubmitFile';
import {AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,  
    },
    title: {
        flexGrow: 1
    }
   
    
  }));


function Header({handleFileChosen}) {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title}>
                        Header
                    </Typography>
                    <SubmitFile handleFileChosen={handleFileChosen}/>
                </Toolbar>
            </AppBar>
        </div>

    );
}
export default Header