import React, { useState, useEffect } from 'react';
import { Drawer } from 'native-base';
import getRealm from '~/services/realm';

import Sidebar from '~/components/Sidebar';
import Header from '~/components/Header';
import AuthorItem from '~/components/AuthorItem';
import Pagination from '~/components/Pagination';
import Search from '~/components/Search';

import { Container, Content, List } from '~/components/styles';

export default function AutoresListing({ navigation }) {
  const [drawer, setdrawer] = useState(null);
  const [autores, setAutores] = useState([]);
  const [totalPages, settotalPages] = useState(1);
  const initial = navigation.getParam('initial');
  const page = navigation.getParam('page') || 1;
  const pageSize = 15;

  useEffect(() => {
    async function getAutores() {
      const skip = (page - 1) * pageSize;
      const limit = skip + pageSize;
      const realm = await getRealm();
      const autoresDB = await realm
        .objects('Autores')
        .filtered(`name BEGINSWITH "${initial.toUpperCase()}"`)
        .sorted('name', true);
      settotalPages(Math.ceil(autoresDB.length / pageSize));
      setAutores(autoresDB.slice(skip, limit));
    }

    getAutores();
  }, [page]);

  function closeDrawer() {
    drawer._root.close();
  }
  function openDrawer() {
    drawer._root.open();
  }
  return (
    <Drawer
      ref={ref => setdrawer(ref)}
      content={<Sidebar navigator={navigation} active="Authors" />}
      onClose={() => closeDrawer()}
    >
      <Search
        openSidebar={openDrawer}
        navigation={navigation}
        returnTo="AutoresListing"
        returnParams={{
          initial,
          page,
        }}
      />
      <Container>
        <Header
          title={`Autores - ${initial}`}
          openSidebar={openDrawer}
          navigation={navigation}
          goBack="AutoresHome"
        />
        <Content keyboardShouldPersistTaps="handled">
          <List
            data={autores}
            keyExtractor={item => String(item.id)}
            renderItem={item => (
              <AuthorItem
                data={item}
                navigation={navigation}
                returnPage="AutoresListing"
                page={page}
              />
            )}
          />
        </Content>
        <Pagination
          component="AutoresListing"
          actualPage={page}
          totalPage={totalPages}
          navigation={navigation}
        />
      </Container>
    </Drawer>
  );
}
