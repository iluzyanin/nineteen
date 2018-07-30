export const isMovePossible = (matrix, firstPoint, secondPoint) => {
  const firstValue = matrix[firstPoint.x][firstPoint.y];
  const secondValue = matrix[secondPoint.x][secondPoint.y];
  if (firstValue !== secondValue && (firstValue + secondValue !== 10)) {
      return false;
    }

  const firstFlatIndex = firstPoint.x * matrix[0].length + firstPoint.y;
  const secondFlatIndex = secondPoint.x * matrix[0].length + secondPoint.y;
  const { topPoint, bottomPoint } = firstFlatIndex <= secondFlatIndex 
    ? { topPoint: firstPoint, bottomPoint: secondPoint }
    : { topPoint: secondPoint, bottomPoint: firstPoint };

  if (topPoint.x === bottomPoint.x) {
    const x = topPoint.x;
    for (let y = topPoint.y + 1; y < bottomPoint.y; y++) {
      if (typeof matrix[x][y] !== 'undefined') {
        return false;
      }
    }
    return true;
  }
  if (topPoint.y === bottomPoint.y) {
    const y = topPoint.y;
    for (let x = topPoint.x + 1; x < bottomPoint.x; x++) {
      if (typeof matrix[x][y] !== 'undefined') {
        return false
      }
    }
    return true;
  }
  const flatMatrix = flattenMatrix(matrix);
  const min = Math.min(firstFlatIndex, secondFlatIndex);
  const max = Math.max(firstFlatIndex, secondFlatIndex);
  for (let i = min + 1; i < max; i++) {
    if (typeof flatMatrix[i] !== 'undefined') {
      return false
    }
  }
  return true;
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
