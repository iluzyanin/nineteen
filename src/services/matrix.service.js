import Point from '../models/point';

const validateInput = (matrix, firstPoint, secondPoint) => {
  if (!Array.isArray(matrix)) {
    throw new Error('Matrix is not an array');
  }
  if (matrix.length === 0 || matrix[0].length === 0) {
    throw new Error('Matrix is empty');
  }
  if (!(firstPoint instanceof Point)) {
    throw new Error('First point is not instance of Point');
  }
  if (!(secondPoint instanceof Point)) {
    throw new Error('Second point is not instance of Point');
  }
  if (!firstPoint.isWithinMatrix(matrix)) {
    throw new Error('First point is outside of matrix');
  }
  if (!secondPoint.isWithinMatrix(matrix)) {
    throw new Error('Second point is outside of matrix');
  }
  if (firstPoint.equals(secondPoint)) {
    throw new Error('Point cannot be applied to itself');
  }
}

export const isMovePossible = (matrix, firstPoint, secondPoint) => {
  validateInput(matrix, firstPoint, secondPoint);

  const firstValue = matrix[firstPoint.x][firstPoint.y];
  const secondValue = matrix[secondPoint.x][secondPoint.y];
  if (firstValue !== secondValue &&
    firstValue + secondValue !== 10) {
      return false;
    }

  if (firstPoint.x === secondPoint.x) {
    const minY = Math.min(firstPoint.y, secondPoint.y);
    const maxY = Math.max(firstPoint.y, secondPoint.y);
    const x = firstPoint.x;
    let isMovePossible = true;
    for (let y = minY + 1; y < maxY; y++) {
      if (typeof matrix[x][y] !== 'undefined') {
        isMovePossible = false;
        break;
      }
    }
    if (isMovePossible) {
      return true;
    }
  }
  if (firstPoint.y === secondPoint.y) {
    const minX = Math.min(firstPoint.x, secondPoint.x);
    const maxX = Math.max(firstPoint.x, secondPoint.x);
    const y = firstPoint.y;
    let isMovePossible = true;
    for (let x = minX + 1; x < maxX; x++) {
      if (typeof matrix[x][y] !== 'undefined') {
        isMovePossible = false;
        break;
      }
    }
    if (isMovePossible) {
      return true;
    }
  }
  const flatMatrix = flattenMatrix(matrix);
  const firstFlatIndex = firstPoint.x * matrix[0].length + firstPoint.y;
  const secondFlatIndex = secondPoint.x * matrix[0].length + secondPoint.y;
  const min = Math.min(firstFlatIndex, secondFlatIndex);
  const max = Math.max(firstFlatIndex, secondFlatIndex);
  let isMovePossible = true;
  for (let i = min + 1; i < max; i++) {
    if (typeof flatMatrix[i] !== 'undefined') {
      isMovePossible = false;
      break;
    }
  }
  return isMovePossible;
}

export const flattenMatrix = (matrix) => {
  return matrix.reduce((result, row) => result.concat(row), []);
};

export const createStartMatrix = () => {
  return [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 1, 1, 2, 1, 3, 1, 4, 1],
    [5, 1, 6, 1, 7, 1, 8, 1, 9],
  ];
};

export default {
  isMovePossible,
  createStartMatrix,
  flattenMatrix
};
