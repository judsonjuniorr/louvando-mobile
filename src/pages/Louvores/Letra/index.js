/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import { Drawer } from 'native-base';
import { Dimensions, Platform, AsyncStorage } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import * as Transposer from 'chord-transposer';

import getRealm from '~/services/realm';
import chordMarkdown from '~/services/chordMarkdown';

import Sidebar from '~/components/Sidebar';
import Header from '~/components/Header';
import Search from '~/components/Search';
import ChangeToneModal from '~/components/ChangeToneModal';

import { Container, Content } from '~/components/styles';
import {
  Title,
  Label,
  Value,
  AuthorLink,
  Author,
  FontWrapper,
  Font,
  FontText,
  Buttons,
  Tone,
} from './styles';

export default function Letra({ navigation }) {
  const [drawer, setdrawer] = useState(null);
  const [louvor, setlouvor] = useState({});
  const [unchanged, setunchanged] = useState({});
  const [autor, setautor] = useState([]);
  const [fontSize, setfontSize] = useState(12);
  const [changeModal, setchangeModal] = useState(false);
  const louvorID = navigation.getParam('id');
  const cifra = navigation.getParam('cifra');
  const returnTo = navigation.getParam('return').to;
  const returnParams = navigation.getParam('return').params;
  const links = [
    {
      key: 1,
      title: 'Letra',
      path: 'Letra',
      params: { id: louvorID, cifra: false },
      active: !cifra,
    },
    {
      key: 2,
      title: 'Cifra',
      path: 'Letra',
      params: { id: louvorID, cifra: true },
      active: cifra,
    },
  ];

  const styles = `
    body {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
      font-size: ${fontSize}pt;
      font-weight: 400;
      color: #fff;
      text-align: left;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden
    }
    p {
      white-space: pre-wrap;
      margin: 0;
    }
    span.chord {
      position: relative;
      font-weight: bold;
      color: #f03061;
      display: inline-block;
      font-size: 90%;
      cursor: pointer;
    }
    span.chord.bellowBar {
      top: -1em;
      width: 5px;
      margin-top: 1em;
    }

    span.chord.bellowBar:before {
      content: '|';
      position: absolute;
      top: 1em;
    }
    span.chord.bellowNoBar {
      top: -1em;
      width: 6px;
      margin-top: 1em;
    }
  `;

  useEffect(() => {
    async function getLouvor() {
      const realm = await getRealm();
      let louv = {};
      const louvorDB = await realm.objectForPrimaryKey('Louvores', louvorID);
      louv = { ...louvorDB };
      if (louv.lyrics_rithm) {
        const rithm = await realm.objectForPrimaryKey(
          'Ritmos',
          louv.lyrics_rithm,
        );
        louv = { ...louv, lyrics_rithm: rithm.name };
      }
      setlouvor(louv);
      setunchanged(louv);
    }

    async function fontSizeDefault() {
      const font = await AsyncStorage.getItem('font_size');
      setfontSize(parseInt(font, 0));
    }

    getLouvor();
    fontSizeDefault();
    setchangeModal(false);
  }, []);

  useEffect(() => {
    async function getAutores() {
      const louvorAuthors = louvor.letra.split(',');
      const realm = await getRealm();
      const autores = [];
      await Promise.all(
        louvorAuthors.map(async (a) => {
          const autorDB = await realm.objectForPrimaryKey('Autores', a);
          autores.push({ initials: autorDB.initials, id: autorDB.id });
        }),
      );
      setautor(autores);
    }

    if (louvor.letra) getAutores();
  }, [louvor]);

  async function handleFontSize(plus) {
    if (plus && fontSize < 20) {
      setfontSize(fontSize + 1);
      await AsyncStorage.setItem('font_size', `${fontSize + 1}`);
    }
    if (!plus && fontSize > 8) {
      setfontSize(fontSize - 1);
      await AsyncStorage.setItem('font_size', `${fontSize - 1}`);
    }
  }

  async function handleChangeTone(tone) {
    if (tone === unchanged.tone) {
      setchangeModal(false);
      setlouvor(unchanged);
    } else {
      const chordList = louvor.lyrics_chords.replace(new RegExp(',', 'g'), ' ');
      const chords = Transposer.transpose(chordList)
        .fromKey(unchanged.tone)
        .toKey(tone)
        .toString()
        .split(' ');

      let lyrics = unchanged.lyrics_letra;

      unchanged.lyrics_chords.split(',').map(
        (c, index) => (lyrics = lyrics
            .split(`{${c}}`)
            .join(`{${chords[index]}}`)
            .split(`[${c}]`)
            .join(`[${chords[index]}]`)
            .split(`|${c}|`)
            .join(`|${chords[index]}|`)),
      );

      const newLouv = {
        ...louvor,
        tone,
        lyrics_letra: lyrics,
        lyrics_chords: chords.join(','),
      };
      setlouvor(newLouv);
      setchangeModal(false);
    }
  }

  function closeDrawer() {
    drawer._root.close();
  }
  function openDrawer() {
    drawer._root.open();
  }

  function closeModal() {
    setchangeModal(false);
  }

  return (
    <Drawer
      ref={ref => setdrawer(ref)}
      content={<Sidebar navigator={navigation} active="Main" />}
      onClose={() => closeDrawer()}
    >
      <ChangeToneModal
        changeModal={changeModal}
        toneChange={handleChangeTone}
        changeModalFn={closeModal}
        tone={louvor.tone}
      />
      <Search
        openSidebar={openDrawer}
        navigation={navigation}
        returnTo="Letra"
        returnParams={{
          id: louvorID,
          cifra,
          return: { to: returnTo, params: returnParams },
        }}
      />
      <Container>
        <Header
          title={`${`${louvor.collection === '5cbca7cbddba4a453824796a'
            && 'A'}${louvor.collection === '5cbca907ddba4a453824796d' && 'C'}00${
            louvor.number
          }`.slice(-3)} - ${louvor.title}`}
          openSidebar={openDrawer}
          navigation={navigation}
          goBack={returnTo}
          params={returnParams}
          links={louvor.lyrics_letra ? links : []}
        />
        <Content keyboardShouldPersistTaps="handled">
          <Title>
            <Label>
              Tonalidade: <Value>{louvor.tone}</Value>
            </Label>
            {cifra && (
              <Label center>
                Ritmo: <Value>{louvor.lyrics_rithm}</Value>
              </Label>
            )}
            <Label right>
              Autor:{' '}
              {autor.map((a, index) => (
                <AuthorLink
                  onPress={() => {
                    navigation.navigate('AutorProfile', {
                      id: a.id,
                      returnTo: 'Letra',
                      params: { id: louvorID },
                    });
                  }}
                  key={Math.random()}
                >
                  <Author>
                    {a.initials}
                    <Label>{index + 1 === autor.length ? '' : ', '}</Label>
                  </Author>
                </AuthorLink>
              ))}
            </Label>
          </Title>
          <Buttons>
            <FontWrapper>
              <Font
                left
                onPress={() => handleFontSize(false)}
                disabled={fontSize === 8}
              >
                <FontText>A-</FontText>
              </Font>
              <Font
                right
                onPress={() => handleFontSize(true)}
                disabled={fontSize === 20}
              >
                <FontText bold>A+</FontText>
              </Font>
            </FontWrapper>
            {cifra && (
              <FontWrapper>
                <Tone onPress={() => setchangeModal(true)}>
                  <FontText>Tonalidade</FontText>
                </Tone>
              </FontWrapper>
            )}
          </Buttons>
          {louvor.lyrics && (
            <AutoHeightWebView
              source={{
                html: chordMarkdown(
                  cifra ? louvor.lyrics_letra : louvor.lyrics,
                ),
              }}
              scalesPageToFit={Platform.OS === 'Android'}
              automaticallyAdjustContentInsets={false}
              style={{ width: Dimensions.get('window').width - 30 }}
              customStyle={styles}
              scrollEnabled={false}
              heightOffset={5}
            />
          )}
        </Content>
      </Container>
    </Drawer>
  );
}
