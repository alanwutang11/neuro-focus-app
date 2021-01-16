import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Typography,
  Card,
  Paper,
  CardContent,
} from "@material-ui/core";
import raw from "../data/sample-text.txt";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  cardStyle: {
      maxWidth: 600
  }

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
