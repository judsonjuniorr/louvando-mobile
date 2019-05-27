import styled from 'styled-components/native';

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

export const Header = styled.Text`
  background: #26ff79;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  text-align: center;
  padding: 10px 0;
`;
export const Message = styled.View`
  text-align: center;
  padding: 6px 0;
  min-height: 100px;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-family: 'Montserrat Medium';
  color: #09121c;
  margin-bottom: 5px;
  text-align: center;
`;
export const Subtitle = styled.Text`
  font-size: 14px;
  font-family: 'Montserrat Regular';
  color: #09121c;
  text-align: center;
`;
