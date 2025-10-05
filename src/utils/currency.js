export const formatCurrency = (amount) => {
  const value = Number.isFinite(amount) ? amount : 0;
  return `Rs. ${value.toFixed(2)}`;
};
