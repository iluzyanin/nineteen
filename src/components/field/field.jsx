import React from 'react';
import classNames from 'classnames';
import matrixService from '../../services/matrix.service';
import './field.css';
import Point from '../../models/point';

class Field extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      matrix: matrixService.createStartMatrix(),
      firstPoint: null,
      secondPoint: null
    };

    this.setPoint = this.setPoint.bind(this);
    this.isActiveCell = this.isActiveCell.bind(this);
    this.refill = this.refill.bind(this);
  }

  setPoint(rowIndex, colIndex) {
    this.setState((prevState) => {
      const newPoint = new Point(rowIndex, colIndex);
      if (prevState.firstPoint !== null &&
        prevState.firstPoint.equals(newPoint)) {
        return {
          ...prevState,
          firstPoint: null
        };
      }
      if (prevState.secondPoint !== null &&
        prevState.secondPoint.equals(newPoint)) {
        return {
          ...prevState,
          secondPoint: null
        };
      }
      let firstPoint = prevState.firstPoint;
      let secondPoint = prevState.secondPoint;
      let matrix = prevState.matrix;
      if (firstPoint === null) {
        firstPoint = new Point(rowIndex, colIndex)
      } else if (secondPoint === null) {
        secondPoint = new Point(rowIndex, colIndex);
      }

      if (firstPoint !== null && secondPoint !== null) {
        if (matrixService.isMovePossible(prevState.matrix, firstPoint, secondPoint)) {
          matrix = [...matrix];
          matrix[firstPoint.x][firstPoint.y] = undefined;
          matrix[secondPoint.x][secondPoint.y] = undefined;
          firstPoint = null;
          secondPoint = null;

          matrix = matrix.filter(row => !row.every(v => typeof v === 'undefined'));
        }
      }

      return {
        ...prevState,
        firstPoint,
        secondPoint,
        matrix
      }
    });
  }

  isActiveCell(rowIndex, colIndex) {
    const firstPoint = this.state.firstPoint;
    const secondPoint = this.state.secondPoint;
    return firstPoint !== null && firstPoint.x === rowIndex && firstPoint.y === colIndex ||
      secondPoint !== null && secondPoint.x === rowIndex && secondPoint.y === colIndex;
  }

  refill() {
    this.setState((prevState) => {
      let flatMatrix = matrixService
        .flattenMatrix(prevState.matrix);
      if (typeof flatMatrix[flatMatrix.length - 1] === 'undefined') {
        let last = flatMatrix.pop();
        while (typeof last === 'undefined') {
          last = flatMatrix.pop();
        }
        flatMatrix.push(last);
      }
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
      <div className="Field">
        <button onClick={this.refill}>Refill</button>
        {this.state.matrix.map((row, rowIndex) => (
          <div className="Row" key={rowIndex}>
            {row.map((col, colIndex) => (
              <div
                className={classNames('Cell', { 'Cell--active': this.isActiveCell(rowIndex, colIndex) })}
                key={`${rowIndex}:${colIndex}`}
                onClick={() => this.setPoint(rowIndex, colIndex)}>
                {col}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Field;