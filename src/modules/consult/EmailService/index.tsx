import React, {useState} from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import api from '../../../shared/services/api';
import {Button} from '../../../shared/components/Button';
import {useTheme} from 'styled-components';
import {Input} from '../../../shared/components/Input';
import * as Yup from 'yup';

import {
  Container,
  Icon,
  Separator,
  SeparatorText,
  BackButton,
  PriceLabel,
  Form,
  Content,
  MessageText,
} from './styles';

type NavProps = NavigationProp<ParamListBase>;

export function EmailService({route}: any) {
  const {attendant} = route.params;
  const navigation = useNavigation<NavProps>();

  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const [consultantName, setConsultantName] = useState('');
  const [relatedName, setRelatedName] = useState('');
  const [dob, setDob] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const startNewService = async () => {
    setIsLoading(true);
    console.log(
      'Nome:',
      consultantName,
      'NomeEnvolvido:',
      relatedName,
      'DataNascimento:',
      dob,
      'Assunto:',
      subject,
      'Mensagem:',
      message,
    );
    try {
      const schema = Yup.object().shape({
        consultantName: Yup.string().required('Nome é obrigatório!'),
        dob: Yup.string().required('Data de nascimento é obrigatória!'),
        message: Yup.string().required('Mensagem é obrigatória!'),
      });

      await schema.validate({consultantName, dob, message});
    } catch (error: any) {
      console.log('error: ', error);
      return Alert.alert(
        'Mensagem incompleta: Confira os campos informados e tente novamente.',
      );
    }

    await api
      .post('atendimentos/email/219/', {
        Nome: consultantName,
        NomeEnvolvido: relatedName,
        DataNascimento: dob,
        Assunto: subject,
        Mensagem: message,
      })
      .then(responseEmail => {
        console.log('responseEmail:', responseEmail.headers);
        setIsLoading(false);

        handleServiceOff();
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error no call atendimentos/email/att', error);
        handleServiceOff();
      });
  };

  function handleServiceOff() {
    navigation.navigate('Main');
  }

  return (
    <Container>
      <Separator>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" />
        </BackButton>
        <SeparatorText>Consulta por E-mail</SeparatorText>
      </Separator>

      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior="padding"
          keyboardVerticalOffset={30}
          enabled>
          <Content>
            <PriceLabel>Valor: R$ 49,90</PriceLabel>
            <Form>
              <Input
                onChangeText={setConsultantName}
                value={consultantName}
                placeholder="Nome"
                iconName={'user'}
              />
              <Input
                onChangeText={setRelatedName}
                value={relatedName}
                placeholder="Nome do Envovido"
                iconName={'users'}
              />
              <Input
                onChangeText={setDob}
                value={dob}
                style={{fontSize: 14}}
                placeholder="Data de Nasc. Ex.:14/11/1989"
                iconName={'calendar'}
              />
              <Input
                onChangeText={setSubject}
                value={subject}
                placeholder="Assunto"
                iconName={'book-open'}
              />
              <Input
                onChangeText={setMessage}
                value={message}
                placeholder="Mensagem"
                iconName={'file-text'}
              />
            </Form>
            <Button
              title="Enviar Consulta"
              onPress={() => startNewService()}
              enabled={consultantName ? true : false}
              color={theme.colors.success}
            />
          </Content>
        </KeyboardAvoidingView>
      ) : (
        <KeyboardAvoidingView behavior="position" enabled>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Content>
              <PriceLabel>Valor: R$ 49,90</PriceLabel>
              <Form>
                <Input
                  onChangeText={setConsultantName}
                  value={consultantName}
                  placeholder="Nome"
                  iconName={'user'}
                />
                <Input
                  onChangeText={setRelatedName}
                  value={relatedName}
                  placeholder="Nome do(a) Envovido(a)"
                  iconName={'users'}
                />
                <Input
                  onChangeText={setDob}
                  value={dob}
                  style={{fontSize: 14}}
                  placeholder="Data de Nasc. Ex.:14/11/1989"
                  iconName={'calendar'}
                />
                <Input
                  onChangeText={setSubject}
                  value={subject}
                  placeholder="Assunto"
                  iconName={'book-open'}
                />

                <MessageText
                  onChangeText={setMessage}
                  value={message}
                  placeholder="Mensagem"
                  multiline={true}
                />
              </Form>
              <Button
                title="Enviar Consulta"
                onPress={() => startNewService()}
                enabled={consultantName ? true : false}
                color={theme.colors.success}
              />
            </Content>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </Container>
  );
}
