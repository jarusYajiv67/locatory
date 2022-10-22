import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { AnyStyledComponent } from "styled-components";

export const ImageButton = styled(Button as AnyStyledComponent).attrs({
  mode: "text",
  color: "black",
})`
  margin-top: 0px;
`;
