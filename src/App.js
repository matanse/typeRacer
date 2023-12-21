/** @format */

import React, {useState} from "react";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  // const [previousInput, setPreviousInput] = useState("");
  const [paragraph] = useState("Hello World");
  const [rightInput, setRightInput] = useState("");
  const [wrongInput, setWrongInput] = useState("");

  const handleInputChange = (event) => {
    const currentValue = event.target.value;
    // setPreviousInput(userInput);
    checkTyping(currentValue);
    setUserInput(currentValue);
  };

  const checkTyping = (input) => {
    const currentParagraphIndex = userInput.length;
    const userLastInput = input[input.length - 1];
    if (paragraph[currentParagraphIndex] !== userLastInput) {
      //! need to change to set only from the point it was wrong forwards.
      setWrongInput(userInput);
      console.log("wrong letter");
      console.log(currentParagraphIndex);
      return;
    }
    //! starting to write right answer one character delay
    setRightInput(userInput);
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
        <p>
          <span style={rightAnswer}>
            {rightInput}
            {/* {userInput} */}
          </span>
          <span style={wrongAnswer}>
            {wrongInput}
            {/* {userInput} */}
          </span>
        </p>
      </header>
    </div>
  );
}
const rightAnswer = {color: "green"};
const wrongAnswer = {color: "red"};
export default App;
