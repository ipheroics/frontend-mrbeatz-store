export type CartItem = { id: string; title: string; price: number; coverUrl?: string };

const KEY = 'cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function setCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addToCart(item: CartItem) {
  const items = getCart();
  if (!items.find(i => i.id === item.id)) {
    items.push(item);
    setCart(items);
  }
  return items;
}

export function removeFromCart(id: string) {
  const items = getCart().filter(i => i.id !== id);
  setCart(items);
  return items;
}

export function clearCart() {
  setCart([]);
}
