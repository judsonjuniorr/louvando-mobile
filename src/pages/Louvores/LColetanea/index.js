import React, { useState, useEffect } from 'react';
import { Drawer } from 'native-base';

import getRealm from '~/services/realm';

import Sidebar from '~/components/Sidebar';
import Header from '~/components/Header';
import Search from '~/components/Search';
import Pagination from '~/components/Pagination';
import LouvorListing from '~/components/LouvorListing';

import {
 Container, Content, List, ListScroll 
} from '~/components/styles';

export default function LColetanea({ navigation }) {
  const [drawer, setdrawer] = useState(null);
  const [louvores, setLouvores] = useState([]);
  const [totalPages, settotalPages] = useState(1);
  const page = navigation.getParam('page') || 1;
  const pageSize = 15;
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
    async function getLouvores() {
      const skip = (page - 1) * pageSize;
      const limit = skip + pageSize;
      const realm = await getRealm();
      const louvorDB = await realm
        .objects('Louvores')
        .filtered('collection = "5cbca8e2ddba4a453824796b"')
        .sorted('number', false);
      setLouvores(louvorDB.slice(skip, limit));
      settotalPages(Math.ceil(louvorDB.length / pageSize));
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
      <Search
        openSidebar={openDrawer}
        navigation={navigation}
        returnTo="LColetanea"
        returnParams={{ page }}
      />
      <Container>
        <Header
          title="Coletânea ICM"
          openSidebar={openDrawer}
          links={links}
          navigation={navigation}
          goBack="Coletanea"
        />
        <Content keyboardShouldPersistTaps="handled">
          <ListScroll>
            <List
              data={louvores}
              keyExtractor={item => String(item.id)}
              renderItem={item => (
                <LouvorListing
                  data={item}
                  navigation={navigation}
                  returnTo="LColetanea"
                  returnParams={{ page }}
                />
              )}
            />
          </ListScroll>
        </Content>
        <Pagination
          component="LColetanea"
          actualPage={page}
          totalPage={totalPages}
          navigation={navigation}
        />
      </Container>
    </Drawer>
  );
}
