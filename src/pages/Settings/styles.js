import styled from 'styled-components/native';
import Slider from '@react-native-community/slider';

export const Title = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'Montserrat Medium';
  margin-bottom: 5px;
`;

export const Row = styled.View`
  margin: 0 -13px;
  padding: 7px 13px;
  flex-direction: row;
  ${props => (props.noTop
      ? ''
      : `
  border-top-width: 1px;
  border-top-color: #536274;
  `)}
  ${props => (props.isLast
      ? `
  border-bottom-width: 1px;
  border-bottom-color: #536274;
  margin-bottom: 20px;
  `
      : '')}
`;

export const Data = styled.Text`
  flex: 1;
  color: #fff;
  font-size: 12px;
  font-family: 'Montserrat Medium';
  line-height: 15px;
`;

export const Value = styled.Text`
  color: #fff;
  font-size: 11px;
  font-family: 'Montserrat Regular';
  line-height: 15px;
`;

export const ValueBox = styled.View`
  line-height: 15px;
`;

export const UpdateButton = styled.TouchableOpacity`
  background-color: ${props => (props.updateError ? '#ffc1c1' : '#2e65fd')};
  height: 25px;
  padding: 0 10px;
  margin: 0 auto;
  border-radius: 20px;
  justify-content: center;
`;
export const UpdateText = styled.Text`
  color: ${props => (props.updateError ? '#c02424' : '#fff')};
  font-size: 12px;
  font-family: 'Montserrat Medium';
  text-align: center;
`;

export const Slide = styled(Slider).attrs({
  minimumTrackTintColor: '#2E65FD',
  maximumTrackTintColor: '#536274',
  thumbTintColor: '#f7f7f7',
})`
  flex: 1;
`;
