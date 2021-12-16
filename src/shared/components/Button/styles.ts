import styled from 'styled-components/native';
import {Platform} from 'react-native';

import {RectButton} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../../global/theme';

interface ButtonProps {
  color?: string;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  height: 60px;

  justify-content: center;
  align-items: center;

  background-color: ${theme.colors.secondary};
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.medium};
  font-size: ${Platform.OS === 'ios' ? RFValue(18) : RFValue(16)}px;

  color: ${theme.colors.shape};
`;
