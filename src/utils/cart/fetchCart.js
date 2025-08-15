import { baseUrl } from '@/const';

export const fetchCart = async (setCredits, setLoading) => {
  try {
     setLoading(true);
    const res = await fetch(`${baseUrl}/cart/user`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await res.json();
    if (res.ok && data.success && data.cart?.credits) {
      setCredits(data.cart.credits);
    } else {
      setCredits([]);
    }
  } catch (err) {
    console.error(err);
    setCredits([]);
  } finally {
    setLoading(false);
  }
};
