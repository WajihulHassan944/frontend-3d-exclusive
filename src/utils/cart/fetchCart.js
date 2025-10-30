import { baseUrl } from '@/const';

export const fetchCart = async (setCredits, setLoading, currency) => {
  try {
    setLoading(true);

    const curr = currency && currency.code && currency.symbol
      ? currency
      : { code: 'EUR', symbol: '€' };

    // 1️⃣ Fetch user's cart
    const res = await fetch(`${baseUrl}/cart/user`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await res.json();

    if (!res.ok || !data.success || !data.cart?.credits) {
      setCredits([]);
      setLoading(false);
      return;
    }

    // 2️⃣ Fetch current product prices by currency
    const productRes = await fetch(`${baseUrl}/products/by-currency?currency=${curr.code}`);
    const productData = await productRes.json();

    const productPriceMap = {};
    if (productData.success && Array.isArray(productData.products)) {
      for (const p of productData.products) {
        const price =
          p.localizedPricing?.[0]?.price || p.priceEUR || 0;
        productPriceMap[p.credits] = Math.round(price);
      }
    }

    // 3️⃣ Map cart items with updated dynamic prices
    const convertedCredits = data.cart.credits.map((item) => {
      const amount = productPriceMap[item.credits] ?? item.amount;

      return {
        ...item,
        amount,
        currency: curr.code,
        symbol: curr.symbol,
      };
    });

    setCredits(convertedCredits);
  } catch (err) {
    console.error('❌ Error fetching cart:', err);
    setCredits([]);
  } finally {
    setLoading(false);
  }
};
