import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Container = styled(LinearGradient).attrs({
  colors: ['#fff', '#F7F7F7'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  flex: 1;
  position: relative;
  padding-top: ${10 + getStatusBarHeight(true)}px;
`;

export const Name = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'Montserrat Medium';
  font-size: 24px;
  color: #09121c;
  margin-top: 30px;
  text-align: center;
`;
export const Email = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'Montserrat Regular';
  font-size: 14px;
  color: #536274;
  text-align: center;
`;

export const Divider = styled.View`
  width: 150px;
  height: 2px;
  border-radius: 5px;
  background: #536274;
  margin: ${props => (props.footer ? '15' : '30')}px auto;
`;

export const Iconbox = styled.View`
  width: 30px;
  margin-top: 5px;
`;

export const Linkbox = styled.TouchableOpacity`
  height: 50px;
  padding-left: 40px;
  padding-right: 5px;
  flex-direction: row;
  line-height: 50px;
  z-index: 1;
`;

export const LinkText = styled.Text`
  font-size: 24px;
  font-family: 'Montserrat Regular';
  margin-left: 5px;
  color: ${props => (props.active ? '#2e65fd' : '#536274')};
`;

export const Footer = styled.View`
  margin-top: auto;
`;

export const BGImg = styled.Image`
  position: absolute;
  bottom: -30px;
  right: 0;
  z-index: 0;
`;
