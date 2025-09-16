import { localizedPricing } from "./localizedPricing";
import { countryToCurrency } from "./countryToCurrency";

export const getLocalizedAmount = async (credits) => {
  try {
    const res = await fetch('https://ipwho.is/');
    const data = await res.json();

    // fallback = EUR
    let currency = 'EUR';
    if (data.success && data.country_code) {
      currency = countryToCurrency[data.country_code]?.code || 'EUR';
    }

    const pricing = localizedPricing[currency] || localizedPricing['EUR'];
    const amount = pricing[credits] ?? localizedPricing['EUR'][credits];

    // ✅ round to nearest integer
    return Math.round(amount);
  } catch (err) {
    console.error('Failed to get localized amount:', err);
    return Math.round(localizedPricing['EUR'][credits]);
  }
};
