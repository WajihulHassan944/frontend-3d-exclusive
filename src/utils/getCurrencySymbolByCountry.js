import { useSelector } from 'react-redux';

const countryToCurrency = {
  US: { code: 'USD', symbol: '$' },
  GB: { code: 'GBP', symbol: '£' },
  CA: { code: 'CAD', symbol: 'CA$' },
  AU: { code: 'AUD', symbol: 'A$' },
  JP: { code: 'JPY', symbol: '¥' },
  CH: { code: 'CHF', symbol: 'CHF' },
  SE: { code: 'SEK', symbol: 'kr' },
  NO: { code: 'NOK', symbol: 'kr' },
  NZ: { code: 'NZD', symbol: 'NZ$' },
  SG: { code: 'SGD', symbol: 'S$' },
  PK: { code: 'PKR', symbol: '₨' },
  NL: { code: 'EUR', symbol: '€' },
  DE: { code: 'EUR', symbol: '€' },
  FR: { code: 'EUR', symbol: '€' },
  ES: { code: 'EUR', symbol: '€' },
  IT: { code: 'EUR', symbol: '€' },
  BE: { code: 'EUR', symbol: '€' },
};

const countryNameToCode = {
  'United States': 'US',
  'United Kingdom': 'GB',
  Canada: 'CA',
  Australia: 'AU',
  Japan: 'JP',
  Switzerland: 'CH',
  Sweden: 'SE',
  Norway: 'NO',
  'New Zealand': 'NZ',
  Singapore: 'SG',
  Pakistan: 'PK',
  Netherlands: 'NL',
  Germany: 'DE',
  France: 'FR',
  Spain: 'ES',
  Italy: 'IT',
  Belgium: 'BE',
};

export const useCurrencySymbolByUserCountry = () => {
  const user = useSelector((state) => state.user);
  const country = user?.country;

  if (!country) return '€';

  const code = countryNameToCode[country];
  const currency = code ? countryToCurrency[code] : null;

  return currency?.symbol || '€';
};
