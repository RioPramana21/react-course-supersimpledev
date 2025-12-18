// This file contains utility functions related to money formatting
export function formatMoney(amountCents) {
  return `$${(amountCents / 100).toFixed(2)}`
}