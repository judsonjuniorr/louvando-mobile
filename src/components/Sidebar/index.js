import React, { useState, useEffect } from 'react';
import AntIcons from 'react-native-vector-icons/AntDesign';
import SLIIcons from 'react-native-vector-icons/SimpleLineIcons';
import MIIcons from 'react-native-vector-icons/MaterialIcons';

import getRealm from '~/services/realm';

import {
  Container,
  Name,
  Email,
  Divider,
  Linkbox,
  LinkText,
  Iconbox,
  Footer,
  BGImg,
} from './styles';

export default function Sidebar({ navigator, active }) {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');

  useEffect(() => {
    async function userData() {
      const realm = await getRealm();
      const user = await realm.objects('User')[0];
      setname(user.name);
      setemail(user.email);
    }

    userData();
  }, []);

  async function handleLogout() {
    const realm = await getRealm();
    const users = await realm.objects('User');
    realm.write(() => {
      realm.delete(users);
    });
    navigator.navigate('Login');
  }

  function handleSwitch(actual, screen) {
    if (active !== actual) return navigator.navigate(screen);
    return null;
  }

  return (
    <Container>
      <Name>{name}</Name>
      <Email>{email}</Email>
      <Divider />
      <Linkbox onPress={() => handleSwitch('Main', 'Coletanea')}>
        <Iconbox>
          <AntIcons
            name="home"
            size={24}
            color={active === 'Main' ? '#2E65FD' : '#536274'}
          />
        </Iconbox>
        <LinkText active={active === 'Main'}>Página inicial</LinkText>
      </Linkbox>
      <Linkbox onPress={() => handleSwitch('Rithms', 'RitmosHome')}>
        <Iconbox>
          <SLIIcons
            name="music-tone-alt"
            size={24}
            color={active === 'Rithms' ? '#2E65FD' : '#536274'}
          />
        </Iconbox>
        <LinkText active={active === 'Rithms'}>Ritmos</LinkText>
      </Linkbox>
      <Linkbox onPress={() => handleSwitch('Authors', 'AutoresHome')}>
        <Iconbox>
          <MIIcons
            name="people-outline"
            size={24}
            color={active === 'Authors' ? '#2E65FD' : '#536274'}
          />
        </Iconbox>
        <LinkText active={active === 'Authors'}>Autores</LinkText>
      </Linkbox>
      <Linkbox onPress={() => handleSwitch('Settings', 'Settings')}>
        <Iconbox>
          <SLIIcons
            name="settings"
            size={24}
            color={active === 'Settings' ? '#2E65FD' : '#536274'}
          />
        </Iconbox>
        <LinkText active={active === 'Settings'}>Configurações</LinkText>
      </Linkbox>

      <Footer>
        <Divider footer />
        <Linkbox onPress={handleLogout}>
          <Iconbox>
            <SLIIcons name="logout" size={24} color="#536274" />
          </Iconbox>
          <LinkText>Desconectar</LinkText>
        </Linkbox>
      </Footer>
      <BGImg source={require('~/assets/sidebar/sidebarBG.png')} />
    </Container>
  );
}
