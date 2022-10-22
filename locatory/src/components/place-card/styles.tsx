import { Chip, Button } from "react-native-paper";
import { AnyStyledComponent } from "styled-components";
import heart from "../../../assets/icons/heart.png";
import heartFilled from "../../../assets/icons/heart-filled.png";
import styled from "styled-components/native";

export const Card = styled.View`
  border-color: ${(props) => props.theme.colors.text};
  border-width: 1px;
  border-radius: 4px;
  margin: 7px;
  padding: 6px;
`;

export const TopImage = styled.Image`
  width: 100%;
  height: 168px;
  border-radius: 4px;
`;

export const Divider = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;

export const LeftContent = styled.View`
  max-width: 50%;
`;

export const Name = styled.Text`
  font-family: CoreSans;
  font-size: 30px;
  opacity: 0.84;
`;

export const ChipsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CategChip = styled(Chip as AnyStyledComponent).attrs({
  mode: "outlined",
  textStyle: { 
    color: "black",
    marginVertical: 0,
    marginRight: 6,
    marginLeft: 6,
    fontFamily: 'CoreSans',
    fontSize: 14,
  },
})`
  margin-right: 3px;
  margin-top: 4px;
  background-color: ${props => props.theme.colors.bg};
  border-color: ${props => props.theme.colors.text};
  border-width: 1px;
`;

export const RightContent = styled.View`
  max-width: 50%;
  justify-content: space-between;
`;

export const Address = styled.Text`
  font-family: CoreSans;
  font-size: 18px;
  opacity: 0.84;
  margin-top: 4px;
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

export const RatingContainer = styled.View`
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

export const Rate = styled.Text``;

export const RateCount = styled.Text`
  margin-left: 4px;
  color: #3366CC;
`;

export const FavImage = styled.Image.attrs((props: {fav:boolean}) => ({
  source: props.fav ? heartFilled : heart
}))`
  width: 28px;
  height: 28px;
  margin-left: 7px;
`;

export const Buttons = styled.View``;

export const DetailButton = styled(Button as AnyStyledComponent).attrs({
  mode: "contained",
  labelStyle: {
    color: "#f4f4f4",
    marginVertical: 3,
    marginHorizontal: 6,
    fontSize: 16,
    fontFamily: 'CoreSans'
  },
  uppercase: false
})`
  background-color: #171417;
  margin-top: 6px;
`;
