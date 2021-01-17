import React, {useEffect, useState} from 'react';
import { Button, makeStyles} from "@material-ui/core";
import Chart from './Chart';
import ResultsPage from './ResultsPage';

const useStyles = makeStyles(() => ({
  // root: {
  //   // flexGrow: 1,
  // },
 
}));

function DisplayChart({setResults, vals}) {
    const classes = useStyles();
    const [doneClicked, setDoneClicked] = useState(false);

    const handleClick = () => {
      setDoneClicked(true);
      setResults(true);
      console.log("handleclick")
    };
  
    
    return(
        <div>
          <Button onClick={handleClick} variant="outlined" color="secondary">View Results</Button>
          {doneClicked ? <ResultsPage vals={vals}/> : null}

        </div>
    );
}

export default DisplayChart

