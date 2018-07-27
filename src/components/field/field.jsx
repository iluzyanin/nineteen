import React from 'react';
import Cell from '../cell/cell';
import './field.css';

const Field = (props) => {
  const isActiveCell = (rowIndex, colIndex) => {
    const firstPoint = props.firstPoint;
    const secondPoint = props.secondPoint;
    return (firstPoint && firstPoint.x === rowIndex && firstPoint.y === colIndex) ||
      (secondPoint && secondPoint.x === rowIndex && secondPoint.y === colIndex);
  }

  const isDisabledCell = (rowIndex, colIndex) => {
    return (typeof props.matrix[rowIndex][colIndex] === 'undefined');
  }

  return (
    <div>
      <div className="Field">
        {props.matrix.map((row, rowIndex) => (
          <div className="Row" key={rowIndex}>
            {row.map((col, colIndex) => (
              <Cell
                key={`${rowIndex}:${colIndex}`}
                isActive={isActiveCell(rowIndex, colIndex)}
                isDisabled={isDisabledCell(rowIndex, colIndex)}
                onClick={() => props.setPoint(rowIndex, colIndex)}
                value={col}>
              </Cell>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Field;
