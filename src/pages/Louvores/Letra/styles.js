import styled from 'styled-components/native';

export const Title = styled.View`
  margin-bottom: 15px;
  flex-direction: row;
`;

export const Buttons = styled.View`
  flex-direction: row;
`;

export const Label = styled.Text`
  flex: 1;
  font-size: 12px;
  color: #536274;
  font-family: 'Montserrat Regular';
  ${props => (props.right
      ? `
      justify-content: flex-end;
      text-align: right;
      `
      : '')}
  ${props => (props.center
      ? `
      justify-content: center;
      text-align: center;
      `
      : '')}
`;

export const Value = styled.Text`
  font-size: 12px;
  color: #fff;
  font-family: 'Montserrat Medium';
  text-decoration: none;
`;

export const AuthorLink = styled.TouchableWithoutFeedback``;
export const Author = styled(Value)`
  text-decoration: underline;
`;

export const FontWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: center;
`;

export const Tone = styled.TouchableOpacity`
  background: #f03061;
  border-radius: 3px;
  padding: 0 10px;
`;

export const Font = styled.TouchableOpacity`
  background: #f03061;
  width: 60px;
  ${props => (props.disabled ? 'opacity: 0.5;' : '')}
  ${props => (props.left
      ? `
        border-right-color: #fff;
        border-right-width: 1px;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      `
      : '')}
  ${props => (props.right
      ? `
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
      `
      : '')}
`;
export const FontText = styled.Text`
  color: #fff;
  text-align: center;
  line-height: 25px;
  font-size: ${props => (props.bold ? '16' : '12')}px;
  font-family: 'Montserrat ${props => (props.bold ? 'Medium' : 'Regular')}';
`;
