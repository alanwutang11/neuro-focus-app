import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TextDisplay from "./components/TextDisplay";
import Chart from "./components/Chart";
import SubmitFile from "./components/SubmitFile";
import DisplayChart from "./components/DisplayChart";
import WelcomePage from "./components/WelcomePage";
import TextPage from "./components/TextPage";
import { Paper } from "@material-ui/core";


import "./App.css";

function App() {
  let fileReader;
  const [text, settext] = useState([]);
  const [textLoaded, setLoaded] = useState(false);

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

  useEffect(() => {
    fetch('/api').then(response => {
      if (response.ok){
        return response.json()
      }
    }).then(data => console.log(data))
  }, [])

  return (
    <div className="App">

      {textLoaded ? null : <WelcomePage handleFileChosen={handleFileChosen}/>}
      {textLoaded ? (
        <TextPage text={text}/>
      ) : null}
      
      {textLoaded ? <DisplayChart/> : null}
      

      
    </div>
  );
}

export default App;
