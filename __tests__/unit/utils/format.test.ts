import {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatDiscount,
} from '../../../app/lib/utils/format';

describe('Format Utils', () => {
  describe('formatCurrency', () => {
    it('should format BRL currency correctly', () => {
      expect(formatCurrency(1000)).toBe('R$ 1.000,00');
      expect(formatCurrency(1500.5)).toBe('R$ 1.500,50');
      expect(formatCurrency(0)).toBe('R$ 0,00');
    });

    it('should format USD currency correctly', () => {
      expect(formatCurrency(1000, 'USD')).toBe('US$ 1.000,00');
    });

    it('should handle decimal values', () => {
      expect(formatCurrency(2999.99)).toBe('R$ 2.999,99');
    });
  });

  describe('formatNumber', () => {
    it('should format numbers with thousand separators', () => {
      expect(formatNumber(1000)).toBe('1.000');
      expect(formatNumber(1000000)).toBe('1.000.000');
      expect(formatNumber(0)).toBe('0');
    });

    it('should handle decimal numbers', () => {
      expect(formatNumber(1234.56)).toBe('1.234,56');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentage with one decimal place', () => {
      expect(formatPercentage(45.67)).toBe('45.7%');
      expect(formatPercentage(80)).toBe('80.0%');
      expect(formatPercentage(0)).toBe('0.0%');
    });
  });

  describe('formatDiscount', () => {
    it('should format discount without decimal places', () => {
      expect(formatDiscount(45.67)).toBe('46%');
      expect(formatDiscount(80)).toBe('80%');
      expect(formatDiscount(0)).toBe('0%');
    });
  });
});
