import styled from 'styled-components/native';
import {TextInput} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

export const SearchView = styled.View`
  flex-direction: row;
  align-items: center;

  width: 94%;
  height: ${RFValue(50)}px;
  margin: ${RFValue(10)}px;
  background-color: ${({theme}) => theme.colors.shape};
  border-radius: ${RFValue(6)}px;
`;

export const SearchIcon = styled(Feather)`
  height: ${RFValue(30)}px;
  padding: ${RFValue(8)}px;
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.text};
`;

export const SearchInput = styled(TextInput)`
  font-size: ${RFValue(12)}px;
  background-color: ${({theme}) => theme.colors.background};
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.title};
`;
