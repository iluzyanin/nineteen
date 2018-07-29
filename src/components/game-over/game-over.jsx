import React from 'react';
import './game-over.css';

const GameOver = (props) => {
  const restart = (e) => {
    e.preventDefault();
    props.restart();
  }

  return (
    <div className="GameOver">
      You did it! Hit <a href="/" onClick={restart}>Restart</a> to play again!
    </div>
  );
}

export default GameOver;