import React, { useState, useEffect } from 'react';
import { Drawer } from 'native-base';
import getRealm from '~/services/realm';

import Sidebar from '~/components/Sidebar';
import Header from '~/components/Header';
import Search from '~/components/Search';
import Pagination from '~/components/Pagination';
import LouvorListing from '~/components/LouvorListing';

import { Container, Content, List } from '~/components/styles';

export default function CIA({ navigation }) {
  const [drawer, setdrawer] = useState(null);
  const [totalPages, settotalPages] = useState(1);
  const [louvores, setLouvores] = useState([]);
  const page = navigation.getParam('page') || 1;
  const pageSize = 15;
  const links = [
    {
      key: 1,
      title: 'Coletânea ICM',
      path: 'Coletanea',
      active: false,
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
      active: true,
    },
  ];

  useEffect(() => {
    async function getLouvores() {
      const skip = (page - 1) * pageSize;
      const limit = skip + pageSize;
      const realm = await getRealm();
      const louvorDB = await realm
        .objects('Louvores')
        .filtered('collection = "5cbca907ddba4a453824796d"')
        .sorted('number', false);
      setLouvores(louvorDB.slice(skip, limit));
      settotalPages(Math.ceil(louvorDB.length / pageSize) || 1);
    }

    getLouvores();
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
      content={<Sidebar navigator={navigation} active="Main" />}
      onClose={() => closeDrawer()}
    >
      <Search openSidebar={openDrawer} navigation={navigation} returnTo="CIA" />
      <Container>
        <Header
          title="Crianças e adolescentes"
          openSidebar={openDrawer}
          links={links}
          navigation={navigation}
        />
        <Content>
          <List
            data={louvores}
            keyExtractor={item => String(item.id)}
            renderItem={item => (
              <LouvorListing data={item} navigation={navigation} />
            )}
          />
        </Content>
        <Pagination
          component="CIA"
          actualPage={page}
          totalPage={totalPages}
          navigation={navigation}
        />
      </Container>
    </Drawer>
  );
}
