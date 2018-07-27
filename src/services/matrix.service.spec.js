import { isMovePossible } from './matrix.service';
import Point from '../models/point';

describe('Matrix service', () => {
  const startMatrix = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 1, 1, 2, 1, 3, 1, 4, 1],
    [5, 1, 6, 1, 7, 1, 8, 1, 9],
  ];
  describe('When calculating move', () => {
    describe('and given invalid input', () => {
      describe('and given non-array as matrix', () => {
        it('Should throw an exception', () => {
          expect(() => isMovePossible(0, new Point(0, 0), new Point(1, 1))).toThrow('Matrix');
        });
      });
      describe('and given empty matrix', () => {
        it('Should throw an exception', () => {
          expect(() => isMovePossible([[]], new Point(0, 0), new Point(0, 0))).toThrow('Matrix');
        });
      });
      describe('and given invalid first point', () => {
        it('Should throw an exception', () => {
          expect(() => isMovePossible([[1]], 'a', new Point(0, 0))).toThrow('First point');
        });
      });
      describe('and given invalid second point', () => {
        it('Should throw an exception', () => {
          expect(() => isMovePossible([[1]], new Point(0, 0), 'a')).toThrow('Second point');
        });
      });
      describe('and given first point outside of matrix boundaries', () => {
        it('Should throw an exception for less than 1', () => {
          expect(() => isMovePossible(startMatrix, new Point(-1, 0), new Point(0, 0))).toThrow('First point');
        });
        it('Should throw an exception for more than matrix length', () => {
          expect(() => isMovePossible(startMatrix, new Point(3, 0), new Point(0, 0))).toThrow('First point');
        });
      });
      describe('and given second point outside of matrix boundaries', () => {
        it('Should throw an exception for less than 1', () => {
          expect(() => isMovePossible(startMatrix, new Point(0, 0), new Point(-1, 0))).toThrow('Second point');
        });
        it('Should throw an exception for more than matrix width', () => {
          expect(() => isMovePossible(startMatrix, new Point(0, 0), new Point(0, 9))).toThrow('Second point');
        });
      });
    });

    describe('and given valid input', () => {
      describe('and move is possible', () => {
        it('Should return true for vertical move', () => {
          const result = isMovePossible(startMatrix, new Point(0, 0), new Point(1, 0));
          expect(result).toEqual(true);
        });
        it('Should return true for vertical move over zero', () => {
          const matrix = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 1, 1, 2, 1, 3, 1, 4, undefined],
            [5, 1, 6, 1, 7, 1, 8, 1, 9],
          ];
          const result = isMovePossible(matrix, new Point(0, 8), new Point(2, 8));
          expect(result).toEqual(true);
        });
        it('Should return true for horizontal move', () => {
          const result = isMovePossible(startMatrix, new Point(1, 1), new Point(1, 2));
          expect(result).toEqual(true);
        });
        it('Should return true for horizontal move over zero', () => {
          const matrix = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, undefined, undefined, undefined, 1, 3, 1, 4, 1],
            [5, 1, 6, 1, 7, 1, 8, 1, 9],
          ];
          const result = isMovePossible(matrix, new Point(1, 0), new Point(1, 4));
          expect(result).toEqual(true);
        });
        it('Should return new matrix with applied next line move', () => {
          const result = isMovePossible(startMatrix, new Point(0, 8), new Point(1, 0));
          expect(result).toEqual(true);
        });
        it('Should return new matrix with applied next line move over zero', () => {
          const matrix = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [undefined, 1, 1, 2, 1, 3, 1, 4, 1],
            [5, 1, 6, 1, 7, 1, 8, 1, 9],
          ];
          const result = isMovePossible(startMatrix, new Point(0, 8), new Point(1, 0));
          expect(result).toEqual(true);
        });
      });

      describe('and move is not possible', () => {
        it('should return false when numbers dont match and sum is not 10', () => {
          const result = isMovePossible(startMatrix, new Point(0, 7), new Point(1, 7));
          expect(result).toEqual(false);
        });
        it('should return false for horizontal move over non-zero', () => {
          const result = isMovePossible(startMatrix, new Point(0, 0), new Point(0, 2));
          expect(result).toEqual(false);
        });
        it('should return false for vertical move over non-zero', () => {
          const result = isMovePossible(startMatrix, new Point(0, 8), new Point(2, 8));
          expect(result).toEqual(false);
        });
        it('should return false for next line move over non-zero', () => {
          const result = isMovePossible(startMatrix, new Point(0, 8), new Point(1, 1));
          expect(result).toEqual(false);
        });
      });
    });
  })
});
