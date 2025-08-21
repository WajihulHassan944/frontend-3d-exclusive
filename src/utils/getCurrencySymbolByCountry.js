import { useEffect, useState } from 'react';
import { countryToCurrency } from './countryToCurrency';

export const useCurrencyByUserCountry = () => {
  const [currency, setCurrency] = useState({ code: '', symbol: '' });

  useEffect(() => {
    const fetchCountryAndCurrency = async () => {
      try {
        const res = await fetch('https://ipwho.is/');
        const data = await res.json();

        if (data.success && data.country_code) {
          const matchedCurrency = countryToCurrency[data.country_code];
          setCurrency(matchedCurrency || { code: 'EUR', symbol: '€' });
        } else {
          setCurrency({ code: 'EUR', symbol: '€' }); // fallback
        }
      } catch (err) {
        console.error('Failed to get IP location:', err);
        setCurrency({ code: 'EUR', symbol: '€' }); // fallback
      }
    };

    fetchCountryAndCurrency();
  }, []);

  return currency;
};
