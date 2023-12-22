/** @format */

import React, {useEffect, useRef, useState} from "react";
import "./App.css";

// todo: the cursor can add characters not at the end of the input.
//! it should be only from the end adding and deleting.

const App = () => {
  const initialParagraph = "Hello World";

  const [paragraph, setParagraph] = useState(initialParagraph);
  const [userInput, setUserInput] = useState("");
  const cursorRef = useRef();

  useEffect(() => {
    // Ensure the cursor is always at the end
    if (cursorRef.current) {
      cursorRef.current.setSelectionRange(userInput.length, userInput.length);
    }
  }, [userInput]);

  const handleInputChange = (e) => {
    const input = e.target.value;

    if (input.endsWith(" ")) {
      // If the last character is a space, clear the input
      setUserInput("");
    } else {
      setUserInput(input);
    }
  };

  const renderParagraph = () => {
    const characters = paragraph.split("");

    return characters.map((char, index) => {
      let color = "white";

      if (userInput[index] === char) {
        color = "green";
      } else if (userInput[index]) {
        color = "red";
      }

      return (
        <span key={index} style={{color}}>
          {char}
        </span>
      );
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>{renderParagraph()}</p>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            ref={cursorRef}
          />
        </div>
      </header>
    </div>
  );
};

// const App = () => {
//   const initialParagraph = "Hello World";

//   const [
//     paragraph /* todo: make a function that sets a new paragraph -> setParagraph*/,
//   ] = useState(initialParagraph);
//   const [userInput, setUserInput] = useState("");
//   const [rightInput, setRightInput] = useState("");
//   const [wrongInput, setWrongInput] = useState("");

//   const cursorRef = useRef();

//   const updateInputs = useCallback(() => {
//     const newRightInput = [];
//     const newWrongInput = [];

//     for (let i = 0; i < userInput.length; i++) {
//       if (userInput[i] === paragraph[i]) {
//         newRightInput.push(userInput[i]);
//       } else {
//         newWrongInput.push(userInput[i]);
//       }
//     }

//     setRightInput(newRightInput.join(""));
//     setWrongInput(newWrongInput.join(""));
//   }, [userInput, paragraph]);

//   useEffect(() => {
//     updateInputs();
//   }, [userInput, updateInputs, paragraph]);

//   const handleInputChange = (e) => {
//     const input = e.target.value;

//     // Ensure the cursor is always at the end
//     if (cursorRef.current && e.target.selectionStart !== input.length) {
//       cursorRef.current.setSelectionRange(input.length, input.length);
//     }

//     setUserInput(input);
//   };

//   const handleKeyDown = (e) => {
//     // Intercept Backspace key to prevent moving the cursor
//     if (
//       e.key === "Backspace" &&
//       cursorRef.current &&
//       cursorRef.current.selectionStart !== userInput.length
//     ) {
//       setUserInput(userInput.slice(0, -1));
//       e.preventDefault();
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <div>
//           <p>{paragraph}</p>
//           <input
//             type="text"
//             value={userInput}
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//             ref={cursorRef}
//           />
//         </div>
//         <div>
//           <span style={{color: "green"}}>{rightInput}</span>
//           <span style={{color: "red"}}>{wrongInput}</span>
//         </div>
//       </header>
//     </div>
//   );
// };

export default App;
