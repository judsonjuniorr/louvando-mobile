import styled from 'styled-components/native';

export const Alphabet = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  showsHorizontalScrollIndicator: false,
})`
  margin-left: -15px;
  margin-right: -15px;
  max-height: 100px;
`;

export const AlphabetBox = styled.TouchableOpacity`
  margin-top: 6px;
  margin-left: 10px;
  max-width: 60px;
`;

export const Character = styled.Text`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  background: #f03061;
  color: #fff;
  font-family: 'Montserrat Medium';
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  margin: 0 auto;
`;
export const Authors = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-family: 'Montserrat Regular';
  font-size: 14px;
  color: #536274;
  text-align: center;
  flex-wrap: wrap;
  margin-top: 2px;
`;
