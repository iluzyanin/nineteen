import { isMovePossible } from './matrix.service';
import Point from '../models/point';

describe('Matrix service', () => {
  const startMatrix = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 1, 1, 2, 1, 3, 1, 4, 1],
    [5, 1, 6, 1, 7, 1, 8, 1, 9],
  ];
  describe('When calculating move', () => {
    describe('and move is possible', () => {
      it('Should return true for vertical move', () => {
        const result = isMovePossible(startMatrix, new Point(0, 0), new Point(1, 0));
        expect(result).toBe(true);
      });
      it('Should return true for vertical move over zero', () => {
        const matrix = [
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          [1, 1, 1, 2, 1, 3, 1, 4, undefined],
          [5, 1, 6, 1, 7, 1, 8, 1, 9],
        ];
        const result = isMovePossible(matrix, new Point(0, 8), new Point(2, 8));
        expect(result).toBe(true);
      });
      it('Should return true for horizontal move', () => {
        const result = isMovePossible(startMatrix, new Point(1, 1), new Point(1, 2));
        expect(result).toBe(true);
      });
      it('Should return true for horizontal move over zero', () => {
        const matrix = [
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          [1, undefined, undefined, undefined, 1, 3, 1, 4, 1],
          [5, 1, 6, 1, 7, 1, 8, 1, 9],
        ];
        const result = isMovePossible(matrix, new Point(1, 0), new Point(1, 4));
        expect(result).toBe(true);
      });
      it('Should return new matrix with applied next line move', () => {
        const result = isMovePossible(startMatrix, new Point(0, 8), new Point(1, 0));
        expect(result).toBe(true);
      });
      it('Should return new matrix with applied next line move over zero', () => {
        const matrix = [
          [1, 2, 3, 4, 5, 6, 7, 8, 9],
          [undefined, 1, 1, 2, 1, 3, 1, 4, 1],
          [5, 1, 6, 1, 7, 1, 8, 1, 9],
        ];
        const result = isMovePossible(startMatrix, new Point(0, 8), new Point(1, 0));
        expect(result).toBe(true);
      });
    });

    describe('and move is not possible', () => {
      it('should return false when numbers dont match and sum is not 10', () => {
        const result = isMovePossible(startMatrix, new Point(0, 7), new Point(1, 7));
        expect(result).toBe(false);
      });
      it('should return false for horizontal move over non-zero', () => {
        const result = isMovePossible(startMatrix, new Point(0, 0), new Point(0, 2));
        expect(result).toBe(false);
      });
      it('should return false for vertical move over non-zero', () => {
        const result = isMovePossible(startMatrix, new Point(0, 8), new Point(2, 8));
        expect(result).toBe(false);
      });
      it('should return false for next line move over non-zero', () => {
        const result = isMovePossible(startMatrix, new Point(0, 8), new Point(1, 1));
        expect(result).toBe(false);
      });
    });
  });
});
