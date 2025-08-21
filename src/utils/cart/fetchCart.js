import { baseUrl } from '@/const';
import { localizedPricing } from '@/utils/localizedPricing';

export const fetchCart = async (setCredits, setLoading, currency) => {
  try {
    setLoading(true);
console.log("currency received from prop", currency);
    // Provide a safe fallback if currency is not provided
    const curr = currency && currency.code && currency.symbol
      ? currency
      : { code: 'EUR', symbol: '€' };

    const res = await fetch(`${baseUrl}/cart/user`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await res.json();

    if (res.ok && data.success && data.cart?.credits) {
      const convertedCredits = data.cart.credits.map((item) => {
        const amount =
          localizedPricing[curr.code]?.[item.credits] ?? item.amount;

        return {
          ...item,
          amount,
          currency: curr.code,
          symbol: curr.symbol,
        };
      });

      setCredits(convertedCredits);
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
