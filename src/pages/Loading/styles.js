import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Container = styled.View`
  flex: 1;
  background: #09121c;
  padding-top: ${getStatusBarHeight(true)}px;
  justify-content: center;
`;

export const Logo = styled.Image`
  margin: 0 auto;
  width: 223px;
  height: 211px;
  margin-bottom: 50px;
`;
