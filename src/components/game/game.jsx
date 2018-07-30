import React from 'react';
import matrixService from '../../services/matrix.service';
import Point from '../../models/point';
import Field from '../field/field';
import Controls from '../controls/controls';
import GameOver from '../game-over/game-over';
import './game.css';

class Game extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = this.buildInitialState();

    this.setPoint = this.setPoint.bind(this);
    this.refill = this.refill.bind(this);
    this.restart = this.restart.bind(this);
  }

  buildInitialState() {
    return {
      matrix: matrixService.createStartMatrix(),
      firstPoint: null,
      secondPoint: null,
      gameOver: false,
    };
  }

  restart() {
    this.setState(this.buildInitialState());
  }

  setPoint(rowIndex, colIndex) {
    if (!this.state.matrix[rowIndex][colIndex]) {
      return;
    }
    this.setState((prevState) => {
      const newPoint = new Point(rowIndex, colIndex);
      let firstPoint = prevState.firstPoint;
      let secondPoint = prevState.secondPoint;
      if (firstPoint && firstPoint.equals(newPoint)) {
        return {
          ...prevState,
          firstPoint: null
        };
      }
      if (secondPoint && secondPoint.equals(newPoint)) {
        return {
          ...prevState,
          secondPoint: null
        };
      }
      let matrix = prevState.matrix;
      if (!firstPoint) {
        firstPoint = new Point(rowIndex, colIndex)
      } else if (!secondPoint) {
        secondPoint = new Point(rowIndex, colIndex);
      }

      let gameOver = prevState.gameOver;
      if (firstPoint && secondPoint &&
        matrixService.isMovePossible(matrix, firstPoint, secondPoint)) {
        matrix[firstPoint.x][firstPoint.y] = undefined;
        matrix[secondPoint.x][secondPoint.y] = undefined;
        firstPoint = null;
        secondPoint = null;

        matrix = matrix.filter(row => !row.every(v => typeof v === 'undefined'));
        if (matrix.length === 0) {
          gameOver = true;
        }
      }

      return {
        ...prevState,
        firstPoint,
        secondPoint,
        gameOver,
        matrix
      }
    });
  }

  refill() {
    this.setState((prevState) => {
      let flatMatrix = matrixService.flattenMatrix(prevState.matrix);
      let last = flatMatrix.pop();
      while (typeof last === 'undefined') {
        last = flatMatrix.pop();
      }
      flatMatrix.push(last);

      const filteredMatrix = flatMatrix.filter(v => typeof v !== 'undefined');

      const newMatrix = flatMatrix
        .concat(filteredMatrix)
        .reduce((result, current, index) => {
          const row = Math.floor(index / 9);
          if (index % 9 === 0) {
            result.push(new Array(9).fill(undefined));
          }
          result[row][index % 9] = (current);
          return result;
        }, []);

      return { ...prevState, matrix: newMatrix };
    });
  }

  render() {
    return (
      <div className="Game">
        <Controls restart={this.restart} refill={this.refill}></Controls>
        <Field
          matrix={this.state.matrix}
          firstPoint={this.state.firstPoint}
          secondPoint={this.state.secondPoint}
          setPoint={(rowIndex, colIndex) => this.setPoint(rowIndex, colIndex)}
        ></Field>
        {this.state.gameOver &&
          <GameOver restart={() => this.restart()}></GameOver>
        }
      </div>
    );
  }
}

export default Game;
