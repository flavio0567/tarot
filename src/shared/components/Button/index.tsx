/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'styled-components';
import {RectButtonProps} from 'react-native-gesture-handler';

import {Container, Title} from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
  onPress: () => void;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  loading = false,
  light = false,
  ...rest
}: Props) {
  const theme = useTheme();

  return (
    <Container
      color={color}
      onPress={onPress}
      enabled={enabled}
      style={{opacity: enabled === false || loading === true ? 0.5 : 1}}>
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  );
}
