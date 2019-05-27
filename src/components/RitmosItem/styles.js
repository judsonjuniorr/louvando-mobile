import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const LinkBox = styled.TouchableWithoutFeedback``;

export const Content = styled.View`
  flex: 1;
  text-align-vertical: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 12px;
  font-family: 'Montserrat Medium';
`;
export const Subtitle = styled.View`
  flex-direction: row;
`;

export const PostBlock = styled.View`
  width: 40px;
  justify-content: center;
`;

export const Number = styled(Title)`
  color: #536274;
  text-align: right;
`;
export const Desc = styled(Number)`
  font-size: 8px;
  font-family: 'Montserrat Regular';
`;

export const SequenceWrapper = styled.View`
  background: #f03061;
  border-radius: 1px;
  margin-right: 3px;
  justify-content: center;
  padding-right: 2px;
  width: 19px;
`;

export const Sequence = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 10px;
  font-family: 'Montserrat Medium';
`;
