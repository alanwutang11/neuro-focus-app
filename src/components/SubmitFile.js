import React, { useEffect, useState } from "react";
import { Button, makeStyles, Typography} from "@material-ui/core";
import TextDisplay from "./TextDisplay";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: "none",
  },
}));

function SubmitFile({handleFileChosen}) {

  const [text, settext] = useState([]);
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        type="file"
        className={classes.input}
        id="contained-button-file"
        accept=".txt"
        onChange={(e) => handleFileChosen(e.target.files[0])}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="secondary" component="span">
          Submit File
        </Button>
      </label>
    </div>
  );
}
export default SubmitFile;
