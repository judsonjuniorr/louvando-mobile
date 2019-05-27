/* eslint-disable no-restricted-globals */
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

export default function LSearch({ navigation }) {
  const [drawer, setdrawer] = useState(null);
  const [louvores, setLouvores] = useState([]);
  const [totalPages, settotalPages] = useState(1);
  const [totalResult, settotalResult] = useState(0);
  let page = navigation.getParam('page') || 1;
  const query = navigation.getParam('query');
  const returnTo = navigation.getParam('returnTo');
  const returnParams = navigation.getParam('returnParams') || {};
  const pageSize = 15;

  useEffect(() => {
    async function getLouvores() {
      const skip = (page - 1) * pageSize;
      const limit = skip + pageSize;
      const realm = await getRealm();

      let louvorDB = [];
      if (!isNaN(parseInt(query, 10))) {
        louvorDB = await realm
          .objects('Louvores')
          .filtered(`number = ${query}`)
          .sorted('number', false);
      } else {
        const unique = [];
        const titulo = await realm
          .objects('Louvores')
          .filtered(`title CONTAINS[c] "${query}"`)
          .sorted('number', false);
        titulo.map((l) => {
          louvorDB.push(l);
          unique.push(l._id);
        });

        const letra = await realm
          .objects('Louvores')
          .filtered(`lyrics CONTAINS[c] "${query}"`)
          .sorted('number', false);
        letra.map((l) => {
          if (!unique.includes(l.id)) louvorDB.push(l);
        });
      }

      settotalResult(louvorDB.length);
      setLouvores(louvorDB.slice(skip, limit));
      const total = Math.ceil(louvorDB.length / pageSize) || 1;
      settotalPages(total);
      if (page > total) page = 1;
    }

    getLouvores();
  }, [page, query]);

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
        value={query}
        returnTo={returnTo}
        returnParams={returnParams}
      />
      <Container>
        <Header
          title={`${totalResult} louvor${
            totalResult !== 1 ? 'es' : ''
          } encontrados`}
          openSidebar={openDrawer}
          navigation={navigation}
          goBack={returnTo}
          params={returnParams}
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
                  returnTo="LSearch"
                  returnParams={{
                    page,
                    query,
                    returnTo,
                    returnParams,
                  }}
                />
              )}
            />
          </ListScroll>
        </Content>
        <Pagination
          component="LSearch"
          actualPage={page}
          totalPage={totalPages}
          navigation={navigation}
          params={query}
        />
      </Container>
    </Drawer>
  );
}
