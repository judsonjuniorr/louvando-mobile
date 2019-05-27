import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
export const Content = styled.View`
  background: #fff;
  border-radius: 4px;
`;

export const Header = styled(LinearGradient).attrs({
  start: { x: 0.85, y: 1 },
  end: { x: 0.89, y: 0 },
  locations: [0, 0.8],
  colors: ['#2E65FD', '#A6449B'],
})`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  text-align: center;
  padding: 10px 0;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: 'Montserrat Medium';
  color: #fff;
  text-align: center;
  margin: 5px auto;
`;

export const Message = styled.View`
  text-align: center;
  padding: 6px 0;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const ToneBox = styled.TouchableOpacity`
  width: 60px;
  height: 30px;
  background: ${props => (props.disabled ? '#C30031' : '#f03061')};
  margin: 5px;
  justify-content: center;
  border-radius: 3px;
`;
export const Tone = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: #fff;
  font-family: 'Montserrat Medium';
  line-height: 30px;
  text-align: center;
`;
