import styled from "styled-components/native";

export const Container = styled.View`
  position: absolute;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.42);
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const MesssageBox = styled.View`
  background-color: ${props => props.theme.colors.bg};
  border-radius: 7px;
  padding: 4%;
  width: 84%;
`;

export const MessageText = styled.Text`
  font-family: CoreSans;
  color: ${props => props.theme.colors.text};
  font-size: 24px;
  text-align: center;
`;
