import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { AnyStyledComponent } from "styled-components";

export const SearchContainer = styled.View`
  padding: 7px;
  width: 100%;
  padding-bottom: 7px;
`;

export const SearchBar = styled(Searchbar as unknown as AnyStyledComponent).attrs({
  inputStyle: {
    fontFamily: "CoreSans",
    fontSize: 24,
    textAlign: "center",
  },
  iconColor: "#171417",
})`
  elevation: 7;
  border-radius: 7px;
`;
