/** @format */

import React, {useState} from "react";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [previousInput, setPreviousInput] = useState("");
  const [paragraph] = useState("Hello World");

  const handleInputChange = (event) => {
    const currentValue = event.target.value;
    setPreviousInput(userInput);
    checkTyping(currentValue);
    setUserInput(currentValue);
  };

  const checkTyping = (input) => {
    const currentParagraphIndex = userInput.length;
    const userLastInput = input[input.length - 1];
    if (paragraph[currentParagraphIndex] !== userLastInput) {
      console.log("wrong letter");
      console.log(currentParagraphIndex);
      return;
    }
    console.log("right letter");
    if (currentParagraphIndex === paragraph.length - 1) {
      console.log("you finished the paragraph.");
    }
    console.log(currentParagraphIndex);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>Paragraph to type:</h3>
        <p>{paragraph}</p>
        <input
          type="text"
          id="userInput"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Start typing..."
          maxLength={paragraph.length}
        ></input>
        <p>{userInput}</p>
      </header>
    </div>
  );
}

export default App;
