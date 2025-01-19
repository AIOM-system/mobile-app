export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};