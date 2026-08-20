export function calculateCartTotals(items) {
  const subtotal = Math.round(
    items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0),
  );
  const delivery = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;
  return { subtotal, delivery, total: subtotal + delivery };
}
