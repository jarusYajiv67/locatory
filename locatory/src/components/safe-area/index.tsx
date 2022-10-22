import styled from "styled-components/native";
import { StatusBar } from "react-native";

const SafeArea = styled.SafeAreaView<{fromSettings?: Boolean}>`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  ${StatusBar.currentHeight && `margin-bottom: ${StatusBar.currentHeight}px`};
  ${({ fromSettings }) => fromSettings && `
      margin-top: 0px;
      margin-bottom: 0px;
  `}
`;

export default SafeArea;
