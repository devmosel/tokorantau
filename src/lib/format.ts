/** Formats an amount like the mockups do: "€3.99", "€9". */
export function formatPrice(amount: number): string {
  const value = Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
  return `€${value}`;
}

export function formatNumber(amount: number): string {
  return Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
}
