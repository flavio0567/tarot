import React, {useState} from 'react';
import {TextInputProps} from 'react-native';
import {useTheme} from 'styled-components';
import Feather from 'react-native-vector-icons/Feather';

import {Container, IconContainer, InputText} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export function Input({iconName, value, ...rest}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const theme = useTheme();

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={22}
          color={
            isFocused || isFilled ? theme.colors.attention : theme.colors.text
          }
        />
      </IconContainer>
      <InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        autoComplete="off"
        autoCorrect={false}
        {...rest}
      />
    </Container>
  );
}
