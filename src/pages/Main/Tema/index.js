import React, { useState, useEffect } from 'react';
import { Drawer } from 'native-base';
import getRealm from '~/services/realm';

import Sidebar from '~/components/Sidebar';
import Header from '~/components/Header';
import Search from '~/components/Search';
import Pagination from '~/components/Pagination';
import LouvorListing from '~/components/LouvorListing';

import { Container, Content, List } from '~/components/styles';

export default function Tema({ navigation }) {
  const [tema, setTema] = useState({});
  const [drawer, setdrawer] = useState(null);
  const [totalPages, settotalPages] = useState(1);
  const [louvores, setLouvores] = useState([]);
  const temaID = navigation.getParam('tema');
  const page = navigation.getParam('page') || 1;
  const pageSize = 15;

  useEffect(() => {
    async function getTema() {
      const realm = await getRealm();
      const temaDB = await realm.objects('Temas').filtered(`id = "${temaID}"`);
      setTema(temaDB[0]);
    }

    getTema();
  }, []);

  useEffect(() => {
    async function getLouvores() {
      const skip = (page - 1) * pageSize;
      const limit = skip + pageSize;
      const realm = await getRealm();
      const louvorDB = await realm
        .objects('Louvores')
        .filtered(`tema = "${temaID}"`)
        .sorted('number', false);
      setLouvores(louvorDB.slice(skip, limit));
      settotalPages(Math.ceil(louvorDB.length / pageSize));
    }

    if (tema) getLouvores();
  }, [page, tema]);

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
        returnTo="Tema"
        returnParams={{ page, tema: temaID }}
      />
      <Container>
        <Header
          title={tema.name}
          openSidebar={openDrawer}
          navigation={navigation}
          goBack="Coletanea"
        />
        <Content keyboardShouldPersistTaps="handled">
          <List
            data={louvores}
            keyExtractor={item => String(item.id)}
            renderItem={item => (
              <LouvorListing
                data={item}
                navigation={navigation}
                returnTo="Tema"
                returnParams={{ tema: temaID, page }}
              />
            )}
          />
        </Content>
        <Pagination
          component="Tema"
          actualPage={page}
          totalPage={totalPages}
          navigation={navigation}
        />
      </Container>
    </Drawer>
  );
}
