import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const screenHeight = Math.round(Dimensions.get('window').height) - 165;

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background: #09121c;
`;

export const Content = styled.View`
  flex: 1;
  padding: 13px 15px;
  min-height: ${screenHeight};
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: 'Montserrat Medium';
  ${props => (props.topMargin ? 'margin-top: 20px;' : '')}
  ${props => (props.bottomMargin ? 'margin-bottom: 10px;' : '')}
`;

export const ListScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  showsVerticalScrollIndicator: false,
})`
  margin: -13px -15px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const ShowMore = styled.TouchableOpacity`
  background-color: #2e65fd;
  height: 25px;
  padding: 0 20px;
  margin: 10px auto;
  border-radius: 20px;
  justify-content: center;
`;
export const MoreText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-family: 'Montserrat Medium';
  text-align: center;
`;
