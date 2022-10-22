import styled from "styled-components/native";

export const ConditionsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ScrollContainer = styled.ScrollView`
  padding: ${props => props.theme.space[4]};
  padding-top: 0px;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.gothicBanner};
  align-self: stretch;
  text-align: center;
  font-size: ${60}px;
`;

export const SubTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.coreSans};
  font-size: 30px;
  opacity: 0.84;
  text-align: center;
`;
