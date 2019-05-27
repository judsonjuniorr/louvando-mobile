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

export default function AutorProfile({ navigation }) {
  const [drawer, setdrawer] = useState(null);
  const [autor, setautor] = useState({});
  const [totalPages, settotalPages] = useState(1);
  const [louvores, setLouvores] = useState([]);
  const autorID = navigation.getParam('id');
  const page = navigation.getParam('page') || 1;
  const returnTo = navigation.getParam('returnTo');
  const params = navigation.getParam('params') || {};
  const pageSize = 15;

  useEffect(() => {
    async function ritmoData() {
      const realm = await getRealm();
      const autorDB = realm.objectForPrimaryKey('Autores', autorID);
      setautor(autorDB);
    }

    ritmoData();
  }, []);

  useEffect(() => {
    async function getLouvores() {
      const skip = (page - 1) * pageSize;
      const limit = skip + pageSize;
      const realm = await getRealm();
      const louvorDB = await realm
        .objects('Louvores')
        .filtered(`letra CONTAINS "${autorID}"`)
        .sorted('number', false);
      setLouvores(louvorDB.slice(skip, limit));
      settotalPages(Math.ceil(louvorDB.length / pageSize) || 1);
    }

    if (autor) getLouvores();
  }, [page, autor]);

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
        returnTo="AutorProfile"
        returnParams={{
          id: autorID,
          page,
          returnTo,
          params,
        }}
      />
      <Container>
        <Header
          title={`Autores - ${autor.initials}`}
          description={autor.name}
          openSidebar={openDrawer}
          navigation={navigation}
          goBack={returnTo}
          params={params}
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
                  returnTo="AutorProfile"
                  returnParams={{
                    id: autorID,
                    page,
                    returnTo,
                    params,
                  }}
                />
              )}
            />
          </ListScroll>
        </Content>
        <Pagination
          component="AutorProfile"
          actualPage={page}
          totalPage={totalPages}
          navigation={navigation}
        />
      </Container>
    </Drawer>
  );
}
