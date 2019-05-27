import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  Title,
  Links,
  LinkWrapper,
  LinkClick,
  TitleView,
  GoBackWrap,
  Description,
  TitleWrap,
} from './styles';

export default function Header({
  title,
  description,
  links,
  navigation,
  goBack,
  params = {},
}) {
  return (
    <Container>
      <TitleView>
        {goBack && (
          <GoBackWrap onPress={() => navigation.navigate(goBack, params)}>
            <Icon name="ios-arrow-back" color="#fff" size={28} />
          </GoBackWrap>
        )}
        <TitleWrap safeArea={goBack}>
          <Title>{title}</Title>
          {description && <Description>{description}</Description>}
        </TitleWrap>
      </TitleView>

      {links && (
        <LinkWrapper>
          {links.map((l, index) => (
            <LinkClick
              key={l.key}
              onPress={() => navigation.navigate(l.path, l.params || {})}
            >
              <Links active={l.active} last={links.length === index + 1}>
                {l.title}
                {l.title === 'Cifra' ? (
                  <MCIcon size={14} color="#fff" name="guitar-acoustic" />
                ) : (
                  ''
                )}
              </Links>
            </LinkClick>
          ))}
        </LinkWrapper>
      )}
    </Container>
  );
}
