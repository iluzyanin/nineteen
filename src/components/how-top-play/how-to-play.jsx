import React from 'react';
import './how-to-play.css';

const HowToPlay = () => (
  <section className="jumbotron HowToPlay">
    <h2 className="display-4">How to play</h2>
    <hr className="my-4" />
    <div className="lead HowToPlay-rules">
      Click on 2 neighbour cells, where the values are the same or give 10 in sum.
      Cells are considered neighbours when they are:
      <ul>
        <li>positioned next to each other horizontaly or vertically</li>
        <li>positioned on two subsequent rows</li>
      </ul>
      and there are no non-empty cells inbetween.
      Once there are no more moves, click Continue to replenish matrix with
      the remaining values (empty cells are excluded).
      The game ends when there are no calls left. Have fun!</div>
  </section>
);

export default HowToPlay;