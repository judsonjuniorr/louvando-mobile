import React from 'react';

import {
  LinkBox,
  Container,
  PreBlock,
  Pre,
  Content,
  Title,
  Subtitle,
} from './styles';

export default function AuthorItem({
 data, navigation, page, returnPage 
}) {
  const { item } = data;
  return (
    <LinkBox
      onPress={() => navigation.navigate('AutorProfile', {
          id: item.id,
          returnTo: returnPage,
          params: { page, initial: item.initials[0] },
        })
      }
    >
      <Container>
        <PreBlock>
          <Pre>{item.initials}</Pre>
        </PreBlock>
        <Content>
          <Title>{item.name}</Title>
          <Subtitle>{item.louvores} louvores</Subtitle>
        </Content>
      </Container>
    </LinkBox>
  );
}
