import React, { useState, useEffect } from 'react';
import getRealm from '~/services/realm';

import {
  LinkBox,
  Container,
  PreBlock,
  Pre,
  Content,
  Title,
  Subtitle,
  Tone,
} from './styles';

export default function LouvorListing({
  data,
  navigation,
  returnTo,
  returnParams = {},
}) {
  const [autor, setautor] = useState('');
  const { item } = data;
  const letra = item.letra.split(',');

  useEffect(() => {
    async function getAutor() {
      const realm = await getRealm();
      let autores = '';
      await Promise.all(
        letra.map(async (aut) => {
          const autorDB = await realm.objectForPrimaryKey('Autores', aut);
          autores += `${autorDB.name}, `;
        }),
      );
      setautor(autores.slice(0, -2));
    }

    getAutor();
  }, []);

  return (
    <LinkBox
      onPress={() => {
        navigation.navigate('Letra', {
          id: item.id,
          return: { to: returnTo, params: returnParams },
        });
      }}
    >
      <Container>
        <PreBlock>
          <Pre>
            {item.number
              ? `${item.collection === '5cbca7cbddba4a453824796a'
                  && 'A'}${item.collection === '5cbca907ddba4a453824796d'
                  && 'C'}00${item.number}`.slice(-3)
              : 'N/D'}
          </Pre>
        </PreBlock>
        <Content>
          <Title>
            {item.title} <Tone>({item.tone})</Tone>
          </Title>
          <Subtitle>{autor}</Subtitle>
        </Content>
      </Container>
    </LinkBox>
  );
}
