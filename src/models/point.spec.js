import Point from './point';

describe('Point', () => {
  describe('when giving no second point', () => {
    it('should return false for undefined', () => {
      expect(new Point(1, 2).equals(undefined)).toBe(false);
    });
    it('should return false for null', () => {
      expect(new Point(1, 2).equals(null)).toBe(false);
    });
    it('should return false for missing value', () => {
      expect(new Point(1, 2).equals()).toBe(false);
    });
  });
  describe('when giving non-Point', () => {
    it('should return false', () => {
      expect(new Point(1, 2).equals('test')).toBe(false);
    });
  });
  describe('when only one parameter matches', () => {
    it('should return false when only x matches', () => {
      expect(new Point(1, 2).equals(new Point(1, 1))).toBe(false);
    });
    it('should return false when only y matches', () => {
      expect(new Point(1, 2).equals(new Point(2, 1))).toBe(false);
    });
  });
  describe('when giving same exact point', () => {
    it('should return true', () => {
      const point = new Point(1, 2);
      expect(point.equals(point)).toBe(true);
    });
  });
  describe('when giving point with both matching parameters', () => {
    it('should return true', () => {
      expect(new Point(1, 2).equals(new Point(1, 2))).toBe(true);
    });
  });
});