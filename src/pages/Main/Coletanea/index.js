import React, { useState, useEffect } from 'react';
import { Drawer } from 'native-base';

import getRealm from '~/services/realm';

import Sidebar from '~/components/Sidebar';
import Header from '~/components/Header';
import Search from '~/components/Search';
import SuccessModal from '~/components/SuccessModal';
import LouvorListing from '~/components/LouvorListing';

import {
  Container,
  Title,
  Content,
  List,
  ListScroll,
  ShowMore,
  MoreText,
} from '~/components/styles';
import {
 Temas, Tema, TemaNumber, TemaTitle, ListTheme 
} from './styles';

export default function Coletanea({ navigation }) {
  const [temas, setTemas] = useState([]);
  const [drawer, setdrawer] = useState(null);
  const [newAccSuccess, setnewAccSuccess] = useState(
    navigation.getParam('newAccSuccess') || false,
  );
  const [louvores, setLouvores] = useState([]);
  const links = [
    {
      key: 1,
      title: 'Coletânea ICM',
      path: 'Coletanea',
      active: true,
    },
    {
      key: 2,
      title: 'Avulsos',
      path: 'Avulsos',
      active: false,
    },
    {
      key: 3,
      title: 'CIA',
      path: 'CIA',
      active: false,
    },
  ];

  useEffect(() => {
    async function getTemas() {
      const realm = await getRealm();
      const temaDB = await realm.objects('Temas').sorted('louvores', true);
      setTemas(temaDB);
    }

    async function getLouvores() {
      const realm = await getRealm();
      const louvorDB = await realm
        .objects('Louvores')
        .filtered('collection = "5cbca8e2ddba4a453824796b"')
        .sorted('title', false)
        .slice(0, 10);
      setLouvores(louvorDB);
    }

    if (newAccSuccess) {
      setTimeout(() => {
        setnewAccSuccess(false);
      }, 4000);
    }

    getTemas();
    getLouvores();
  }, []);

  function closeDrawer() {
    drawer._root.close();
  }
  function openDrawer() {
    drawer._root.open();
  }

  return (
    <Drawer
      ref={ref => setdrawer(ref)}
      content={<Sidebar navigator={navigation} active="Main" />}
      onClose={() => closeDrawer()}
    >
      <Search
        openSidebar={openDrawer}
        navigation={navigation}
        returnTo="Coletanea"
      />
      <Container>
        {newAccSuccess && (
          <SuccessModal
            title="Conta criada!"
            subtitle="Parabéns sua conta foi criada e você já pode utilizar o app."
          />
        )}
        <Header
          title="Página inicial"
          openSidebar={openDrawer}
          links={links}
          navigation={navigation}
        />
        <Content keyboardShouldPersistTaps="handled">
          <Title>Temas</Title>
          <Temas>
            <ListTheme
              data={temas}
              keyExtractor={item => String(item.id)}
              renderItem={item => (
                <Tema
                  onPress={() => navigation.navigate('Tema', { tema: item.item.id })
                  }
                >
                  <TemaNumber>{item.item.louvores}</TemaNumber>
                  <TemaTitle>{item.item.name}</TemaTitle>
                </Tema>
              )}
            />
          </Temas>

          <Title topMargin bottomMargin>
            Todos os louvores
          </Title>
          <ListScroll>
            <List
              data={louvores}
              keyExtractor={item => String(item.id)}
              renderItem={item => (
                <LouvorListing
                  data={item}
                  navigation={navigation}
                  returnTo="Coletanea"
                />
              )}
            />
          </ListScroll>
          <ShowMore onPress={() => navigation.navigate('LColetanea')}>
            <MoreText>Ver Mais</MoreText>
          </ShowMore>
        </Content>
      </Container>
    </Drawer>
  );
}
