import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex: 1;
  background: #09121c;
  padding-top: ${getStatusBarHeight(true)}px;
  justify-content: center;
`;

export const Logo = styled.Image`
  margin: 0 auto 20% auto;
`;

export const Form = styled.View`
  width: 300px;
  margin: 0 auto;
  justify-content: center;
`;

export const FormGroup = styled.View`
  flex-direction: row;
  border-bottom-width: 2px;
  border-bottom-color: #536274;
  margin-bottom: 15px;
`;

export const Icone = styled(Icon)`
  margin-top: 15px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255,0.75)',
})`
  padding-left: 5px;
  color: #fff;
  font-size: 18px;
  width: 100%;
  font-family: 'Montserrat Regular';
`;

export const Submit = styled.TouchableOpacity`
  background: #2e65fd;
  border-radius: 20px;
  height: 50px;
  justify-content: center;
  text-align: center;
  font-size: 18px;
  color: #fff;
  width: 80%;
  margin: 0 auto;
`;
export const SubmitText = styled.Text`
  text-align: center;
  font-size: 18px;
  color: #fff;
  font-family: 'Montserrat Medium';
`;

export const Links = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
`;
export const LinksText = styled.Text`
  color: #fff;
  font-weight: 400;
  font-size: 14px;
  font-family: 'Montserrat Regular';
`;

export const Divider = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  margin: 0 5px;
  font-family: 'Montserrat Regular';
`;

export const ErrorBox = styled.Text`
  background: #ffc1c1;
  color: #c02424;
  text-align: center;
  padding: 10px 0;
  width: 300px;
  margin: -50px auto 10px auto;
  justify-content: center;
  border-radius: 3px;
`;

export const ErrorText = styled.Text`
  color: #f03061;
  margin-top: -15px;
  margin-bottom: 10px;
`;
