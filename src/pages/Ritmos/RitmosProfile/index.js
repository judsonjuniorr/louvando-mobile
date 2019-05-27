import React, { useState, useEffect } from 'react';
import { Drawer } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import getRealm from '~/services/realm';

import Sidebar from '~/components/Sidebar';
import Header from '~/components/Header';
import Search from '~/components/Search';
import Pagination from '~/components/Pagination';
import LouvorListing from '~/components/LouvorListing';

import {
 Container, Content, ListScroll, List 
} from '~/components/styles';
import { SequenceWrapper, SequenceBox, Sequence } from './styles';

export default function RitmosProfile({ navigation }) {
  const [drawer, setdrawer] = useState(null);
  const [ritmo, setritmo] = useState({});
  const [louvores, setLouvores] = useState([]);
  const [totalPages, settotalPages] = useState(1);
  const page = navigation.getParam('page') || 1;
  const rithmID = navigation.getParam('id');
  const pageSize = 15;

  useEffect(() => {
    async function ritmoData() {
      const realm = await getRealm();
      const ritmoDB = realm.objectForPrimaryKey('Ritmos', rithmID);
      await setritmo(ritmoDB);
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
        .filtered(`lyrics_rithm CONTAINS '${ritmo.id}'`)
        .sorted('title', false);
      setLouvores(louvorDB.slice(skip, limit));
      settotalPages(Math.ceil(louvorDB.length / pageSize));
    }

    if (ritmo.id) getLouvores();
  }, [page, ritmo]);

  function closeDrawer() {
    drawer._root.close();
  }
  function openDrawer() {
    drawer._root.open();
  }
  return (
    <Drawer
      ref={ref => setdrawer(ref)}
      content={<Sidebar navigator={navigation} active="Rithms" />}
      onClose={() => closeDrawer()}
    >
      <Search
        openSidebar={openDrawer}
        navigation={navigation}
        returnTo="RitmosHome"
        returnParams={{ page, id: rithmID }}
      />
      <Container>
        <Header
          title={`Ritmos - ${ritmo.name}`}
          openSidebar={openDrawer}
          navigation={navigation}
          goBack="RitmosHome"
        />
        <Content>
          <SequenceWrapper>
            {ritmo.sequence
              && ritmo.sequence.map(s => (
                <SequenceBox key={Math.random()}>
                  <Sequence>
                    <Icon
                      name={
                        s === 'i' ? 'chevron-double-up' : 'chevron-double-down'
                      }
                      color="#fff"
                      size={16}
                    />
                    {s.toUpperCase()}
                  </Sequence>
                </SequenceBox>
              ))}
          </SequenceWrapper>
          <ListScroll>
            <List
              data={louvores}
              keyExtractor={item => String(item.id)}
              renderItem={item => (
                <LouvorListing
                  data={item}
                  navigation={navigation}
                  totalPage={totalPages}
                  returnTo="RitmosProfile"
                  returnParams={{
                    id: rithmID,
                    page,
                  }}
                />
              )}
            />
          </ListScroll>
        </Content>
        <Pagination
          component="RitmosProfile"
          actualPage={page}
          totalPage={totalPages}
          navigation={navigation}
        />
      </Container>
    </Drawer>
  );
}
