/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';

import {SearchView, SearchIcon, SearchInput} from './styles';

export function Search() {
  const [selectedLanguage, setSelectedLanguage] = useState(
    'Pesquise seu Consultor por Especialidade',
  );

  return (
    <SearchView>
      {/* <SearchIcon name="search" />
      <SearchInput
        autoCorrect={false}
        placeholder="Pesquise seu Consultor por Especialidade"
        placeholderTextColor="#555"
        onChangeText={() => console.log('texto digitado')}
        maxLength={100}
        /> */}
      <Picker
        style={{backgroundColor: 'red', color: 'green'}}
        selectedValue={selectedLanguage}
        onValueChange={itemValue => setSelectedLanguage(itemValue)}>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </SearchView>
  );
}
