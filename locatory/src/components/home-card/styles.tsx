import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${props => props.theme.colors.text};
  border-radius: 3px;
  margin: 14px;
  margin-top: 0;
  margin-bottom: 7px;
  width: 120px;
  height: 120px;
  margin-left: 5px;
  margin-right: 5px;
`;

export const Icon = styled.Image`
  width: 84px;
  height: 84px;
`;

export const CategoryText = styled.Text`
  font-family: ${props => props.theme.fonts.coreSans};
  font-size: 21px;
  color: ${props => props.theme.colors.text};
  text-align: center;
`;