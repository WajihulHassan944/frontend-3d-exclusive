const localizedPricing = {
  USD: { 10: 10, 50: 45, 100: 80 },
  GBP: { 10: 8, 50: 35, 100: 60 },
  CAD: { 10: 15, 50: 60, 100: 100 },
  AUD: { 10: 15, 50: 60, 100: 110 },
  JPY: { 10: 1440, 50: 6240, 100: 11040 },
  CHF: { 10: 9, 50: 35, 100: 70 },
  SEK: { 10: 100, 50: 450, 100: 790 },
  NOK: { 10: 100, 50: 440, 100: 780 },
  NZD: { 10: 15, 50: 70, 100: 120 },
  SGD: { 10: 15, 50: 60, 100: 100 },
  EUR: { 10: 9, 50: 39, 100: 69 },
  PKR: { 10: 2500, 50: 9500, 100: 17000 },
};

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
