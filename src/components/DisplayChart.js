import React, {useEffect, useState, Card, CardContent, Typography} from 'react';
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
          <Card>
            <CardContent>
              <Typography variant="body">
                The graph displays how the user's attention and concentration is changing over time. We calculate attention by extracting the ratio of theta waves to beta waves from EEG data and compare it to a baseline value of attention of the user, plotting the data as the change in percent relative to the baseline.
              </Typography>
            </CardContent>
          </Card>
        </div>
    );
}

export default DisplayChart
