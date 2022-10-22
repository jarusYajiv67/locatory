import styled from "styled-components/native";

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})``;

export const Card = styled.View`
  border-color: ${(props) => props.theme.colors.text};
  border-width: 1px;
  border-radius: 4px;
  margin: 7px;
  padding: 6px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserImage = styled.Image`
  width: 56px;
  height: 56px;
  margin-right: 4px;
  border-width: 2px;
  border-color: #171417;
  border-radius: 50px;
`;

export const Details = styled.View``;

export const Rating = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RateIcon = styled.Image.attrs({
  source: require("../../../assets/icons/fav.png"),
})`
  width: 21px;
  height: 21px;
  margin-left: 4px;
  margin-bottom: 3px;
`;

export const Rate = styled.Text`
  font-family: CoreSans;
  font-size: 14px;
  ${(props) => props.theme.colors.text};
`;

export const Name = styled.Text`
  font-family: CoreSans;
  font-size: 18px;
  opacity: 0.84;
  ${(props) => props.theme.colors.text};
`;

export const Time = styled.Text`
  font-family: CoreSans;
  font-size: 14px;
  ${(props) => props.theme.colors.text};
  margin-left: 3px;
`;

export const ReviewText = styled.Text`
  font-family: CoreSans;
  font-size: 16px;
  opacity: 0.84;
  ${(props) => props.theme.colors.text};
`;
