import styled from 'styled-components/native';

export const LinkBox = styled.TouchableWithoutFeedback``;

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const PreBlock = styled.View`
  width: 85px;
  justify-content: center;
  padding: 0 5px;
`;

export const Pre = styled.Text`
  color: #fff;
  font-size: 14px;
  font-family: 'Montserrat Regular';
  text-align: center;
`;

export const Content = styled.View`
  text-align-vertical: center;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: #fff;
  font-size: 12px;
  font-family: 'Montserrat Regular';
`;
export const Subtitle = styled.Text`
  color: #536274;
  font-size: 8px;
  font-family: 'Montserrat Regular';
`;
