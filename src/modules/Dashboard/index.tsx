/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

import {useAuth} from '../../shared/hooks/globalContext';
import api from '../../shared/services/api';

import {LoadAnimation} from '../../shared/components/LoadAnimation';
import {AttendantCard} from '../attendants/AttendantCard';
import {AttendantDTO} from '../../dtos/AttendantDTO';

// import {Search} from '../@components/Search';

import {
  Container,
  Header,
  // SearchAttendant,
  UserWrapper,
  UserInfo,
  UserAvatar,
  UserPanelText,
  Button,
  Photo,
  User,
  UserGreeting,
  UserName,
  SideWrapper,
  BalanceView,
  BalanceText,
  Icon,
  // SearchView,
  AttendantList,
} from './styles';

type NavProps = NavigationProp<ParamListBase>;

export function Dashboard() {
  const [attendants, setAttendants] = useState<AttendantDTO[]>([]);
  const [pagination, setPagination] = useState([]);
  const [page, setPage] = useState(0);
  const [pricePerMinute, setPricePerMinute] = useState(0);
  const [loading, setLoading] = useState(true);
  const {user, signOut} = useAuth();
  const navigation = useNavigation<NavProps>();

  const [selectedLanguage, setSelectedLanguage] = useState(
    'Pesquise seu Consultor por Especialidade',
  );
  const pickerRef = useRef();

  function Open() {
    pickerRef.current!.focus();
  }

  function Close() {
    pickerRef.current!.blur();
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchAttendants() {
      const [token] = await AsyncStorage.multiGet([
        '@TarotOnline:user',
        '@TarotOnline:token',
      ]);

      if (user && token) {
        try {
          await api
            .get('atendentes/', {params: {PaginaAtual: 1, QtdPaginas: 200}})
            .then(res => {
              if (isMounted) {
                const {Dados, Paginacao} = res.data;

                setPagination(Paginacao);

                api.get('outros/valor-por-minutos/').then(response => {
                  const {Chat} = response.data;
                  setPricePerMinute(Chat);
                  const returnedAttendant = Dados.map(({...rest}) => {
                    return {
                      ValorPorMinuto: Chat,
                      ...rest,
                    };
                  });
                  setAttendants(returnedAttendant);
                });
              }
            });
        } catch (error) {
          console.log('Error:', error);
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      }
    }
    fetchAttendants();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSignOut = useCallback(() => {
    Alert.alert(
      'Sair do App',
      'Você está saindo do app de forma segura, confirma?',
      [
        {
          text: 'Sim',
          onPress: () => signOut(),
        },
        {
          text: 'Não',
        },
      ],
      {cancelable: false},
    );
  }, [signOut]);

  // const handlSearchAttendant = useCallback(_item => {
  //   console.log('handleSearchAttendant:', _item);
  // }, []);

  const handleOtherOptions = () => {
    navigation.navigate('DetailsOfAnAttendant', {
      screen: 'OtherOptions',
      params: {Link: 'https://www.tarotonline.com.br/Cliente/index.php', user},
    });
  };

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            {user.avatar ? (
              <UserAvatar>
                <Photo source={{uri: user.avatar}} />
                <Button onPress={handleOtherOptions}>
                  <UserPanelText>Meu Painel</UserPanelText>
                </Button>
              </UserAvatar>
            ) : (
              <UserAvatar>
                <Photo
                  source={{
                    uri: `https://ui-avatars.com/api/?name=${user.name}`,
                  }}
                />
                <Button onPress={handleOtherOptions}>
                  <UserPanelText>Meu Painel</UserPanelText>
                </Button>
              </UserAvatar>
            )}
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>{user.name}</UserName>
            </User>
          </UserInfo>
          <SideWrapper>
            <Button onPress={handleSignOut}>
              <Icon size={16} style={{color: '#E83F5B', top: 4}} />
            </Button>
            <BalanceView>
              <BalanceText>Meu Saldo</BalanceText>
              <BalanceText>R$ {user.qtdcreditos.toFixed(2)}</BalanceText>
            </BalanceView>
          </SideWrapper>
        </UserWrapper>
      </Header>
      {/* <UserGreeting>Selecione seu Consultor pela Especialidade</UserGreeting> */}
      {/* <SearchAttendant
        // ref={pickerRef}
        numberOfLines={1}
        mode="dropdown"
        selectedValue={selectedLanguage}
        onValueChange={(_itemValue, itemIndex) =>
          handlSearchAttendant(_itemValue)
        }>
        {attendants.map((v, i) => {
          return (
            <SearchAttendant mode="dropdown">
              <SearchAttendant.Item label="21" value="21" >{ v }</SearchAttendant.Item>
            </SearchAttendant>
            )
          })}
      </SearchAttendant> */}
      {/* <SearchView>
        <Search />
      </SearchView> */}
      {loading ? (
        <LoadAnimation />
      ) : (
        <AttendantList
          data={attendants}
          numColumns={1}
          keyExtractor={(att: any, index: number) => String(index)}
          renderItem={(att: {index: number; item: AttendantDTO}) => (
            <AttendantCard attendant={att} />
          )}
        />
      )}
    </Container>
  );
}
