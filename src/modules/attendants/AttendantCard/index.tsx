import React, {useState, useEffect} from 'react';
import {RectButtonProps} from 'react-native-gesture-handler';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

import Intl from 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {AttendantDTO} from '../../../dtos/AttendantDTO';
import api from '../../../shared/services/api';
import {useAuth} from '../../../shared/hooks/globalContext';

import {
  Container,
  Header,
  Title,
  Photo,
  Content,
  PricePerMinute,
  ButtonWrapper,
  Button,
  IconService,
  ChatIconService,
  PricePerMinuteText,
  Availability,
  AvailabilityWrapper,
  AvailabilityText,
  PerfilText,
} from './styles';

interface Props extends RectButtonProps {
  attendant: {
    index: number;
    item: AttendantDTO;
  };
}

interface CadastroProps {
  Codigo: string;
  Descricao: string;
  Experiencia: string;
  Foto: string;
  Frase: string;
  HorarioAtendimento: string;
  Link: string;
  Nome: string;
  Nota: number;
  Oraculos: string;
  Status: string;
}

interface ClientCommentsProps {
  Atendente: {
    Codigo: number;
    Foto: string;
    Link: string;
    Nome: string;
  };
  Cliente: {
    Codigo: number;
    Nome: string;
  };
  Depoimento: {
    Codigo: number;
    DataCadastro: Date;
    Nota: number;
    Texto: string;
  };
}

type NavProps = NavigationProp<ParamListBase>;

export function AttendantCard({attendant}: Props) {
  IconService.loadFont();
  ChatIconService.loadFont();

  const {item} = attendant;
  const navigation = useNavigation<NavProps>();

  const {selectedMode} = useAuth();
  const [loading, setLoading] = useState(false);
  const [minuteValue, setMinuteValue] = useState(0);
  const [cadastro, setCadastro] = useState<CadastroProps>({} as CadastroProps);
  const [clientComments, setClientComments] = useState<ClientCommentsProps[]>(
    [],
  );

  let attendantDescription = {};
  let valorPorMinuto;

  useEffect(() => {
    valorPorMinuto = new Intl.NumberFormat('de-DEpt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(item.ValorPorMinuto);
  }, [item.ValorPorMinuto]);

  function handleAttendantDetails(mode: string) {
    setLoading(true);

    async function fetchAttendantDetail() {
      const {APIKEY} = process.env;
      try {
        api.defaults.headers.APIKEY = APIKEY;

        await api.get(`atendentes/${item.Cadastro.Codigo}/`).then(res => {
          const {Cadastro} = res.data;
          setCadastro(Cadastro);
          attendantDescription = Cadastro;
        });

        const {Codigo} = item.Cadastro;

        await api
          .get('depoimentos/', {
            params: {
              CodigoAtendente: Codigo,
            },
          })
          .then((response: any) => {
            const {Dados} = response.data;
            setLoading(false);
            setClientComments(Dados);
            navigation.navigate('DetailsOfAnAttendant', {
              screen: 'AttendantDetails',
              params: {
                item,
                clientComments: response.data,
                attendantCard: attendantDescription,
                mode,
              },
            });
          });
      } catch (error) {
        console.log('Error:', error);
      } finally {
      }
    }
    fetchAttendantDetail();
  }

  function handleSelection(mode: string) {
    selectedMode(mode);
    handleAttendantDetails(mode);
  }

  return (
    <Container onPress={() => handleAttendantDetails('')}>
      <Header>
        <Title>{item.Cadastro.Nome}</Title>
      </Header>

      <Content>
        {item.Cadastro.Foto ? (
          <Photo source={{uri: item.Cadastro.Foto}} />
        ) : (
          <Photo
            source={{
              uri: `https://ui-avatars.com/api/?name=${item.Cadastro.Nome}&length=1`,
            }}
          />
        )}
        <PricePerMinute>
          <PricePerMinuteText>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(item.ValorPorMinuto)}
            /min
          </PricePerMinuteText>
        </PricePerMinute>
        <ButtonWrapper>
          {item.FormasAtt.Telefone === 'DISPONIVEL' && (
            <Button onPress={() => handleSelection('call')}>
              <IconService name="call" />
            </Button>
          )}
          {item.FormasAtt.Chat !== 'NAOATENDENTE' && (
            <Button onPress={() => handleSelection('chat')}>
              <ChatIconService name="chat" />
            </Button>
          )}
          {item.FormasAtt.Video === 'DISPONIVEL' && (
            <Button onPress={() => handleSelection('videocam')}>
              <IconService name="videocam" />
            </Button>
          )}
          {item.FormasAtt.Email !== 'NAOATENDENTE' && (
            <Button onPress={() => handleSelection('mail')}>
              <IconService name="mail" />
            </Button>
          )}
        </ButtonWrapper>
        <Availability>
          <AvailabilityWrapper>
            <AvailabilityText
              type={item.Cadastro.Status}
              title={item.Cadastro.Status}>
              {item.Cadastro.Status}
            </AvailabilityText>
          </AvailabilityWrapper>
          <AvailabilityWrapper>
            <PerfilText>Ver Perfil</PerfilText>
          </AvailabilityWrapper>
        </Availability>
      </Content>
    </Container>
  );
}
