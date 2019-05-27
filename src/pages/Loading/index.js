import React, { useEffect, useState } from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import ErrorModal from '~/components/ErrorModal';

import api from '~/services/api';
import getRealm from '~/services/realm';

import { Container, Logo } from './styles';

export default function Loading({ navigation }) {
  const [showError, setshowError] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const realm = await getRealm();
      const users = await realm.objects('User');
      return users[0];
    }

    async function checkAPIConnection() {
      try {
        await api.get('/collection');
        setTimeout(() => {
          if (!showError) navigation.navigate('Login');
        }, 1000);
      } catch (error) {
        setshowError(true);
      }
    }

    async function getTemas() {
      try {
        const realm = await getRealm();
        const themes = await realm.objects('Temas');
        if (!themes[0]) {
          const { data: temas } = await api.get('/mobile/temas');

          realm.write(() => temas.map(t => realm.create('Temas', t, 'modified')),);
          await AsyncStorage.setItem(
            'last_update',
            new Date(Date.now()).toString(),
          );
        }
      } catch (error) {
        setshowError(true);
      }
    }

    async function getColecoes() {
      try {
        const realm = await getRealm();
        const collections = await realm.objects('Colecoes');
        if (!collections[0]) {
          const { data: colecoes } = await api.get('/mobile/collections');

          realm.write(() => colecoes.map(t => realm.create('Colecoes', t, 'modified')),);
          await AsyncStorage.setItem(
            'last_update',
            new Date(Date.now()).toString(),
          );
        }
      } catch (error) {
        setshowError(true);
      }
    }

    async function getAutores() {
      try {
        const realm = await getRealm();
        const authors = await realm.objects('Autores');
        if (!authors[0]) {
          const { data: autores } = await api.get('/mobile/autores');

          realm.write(() => autores.map(a => realm.create('Autores', a, 'modified')),);
          await AsyncStorage.setItem(
            'last_update',
            new Date(Date.now()).toString(),
          );
        }
      } catch (error) {
        setshowError(true);
      }
    }

    async function getRitmos() {
      try {
        const realm = await getRealm();
        const rithms = await realm.objects('Ritmos');
        if (!rithms[0]) {
          const { data: ritmos } = await api.get('/mobile/ritmos');

          realm.write(() => ritmos.map(a => realm.create('Ritmos', a, 'modified')),);
          await AsyncStorage.setItem(
            'last_update',
            new Date(Date.now()).toString(),
          );
        }
      } catch (error) {
        setshowError(true);
      }
    }

    async function getLouvores() {
      try {
        const realm = await getRealm();
        const louvoresDB = await realm.objects('Louvores');

        if (!louvoresDB[0]) {
          const { data: louvores } = await api.get('/mobile/louvores');

          await realm.write(async () => {
            await Promise.all(
              louvores.map(async (a) => {
                await realm.create('Louvores', a, 'modified');
              }),
            );
          });
          await AsyncStorage.setItem(
            'last_update',
            new Date(Date.now()).toString(),
          );
        }
      } catch (error) {
        setshowError(true);
      }
    }

    async function defaults() {
      const font = await AsyncStorage.getItem('font_size');
      const diagrams = await AsyncStorage.getItem('show_diagrams');

      if (font === null) await AsyncStorage.setItem('font_size', '12');
      if (diagrams === null) {
        await AsyncStorage.setItem('show_diagrams', 'true');
      }
    }

    async function getData() {
      try {
        await getTemas();
        await getColecoes();
        await getAutores();
        await getRitmos();
        await getLouvores();
        await defaults();
      } catch (error) {
        setshowError(true);
      }
    }

    async function load() {
      const user = await checkUser();
      await getData();
      if (!user) {
        NetInfo.fetch().then(async (state) => {
          if (state.isConnected) {
            return checkAPIConnection();
          }
          return setshowError(true);
        });
      } else if (!showError) return navigation.navigate('Coletanea');
      return false;
    }

    load();
  }, []);

  return (
    <Container>
      {showError && (
        <ErrorModal
          title="Sem conexão!"
          subtitle="Você provavelmente está sem internet ou ocorreu um erro ao conectar no servidor."
        />
      )}
      <Logo source={require('~/assets/logo/loading_logo.png')} />
      <ActivityIndicator size="large" color="#F03061" />
    </Container>
  );
}
