import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

export const Container = styled.View``;

export const ProgressBar = styled.View`
  height: 3px;
  width: ${screenWidth};
  border-left-width: ${props => Math.round((screenWidth / props.total) * props.actual)}px;
  border-left-color: #2e65fd;
  background: rgba(46, 101, 253, 0.35);
`;

export const InfoBox = styled.View`
  flex-direction: row;
  height: 45px;
  padding: 0 10px;
`;

export const IconLink = styled.TouchableOpacity`
  padding-top: 8px;
`;

export const Page = styled.Text`
  flex: 1;
  font-size: 16px;
  font-family: 'Montserrat Medium';
  text-align: center;
  color: #fff;
  text-align-vertical: center;
`;
