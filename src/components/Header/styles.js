import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

export const Container = styled(LinearGradient).attrs({
  start: { x: 0.85, y: 1 },
  end: { x: 0.89, y: 0 },
  locations: [0, 0.8],
  colors: ['#2E65FD', '#A6449B'],
})`
  padding: 0 13px;
  padding-top: ${75 + getStatusBarHeight(true)}px;
`;

export const TitleView = styled.View`
  flex-direction: row;
  padding: 0 13px;
  margin-left: -13px;
  margin-bottom: 10px;
  width: ${screenWidth};
`;

export const TitleWrap = styled.View`
  ${props => (props.safeArea
      ? `
      margin-right: 35px
      `
      : '')}
`;

export const GoBackWrap = styled.TouchableOpacity`
  padding: 0px 10px;
  margin-right: 5px;
  justify-content: center;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-family: 'Montserrat Medium';
  font-size: 24px;
  color: #fff;
`;

export const Description = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'Montserrat Medium';
  font-size: 14px;
  color: #fff;
`;

export const LinkWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const LinkClick = styled.TouchableWithoutFeedback``;
export const Links = styled.Text`
  color: #fff;
  font-size: 14px;
  font-family: 'Montserrat Medium';
  padding: 5px 0;
  margin-right: ${props => (props.last ? '0' : '15')}px;
  border-bottom-width: 2px;
  border-bottom-color: ${props => (props.active ? '#f03061' : 'transparent')};
`;
