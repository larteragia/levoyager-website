import {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatDiscount,
} from '../../../app/lib/utils/format';

describe('Format Utils', () => {
  describe('formatCurrency', () => {
    it('should format BRL currency correctly', () => {
      // Note: Intl.NumberFormat uses non-breaking space (U+00A0) between currency symbol and value
      expect(formatCurrency(1000)).toBe('R$\u00A01.000,00');
      expect(formatCurrency(1500.5)).toBe('R$\u00A01.500,50');
      expect(formatCurrency(0)).toBe('R$\u00A00,00');
    });

    it('should format USD currency correctly', () => {
      expect(formatCurrency(1000, 'USD')).toBe('US$\u00A01.000,00');
    });

    it('should handle decimal values', () => {
      expect(formatCurrency(2999.99)).toBe('R$\u00A02.999,99');
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
