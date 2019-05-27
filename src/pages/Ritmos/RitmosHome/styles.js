import styled from 'styled-components/native';

export const ListScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 13,
    paddingRight: 13,
  },
  showsVerticalScrollIndicator: false,
})`
  margin: -13px -15px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
