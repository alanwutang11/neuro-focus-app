import React, {useState, useEffect} from 'react';
import {Card, Paper, Typography, makeStyles } from '@material-ui/core';
import TextDisplay from "./TextDisplay";
import DisplayChart from "./DisplayChart";
import StartDoneButton from "./StartDoneButton";



//put the states in here. Then, once the stop button is clicked and the data is retreived, then use hoooks to set the state and send those
//props to the chart.




const useStyles = makeStyles(() => ({
    root: {
      height: '100vh',
      marginTop: '-5vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },



  }));


function TextPage({text}) {
    const classes = useStyles();
    const [start, setstart] = useState(true);
    const [vals, setvals] = useState([]);
    const [done, setdone] = useState(false);

    const handleClickStart = () => {
        setstart(false);
        fetch('/api/start')
    }

    const handleClickDone = () => {
        setdone(true);
        fetch('/done').then(response => {
            if (response.ok){
                return response.json()
              }
            }).then(data => setvals(data));
    }

    return(
        <div className={classes.root}>
          <TextDisplay text={text} />
          {done ? <DisplayChart vals={vals}/> : <StartDoneButton handleClickStart={handleClickStart} handleClickDone={handleClickDone} start={start}/>}
        </div>

    );
}
export default TextPage;
