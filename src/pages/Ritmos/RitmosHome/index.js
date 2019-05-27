import React, { useState, useEffect } from 'react';
import { Drawer } from 'native-base';
import getRealm from '~/services/realm';

import Sidebar from '~/components/Sidebar';
import Header from '~/components/Header';
import Search from '~/components/Search';
import RitmosItem from '~/components/RitmosItem';

import { Container, Content } from '~/components/styles';
import { List, ListScroll } from './styles';

export default function RitmosHome({ navigation }) {
  const [drawer, setdrawer] = useState(null);
  const [ritmos, setRitmos] = useState([]);

  useEffect(() => {
    async function getRitmos() {
      const realm = await getRealm();
      const ritmosDB = await realm.objects('Ritmos').sorted('name', false);
      setRitmos(ritmosDB);
    }

    getRitmos();
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
      content={<Sidebar navigator={navigation} active="Rithms" />}
      onClose={() => closeDrawer()}
    >
      <Search
        openSidebar={openDrawer}
        navigation={navigation}
        returnTo="RitmosHome"
      />
      <Container>
        <Header
          title="Ritmos"
          openSidebar={openDrawer}
          navigation={navigation}
        />
        <Content keyboardShouldPersistTaps="handled">
          <ListScroll>
            <List
              data={ritmos}
              keyExtractor={item => String(item.id)}
              renderItem={item => (
                <RitmosItem data={item} navigation={navigation} />
              )}
            />
          </ListScroll>
        </Content>
      </Container>
    </Drawer>
  );
}
