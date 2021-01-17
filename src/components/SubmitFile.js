import React, { useEffect, useState } from "react";
import { Button, makeStyles, Typography} from "@material-ui/core";
import TextDisplay from "./TextDisplay";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: "none",
  },
}));

function SubmitFile({handleFileChosen}) {

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
        <Button variant="outlined" color="secondary" component="span" size="large" startIcon={<AddIcon/>}>
          Submit File
        </Button>
      </label>
    </div>
  );
}
export default SubmitFile;
