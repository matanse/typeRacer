/** @format */

import React, {useEffect, useRef, useState} from "react";
import "./App.css";

const App = () => {
  const initialParagraph = "Hello World";

  const [paragraph, setParagraph] = useState(initialParagraph);
  const [userInput, setUserInput] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [showGo, setShowGo] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWPM] = useState(null);
  const [showWPM, setShowWPM] = useState(false);
  const [inputEnabled, setInputEnabled] = useState(true);
  const cursorRef = useRef();

  useEffect(() => {
    let timer;

    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      if (!showGo && countdown === 0) {
        setShowGo(true);
        cursorRef.current.focus(); // Set focus on the input field
        setStartTime(new Date());
      } else if (showGo) {
        const elapsedTime = (new Date() - startTime) / 1000; // in seconds
        const wordsTyped = userInput
          .split(" ")
          .filter((word) => word !== "").length;
        const wordsPerMinute = Math.round((wordsTyped / elapsedTime) * 60);
        setWPM(wordsPerMinute);
        setTimeout(() => {
          setShowWPM(true);
        }, 1000);
      }
    }

    return () => clearTimeout(timer);
  }, [countdown, showGo, startTime, userInput]);

  const handleInputChange = (e) => {
    if (!showGo) {
      // If "GO" has not appeared yet, do not update userInput
      return;
    }

    const input = e.target.value;

    // Check if space is pressed
    // if (input.endsWith(" ")) {
    //   setParagraph(paragraph.substr(wordEndIndex(paragraph), paragraph.length));
    //   // setUserInput("");
    // } else {
    setUserInput(input);
    // }
  };

  const wordEndIndex = (str) => {
    let index = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === " ") {
        index = i + 1;
        break;
      }
    }
    return index;
  };

  const renderParagraph = () => {
    return paragraph.split("").map((char, index) => {
      const isCorrect = userInput[index] === char;
      const isCurrent = index < userInput.length;
      const color = isCorrect ? "green" : isCurrent ? "red" : "white";

      return (
        <span key={index} style={{color}}>
          {char}
        </span>
      );
    });
  };

  const handleStartClick = () => {
    setCountdown(5);
    setShowGo(false);
    setShowWPM(false);
    setWPM(null);
    cursorRef.current.focus(); // Set focus on the input field
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>{renderParagraph()}</p>
          {showWPM ? (
            <p>{wpm} wpm</p>
          ) : showGo ? (
            <p style={{fontSize: "50px", marginTop: "10px", color: "green"}}>
              GO
            </p>
          ) : countdown !== null ? (
            <div
              style={{
                fontSize: "50px",
                marginTop: "10px",
                color: countdown <= 2 ? "yellow" : "red",
              }}
            >
              {countdown}
            </div>
          ) : (
            <button
              onClick={handleStartClick}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                backgroundColor: "red",
                color: "green",
                cursor: "pointer",
                fontSize: "50px",
              }}
            >
              Start
            </button>
          )}
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            ref={cursorRef}
            style={{width: "100%", marginTop: "10px"}}
            disabled={!inputEnabled}
            autoFocus // Add this attribute
          />
        </div>
      </header>
    </div>
  );
};

export default App;
