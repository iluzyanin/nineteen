import React from 'react';
import './game-over.css';

const GameOver = (props) => (
  <div className="GameOver">
    You did it! Hit <a href="#null" onClick={props.restart}>Restart</a> to play again!
  </div>
)

export default GameOver;