import { baseUrl } from '@/const';

export const clearCart = async () => {
  try {
    await fetch(`${baseUrl}/cart/user`, {
      method: 'DELETE',
      credentials: 'include',
    });
  } catch (err) {
    console.error('Failed to clear cart');
  }
};
