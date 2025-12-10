import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { countryToCurrency } from './countryToCurrency';

export const useCurrencyByUserCountry = () => {
  const [currency, setCurrency] = useState({ code: '', symbol: '' });

  const geoData = useSelector((state) => state.geo.data);

  useEffect(() => {
    if (geoData?.country_code) {
      const matchedCurrency = countryToCurrency[geoData.country_code];
      setCurrency(matchedCurrency || { code: 'EUR', symbol: '€' });
    } else {
      setCurrency({ code: 'EUR', symbol: '€' }); // fallback
    }
  }, [geoData]);

  return currency;
};
