import React from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import theme from '../../../shared/global/theme';

import {
  Container,
  BoxSelection,
  SelectButton,
  ModalTextLabel,
  Title,
  TitleText,
  Separator,
  BackButton,
  Icon,
} from './styles';

type NavProps = NavigationProp<ParamListBase>;

export function Historic() {
  const navigation = useNavigation<NavProps>();

  return (
    <Container>
      <Title>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" />
        </BackButton>
        <TitleText>Histórico de Consultas</TitleText>
      </Title>
      <BoxSelection>
        <SelectButton
          onPress={() =>
            navigation.navigate('DetailsOfAnAttendant', {
              screen: 'OtherOptions',
              params: {
                Link: 'https://www.tarotonline.com.br/Cliente/Atendimentos.php',
              },
            })
          }>
          <Icon
            name="chatbubbles-outline"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{color: theme.colors.shape, marginLeft: -10}}
          />
          <ModalTextLabel>Chat</ModalTextLabel>
        </SelectButton>
        <Separator />
        <SelectButton
          onPress={() =>
            navigation.navigate('DetailsOfAnAttendant', {
              screen: 'OtherOptions',
              params: {
                Link: 'https://www.tarotonline.com.br/Cliente/AtendimentosV.php',
              },
            })
          }>
          <Icon name="videocam-outline" style={{color: theme.colors.shape}} />
          <ModalTextLabel>Vídeo</ModalTextLabel>
        </SelectButton>
        <Separator />
        <SelectButton
          onPress={() =>
            navigation.navigate('DetailsOfAnAttendant', {
              screen: 'OtherOptions',
              params: {
                Link: 'https://www.tarotonline.com.br/Cliente/AtendimentosF.php',
              },
            })
          }>
          <Icon
            name="call-outline"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{color: theme.colors.shape, marginLeft: 16}}
          />
          <ModalTextLabel>Telefone</ModalTextLabel>
        </SelectButton>
        <Separator />
        <SelectButton
          onPress={() =>
            navigation.navigate('DetailsOfAnAttendant', {
              screen: 'OtherOptions',
              params: {
                Link: 'https://www.tarotonline.com.br/Cliente/AtendimentosEmail.php',
              },
            })
          }>
          <Icon name="mail-outline" style={{color: theme.colors.shape}} />
          <ModalTextLabel>E-mail</ModalTextLabel>
        </SelectButton>
      </BoxSelection>
    </Container>
  );
}
