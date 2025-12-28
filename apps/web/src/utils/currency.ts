export function formatCurrency(amount: number) {
  if (amount >= 10_000_000) {
    return `₹ ${(amount / 10_000_000).toFixed(2)} Cr`;
  }
  if (amount >= 100_000) {
    return `₹ ${(amount / 100_000).toFixed(2)} L`;
  }
  return `₹ ${amount.toLocaleString()}`;
}
