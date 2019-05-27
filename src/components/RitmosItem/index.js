import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  LinkBox,
  Content,
  Title,
  Subtitle,
  PostBlock,
  Number,
  Desc,
  SequenceWrapper,
  Sequence,
} from './styles';

export default function RitmosItem({ data, navigation }) {
  const { item } = data;
  return (
    <LinkBox
      onPress={() => navigation.navigate('RitmosProfile', { id: item.id })}
    >
      <Container>
        <Content>
          <Title>{item.name}</Title>
          <Subtitle>
            {item.sequence.map(s => (
              <SequenceWrapper key={Math.random()}>
                <Sequence>
                  <Icon
                    name={
                      s === 'i' ? 'chevron-double-up' : 'chevron-double-down'
                    }
                    color="#fff"
                    size={10}
                  />
                  {s.toUpperCase()}
                </Sequence>
              </SequenceWrapper>
            ))}
          </Subtitle>
        </Content>
        <PostBlock>
          <Number>{item.louvoresIn.length}</Number>
          <Desc>louvores</Desc>
        </PostBlock>
      </Container>
    </LinkBox>
  );
}
