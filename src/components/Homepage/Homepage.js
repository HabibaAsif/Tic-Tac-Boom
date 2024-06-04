import React, { useState } from 'react';
import './Homepage.css';
import O from '../assets/O.png';
import X from '../assets/X.png';
import Tictactoe from '../Tictactoe/Tictactoe.js'; 
import Tictactoeextreme from '../Tictactoeextream/Tictactoeextreame.js'; 

const Homepage = () => {
  const [showTitleScreen, setShowTitleScreen] = useState(true);
  const [showClassicMode, setShowClassicMode] = useState(false);
  const [showNightmareMode, setShowNightmareMode] = useState(false);

  const handleClassicModeClick = () => {
    setShowTitleScreen(false);
    setShowClassicMode(true);
    setShowNightmareMode(false);
  };

  const handleNightmareModeClick = () => {
    setShowTitleScreen(false);
    setShowClassicMode(false);
    setShowNightmareMode(true);
  };

  const handleBackButtonClick = () => {
    setShowTitleScreen(true);
    setShowClassicMode(false);
    setShowNightmareMode(false);
  };

  return (
    <div className="homepage-container">
      {showTitleScreen && (
        <div className="title-screen">
          <h1>Welcome To the Tic Tac Boom</h1>
          <h2>A unique twist on the classical game</h2>
          <button className='button1' onClick={handleClassicModeClick}>Classic Mode</button>
          <button className='button1' onClick={handleNightmareModeClick}>Nightmare Mode</button>
        
          <div className="symbol-container">
            <img src={O} alt="O" className="symbol1" />
            <img src={X} alt="X" className="symbol2" />
            <img src={O} alt="O" className="symbol3" />
            <img src={X} alt="X" className="symbol4" />
            <img src={O} alt="O" className="symbol5" />
            <img src={X} alt="X" className="symbol6" />
            
         
          </div>
        </div>
      )}

      {showClassicMode && <Tictactoe />} 
      {showNightmareMode && <Tictactoeextreme />} 

      {!showTitleScreen && <button className='button2' onClick={handleBackButtonClick}>⬅</button>}
    </div>
  );
};

export default Homepage;
