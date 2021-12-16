import React from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import theme from '../../../shared/global/theme';

import {
  Container,
  BoxSelection,
  // SelectionWrapper,
  SelectButton,
  ModalTextLabel,
  Title,
  TitleText,
  Separator,
  BackButton,
  Icon,
} from './styles';

type NavProps = NavigationProp<ParamListBase>;

export function Credits() {
  const navigation = useNavigation<NavProps>();

  return (
    <Container>
      <Title>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" />
        </BackButton>
        <TitleText>Créditos</TitleText>
      </Title>
      <BoxSelection>
        <SelectButton
          onPress={() =>
            navigation.navigate('DetailsOfAnAttendant', {
              screen: 'OtherOptions',
              params: {
                Link: 'https://www.tarotonline.com.br/Cliente/Creditos_Comprar2.php?CodigoPacote=0',
              },
            })
          }>
          <Icon name="cart-outline" style={{color: theme.colors.shape}} />
          <ModalTextLabel>Comprar</ModalTextLabel>
        </SelectButton>
        <Separator />
        <SelectButton
          onPress={() =>
            navigation.navigate('DetailsOfAnAttendant', {
              screen: 'OtherOptions',
              params: {
                Link: 'https://www.tarotonline.com.br/Cliente/Pontos_Relatorio.php',
              },
            })
          }>
          <Icon
            name="document-text-outline"
            style={{color: theme.colors.shape}}
          />
          <ModalTextLabel>Relatório</ModalTextLabel>
        </SelectButton>
      </BoxSelection>
    </Container>
  );
}
