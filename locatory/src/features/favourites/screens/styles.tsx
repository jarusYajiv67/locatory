import styled from "styled-components/native";

export const CardsContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  margin-top: 14px;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 7%;
`;

export const HeartImage = styled.Image.attrs({
  source: require("../../../../assets/icons/heart.png")
})`
  width: 200px;
  height: 200px;
  opacity: 0.84;
  margin-bottom: 4%;
`;

export const EmptyText = styled.Text`
  font-family: CoreSans;
  text-align: center;
  font-size: 21px;
  color: ${props => props.theme.colors.text};
  opacity: 0.84;
`;
