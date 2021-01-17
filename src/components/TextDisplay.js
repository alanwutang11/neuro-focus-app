import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Typography,
  Card,
  Paper,
  CardContent,
} from "@material-ui/core";
import raw from "../data/sample-text.txt";
import StartDoneButton from "./StartDoneButton";


//once the start button is clicked, then possibly have the border of the text display turn 
//green or indicate "running" until the user presses stop

//once the user hasa pressed stop, make the view results button available and then display the graph 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // cardStyle: {
   
  // }

}));

function TextDisplay({text}) {
  const classes = useStyles();


//   useEffect(() => {
//     fetch(raw)
//       .then((r) => r.text())
//       .then((text) => {
//         settext(text);
//       });
//   });

  return (
    <div className={classes.root}>
      <Card className={classes.cardStyle}>
        <CardContent>
          <Typography>{text}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
export default TextDisplay;
