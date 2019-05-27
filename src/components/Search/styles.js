import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Container = styled.View`
  flex-direction: row;
  background: #fff;
  border-radius: 20px;
  justify-content: center;
  height: 40px;
  margin-bottom: 10px;
  position: absolute;
  z-index: 999;
  top: ${5 + getStatusBarHeight()}px;
  left: 13px;
  right: 13px;
`;

export const Input = styled.TextInput`
  flex: 1;
`;

export const Icone = styled(Icon)`
  margin: 8px 5px 0 20px;
`;
