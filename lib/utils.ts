/**
 * Format a number as Ukrainian hryvnia (UAH)
 * Example: 1500000 -> "1 500 000,00 ₴"
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}
