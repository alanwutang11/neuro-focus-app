import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TextDisplay from "./components/TextDisplay";
import Chart from "./components/Chart";
import SubmitFile from "./components/SubmitFile";
import ResultsPage from "./components/ResultsPage";
import WelcomePage from "./components/WelcomePage";
import TextPage from "./components/TextPage";
import { Paper } from "@material-ui/core";


import "./App.css";

function App() {
  let fileReader;
  const [text, settext] = useState([]);
  const [textLoaded, setLoaded] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [vals, setvals] = useState([]);
  const [done, setdone] = useState(false);



  //set text loaded to false

  const handleFileRead = (e) => {
    const content = fileReader.result;
    settext(content);
    setLoaded(true);
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const setResults = (val) => {
    console.log("val", val)
    setShowResults(val);
    console.log(showResults)

  };

  const handleClickDone = () => {
    setdone(true);
    fetch("/done")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => setvals(data));
  };


  // useEffect(() => {
  //   if (progress >= 100 ) {
  //     setdoneTimer(true);
  //   }
  // });









  return (
    <div className="App">

      {showResults ? <ResultsPage vals={vals}/> : null}
      {textLoaded && !showResults ? null : <WelcomePage handleFileChosen={handleFileChosen}/>}
      {textLoaded && !showResults ? (<TextPage text={text} setResults={setResults} handleClickDone={handleClickDone} done={done}/>) : null}

    </div>
  );
}

export default App;
