import React, { useState, useEffect } from 'react';
import { Drawer } from 'native-base';
import getRealm from '~/services/realm';

import Sidebar from '~/components/Sidebar';
import Header from '~/components/Header';
import Search from '~/components/Search';
import AuthorItem from '~/components/AuthorItem';

import {
 Container, Content, Title, List 
} from '~/components/styles';
import {
 Alphabet, AlphabetBox, Character, Authors 
} from './styles';

export default function AutoresHome({ navigation }) {
  const [drawer, setdrawer] = useState(null);
  const alphabet = 'abcdefghijklmnoprstuvwz'.split('');
  const [alpListing, setalpListing] = useState([]);
  const [topAutores, settopAutores] = useState([]);

  useEffect(() => {
    async function getAlphabet() {
      const realm = await getRealm();
      const autoresDB = await realm.objects('Autores');
      const data = [];
      alphabet.map((a, index) => data.push({
          key: index,
          character: a.toUpperCase(),
          authors: autoresDB.filtered(`name BEGINSWITH "${a.toUpperCase()}"`)
            .length,
        }),);
      setalpListing(data);
    }

    async function getTopAuthors() {
      const realm = await getRealm();
      const autoresDB = await realm.objects('Autores').sorted('louvores', true);
      settopAutores(autoresDB.slice(0, 5));
    }

    getAlphabet();
    getTopAuthors();
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
      content={<Sidebar navigator={navigation} active="Authors" />}
      onClose={() => closeDrawer()}
    >
      <Search
        openSidebar={openDrawer}
        navigation={navigation}
        returnTo="AutoresHome"
      />
      <Container>
        <Header
          title="Autores"
          openSidebar={openDrawer}
          navigation={navigation}
        />
        <Content keyboardShouldPersistTaps="handled">
          <Alphabet>
            {alpListing.map(c => (
              <AlphabetBox
                key={c.key}
                onPress={() => navigation.navigate('AutoresListing', {
                    initial: c.character,
                  })
                }
              >
                <Character>{c.character}</Character>
                <Authors>
                  {c.authors} Autor{c.authors !== 1 ? 'es' : ''}
                </Authors>
              </AlphabetBox>
            ))}
          </Alphabet>
          <Title topMargin bottomMargin>
            Autores com mais louvores
          </Title>
          <List
            data={topAutores}
            keyExtractor={item => String(item.id)}
            renderItem={item => (
              <AuthorItem
                data={item}
                navigation={navigation}
                returnPage="AutoresHome"
              />
            )}
          />
        </Content>
      </Container>
    </Drawer>
  );
}
