import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  margin-top: 0;
  margin-bottom: 7px;
  margin-left: 5px;
  margin-right: 5px;
  border-bottom-width: 1px;
  padding-bottom: 3px;
`;

export const Name = styled.Text`
  font-family: CoreSans;
  font-size: 18px;
  font-color: ${props => props.theme.colors.text};
  opacity: 0.9;
`;

export const Address = styled.Text`
  font-family: CoreSans;
  font-size: 16px;
  font-color: ${props => props.theme.colors.text};
  opacity: 0.84;
`;
