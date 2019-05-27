import React, { useState, useEffect } from 'react';
import { Drawer, Switch } from 'native-base';
import { AsyncStorage } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import NetInfo from '@react-native-community/netinfo';

import api from '~/services/api';
import getRealm from '~/services/realm';

import Sidebar from '~/components/Sidebar';
import Header from '~/components/Header';
import Search from '~/components/Search';

import { Container, Content } from '~/components/styles';
import {
  Title,
  Row,
  Data,
  Value,
  ValueBox,
  UpdateButton,
  UpdateText,
  Slide,
} from './styles';

moment.locale('pt-BR');
export default function Settings({ navigation }) {
  const [drawer, setdrawer] = useState(null);
  const [louvores, setlouvores] = useState(0);
  const [autores, setautores] = useState(0);
  const [ritmos, setritmos] = useState(0);
  const [lastUpdate, setlastUpdate] = useState('');
  const [updateText, setupdateText] = useState('Verificar atualização');
  const [updateError, setupdateError] = useState(false);
  const [showDiagrams, setshowDiagrams] = useState(false);
  const [fontSize, setfontSize] = useState(12);

  useEffect(() => {
    async function countLouvores() {
      const realm = await getRealm();
      const louvoresDB = realm.objects('Louvores').length;
      setlouvores(louvoresDB);
    }
    async function countAutores() {
      const realm = await getRealm();
      const autoresDB = realm.objects('Autores').length;
      setautores(autoresDB);
    }
    async function countRitmos() {
      const realm = await getRealm();
      const ritmosDB = realm.objects('Ritmos').length;
      setritmos(ritmosDB);
    }

    async function lastUpdateFn() {
      const lastupdateDB = await AsyncStorage.getItem('last_update');
      setlastUpdate(
        moment(new Date(lastupdateDB)).format('DD/MM/YYYY [às] HH:mm'),
      );
    }

    async function defaults() {
      const font = await AsyncStorage.getItem('font_size');
      setfontSize(parseInt(font, 0));

      const diagrams = await AsyncStorage.getItem('show_diagrams');
      setshowDiagrams(diagrams === 'true');
    }

    NetInfo.fetch().then(async (state) => {
      if (!state.isConnected) {
        setupdateText('Sem conexão com a internet.');
        setupdateError(true);
      }
    });

    lastUpdateFn();
    defaults();
    countAutores();
    countRitmos();
    countLouvores();
  }, []);

  async function handleUpdate() {
    setupdateText('Verificando atualizações...');
    try {
      const realm = await getRealm();
      const { data: temasDB } = await api.get('/mobile/temas');
      const { data: autoresDB } = await api.get('/mobile/autores');
      const { data: ritmosDB } = await api.get('/mobile/ritmos');
      const { data: louvoresDB } = await api.get('/mobile/louvores');

      await realm.write(async () => {
        await Promise.all(
          temasDB.map(t => realm.create('Temas', t, 'modified')),
        );
      });
      await realm.write(async () => {
        await Promise.all(
          autoresDB.map(a => realm.create('Autores', a, 'modified')),
        );
      });
      await realm.write(async () => {
        await Promise.all(
          ritmosDB.map(a => realm.create('Ritmos', a, 'modified')),
        );
      });
      await realm.write(async () => {
        await Promise.all(
          louvoresDB.map(async (a) => {
            await realm.create('Louvores', a, 'modified');
          }),
        );
      });

      const updated = new Date(moment()).toString();
      await AsyncStorage.setItem('last_update', updated);
      setlastUpdate(moment(new Date(updated)).format('DD/MM/YYYY [às] HH:mm'));
      setupdateText('Dados atualizados');
    } catch (error) {
      setupdateError(true);
      setupdateText('Ocorreu um erro tente mais tarde.');
    }
  }

  async function handleChangeDiagram(value) {
    setshowDiagrams(value);
  }

  async function handleChangeFont(value) {
    setfontSize(value);
    try {
      await AsyncStorage.setItem('font_size', `${value}`);
    } catch (error) {
      const font = await AsyncStorage.getItem('font_size');
      setfontSize(parseInt(font, 0));
    }
  }

  function closeDrawer() {
    drawer._root.close();
  }
  function openDrawer() {
    drawer._root.open();
  }
  return (
    <Drawer
      ref={ref => setdrawer(ref)}
      content={<Sidebar navigator={navigation} active="Settings" />}
      onClose={() => closeDrawer()}
    >
      <Search
        openSidebar={openDrawer}
        navigation={navigation}
        returnTo="Settings"
      />
      <Container>
        <Header
          title="Configurações"
          openSidebar={openDrawer}
          navigation={navigation}
        />
        <Content keyboardShouldPersistTaps="handled">
          <Title>Visualização do louvor</Title>
          <Row>
            <Data>Exibir diagramas</Data>
            <ValueBox>
              <Switch
                value={showDiagrams}
                trackColor={{ false: '#EEEEEE', true: '#2E65FD' }}
                onValueChange={handleChangeDiagram}
                thumbColor={showDiagrams ? '#536274' : '#f7f7f7'}
              />
            </ValueBox>
          </Row>
          <Row>
            <Data>Tamanho da fonte</Data>
            <Value>{fontSize}pt</Value>
          </Row>
          <Row isLast noTop>
            <Slide
              minimumValue={8}
              maximumValue={20}
              value={fontSize}
              step={1}
              onSlidingComplete={handleChangeFont}
              onValueChange={setfontSize}
            />
          </Row>

          <Title>Dados</Title>
          <Row>
            <Data>Louvores</Data>
            <Value>{louvores}</Value>
          </Row>
          <Row>
            <Data>Autores</Data>
            <Value>{autores}</Value>
          </Row>
          <Row>
            <Data>Ritmos</Data>
            <Value>{ritmos}</Value>
          </Row>
          <Row isLast>
            <Data>Última atualização</Data>
            <Value>{lastUpdate}</Value>
          </Row>

          <UpdateButton
            onPress={handleUpdate}
            disabled={updateText !== 'Verificar atualização'}
            updateError={updateError}
          >
            <UpdateText updateError={updateError}>{updateText}</UpdateText>
          </UpdateButton>
        </Content>
      </Container>
    </Drawer>
  );
}
