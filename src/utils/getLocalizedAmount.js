import { localizedPricing } from "./localizedPricing";

const countryToCurrency = {
  US: 'USD',
  GB: 'GBP',
  CA: 'CAD',
  AU: 'AUD',
  JP: 'JPY',
  CH: 'CHF',
  SE: 'SEK',
  NO: 'NOK',
  NZ: 'NZD',
  SG: 'SGD',
  PK: 'PKR',
  NL: 'EUR',
  DE: 'EUR',
  FR: 'EUR',
  ES: 'EUR',
  IT: 'EUR',
  BE: 'EUR',
};

export const getLocalizedAmount = async (credits) => {
  try {
    const res = await fetch('https://ipwho.is/');
    const data = await res.json();

    let currency = 'EUR';
    if (data.success && data.country_code) {
      currency = countryToCurrency[data.country_code] || 'EUR';
    }

    const pricing = localizedPricing[currency] || localizedPricing['EUR'];
    return pricing[credits] ?? localizedPricing['EUR'][credits];
  } catch (err) {
    console.error('Failed to get localized amount:', err);
    return localizedPricing['EUR'][credits];
  }
};
