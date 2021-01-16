import React, { useEffect, useState } from "react";
import Header from './components/Header';
import TextDisplay from './components/TextDisplay';

import './App.css';

function App() {
  let fileReader;
  const [text, settext] = useState([]);

  const handleFileRead = (e) => {
    const content = fileReader.result;
    settext(content);
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <div className="App">
      <Header handleFileChosen={handleFileChosen}/>
      <TextDisplay text={text}/>
    </div>
  );
}

export default App;
