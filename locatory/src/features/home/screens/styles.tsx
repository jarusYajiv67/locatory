import styled from "styled-components/native";
import { Button } from "react-native-paper";
import heart from "../../../../assets/icons/heart.png";
import heartFilled from "../../../../assets/icons/heart-filled.png";

export const Container = styled.View`
  flex: 1;
`;

export const ResultsContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  margin-top: 14px;
`;

export const ItemsContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
})`
  margin-top: 14px;
`;

export const InfoContainer = styled.View`
  flex: 1;
  margin-top: 4px;
`;

export const InfoImage = styled.Image`
  width: 98%;
  height: 168px;
  border-radius: 3px;
  align-self: center;
  margin-top: 4px;
  margin-bottom: 4px;
`;

export const InfoTop = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 3px;
  opacity: 0.9;
  align-self: center;
`;

export const InfoTopContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 7px;
  margin-left: 7px;
`;

export const InfoName = styled.Text`
  font-family: CoreSans;
  font-size: 21px;
  text-align: center;
`;

export const InfoDist = styled.Text`
  font-family: CoreSans;
  font-size: 18px;
  text-align: center;
`;

export const RateIcon = styled.Image.attrs({
  source: require("../../../../assets/icons/fav.png"),
})`
  width: 21px;
  height: 21px;
  margin-left: 4px;
  margin-bottom: 3px;
`;

export const Rate = styled.Text`
  font-family: CoreSans;
  font-size: 16px;
`;

export const RateCount = styled.Text`
  font-family: CoreSans;
  font-size: 16px;
  margin-left: 4px;
`;

export const Images = styled.View`
  flex-direction: row;
  align-self: flex-end;
  align-items: center;
  padding-top: 7px;
  padding-right: 7px;
`;

export const UtilImage = styled.Image`
  width: 28px;
  height: 28px;
  margin-left: 7px;
`;

export const FavImage = styled.Image.attrs((props: { fav: boolean }) => ({
  source: props.fav ? heartFilled : heart,
}))`
  width: 28px;
  height: 28px;
  margin-left: 7px;
`;

export const Address = styled.Text`
  font-family: CoreSans;
  font-size: 18px;
  text-align: center;
  margin-right: 14px; 
  margin-left: 14px;
`;

export const Buttons = styled.View`
  margin-top: 3px;
  flex-direction: row;
  justify-content: space-around;
`;

export const DetailButton = styled(Button as AnyStyledComponent).attrs({
  mode: "contained",
  labelStyle: {
    color: "#f4f4f4",
    marginVertical: 3,
    marginHorizontal: 6,
    fontSize: 16,
    fontFamily: "CoreSans",
  },
  uppercase: false,
})`
  background-color: #171417;
  margin-top: 6px;
  width: 30%;
`;

export const ReviewsContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})``;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 3px;
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
  font-size: 21px;
  background-color: ${(props) => props.theme.colors.bg};
  align-self: center;
  padding-left: 8px;
  padding-right: 8px;
`;

export const NearbyContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})``;
