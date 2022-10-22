import styled from "styled-components/native";
import { Button, Modal, TextInput } from "react-native-paper";
import { Dimensions } from "react-native";

import Text from "../../../../components/typography";
import { AnyStyledComponent } from "styled-components";

const windowWidth: number = Dimensions.get("window").width;

export const Scroller = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
})``;

export const MainLogo = styled.Image.attrs({
  source: require("../../../../../assets/logo.png")
})`
  height: 240px;
`;

export const AccountContainer = styled.View`
  /* flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center; */
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountForm = styled.View`
  padding: ${(props) => props.theme.space[0]};
  margin-top: ${(props) => props.theme.space[0]};
  background-color: ${props => props.theme.colors.bg};
  flex-direction: column;
  align-items: center;
  border-radius: 7px;
`;

export const AuthButton = styled(Button as AnyStyledComponent)<{tiny?: boolean}>`
  padding: ${(props) => props.theme.space[1]};
  width: ${windowWidth - 84}px;
  ${({ tiny }) => tiny && `width: auto;`}
  fontfamily: GothicBanner;
`;

export const AuthInput = styled(TextInput as unknown as AnyStyledComponent)`
  width: ${windowWidth - 84}px;
  fontfamily: CoreSans;
`;

export const Title = styled(Text)`
  font-family: "HunderedMiraclesPlain";
  align-self: stretch;
  text-align: center;
  font-size: ${60}px;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
`;

export const PressableFooter = styled.Pressable`
  align-self: center;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const TopCredit = styled.View`
  display: flex;
`;

export const ModalStyles = styled(Modal as AnyStyledComponent)`
  backgroundColor: rgba(0, 0, 0, 0.7);
  display: flex;
  alignItems: center;
`;
