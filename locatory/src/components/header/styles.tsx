import styled from "styled-components/native";

export const Container = styled.View`
  padding-top: 18px;
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.gothicBanner};
  font-size: 36px;
  align-self: center;
  position: absolute;
  margin-top: 18px;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
`;

export const HrLn = styled.View`
  background-color: ${(props) => props.theme.colors.text};
  border-color: ${(props) => props.theme.colors.text};
  border-width: 1px;
  width: 95%;
  opacity: 0.5;
  position: absolute;
`;

export const Caption = styled.Text`
  font-family: ${(props) => props.theme.fonts.coreSans};
  font-size: 18px;
  background-color: ${(props) => props.theme.colors.bg};
  align-self: center;
  padding-left: 8px;
  padding-right: 8px;
`;