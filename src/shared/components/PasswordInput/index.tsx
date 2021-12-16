import React, {useState} from 'react';
import {TextInputProps} from 'react-native';
import {useTheme} from 'styled-components';
import Feather from 'react-native-vector-icons/Feather';
import {BorderlessButton} from 'react-native-gesture-handler';

import {Container, IconContainer, InputText} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export function PasswordInput({iconName, value, ...rest}: Props) {
  Feather.loadFont();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
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

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(prevState => !prevState);
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
        secureTextEntry={isPasswordVisible}
        {...rest}
      />
      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={22}
            color={
              isFocused || isFilled ? theme.colors.primary : theme.colors.text
            }
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}
