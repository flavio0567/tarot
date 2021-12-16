import React, { useState } from 'react';
import { useAuth } from '../../../shared/hooks/auth';

import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country } from '../../../_types/types';

import {
  Container
} from './styles';
 
export function CountryPickerModal() {
  const [countryCode, setCountryCode] = useState<CountryCode>('BR');
  const { selectedCountry } = useAuth();

  const onSelect = (country: Country) => {
    const { cca2, callingCode } = country;
    selectedCountry(callingCode[0]);
    setCountryCode(cca2)
  }

  return (
    <Container>
        <CountryPicker
            countryCode={countryCode}
            withFilter
            withFlag
            withCountryNameButton
            withAlphaFilter={false}
            withCurrencyButton={false}
            withCallingCode
            withEmoji
            onSelect={country => onSelect(country)}
          visible
      />
    </Container>
  )
}