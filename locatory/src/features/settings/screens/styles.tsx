import styled from "styled-components/native";
import {Modal} from "react-native-paper";
import { AnyStyledComponent } from "styled-components";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const MenuItem = styled.Text`
  font-family: ${props => props.theme.fonts.coreSans};
  font-size: 28px;
  text-align: center;
  opacity: 0.91;
`;

export const SubsContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SubsHeader = styled.View`
  align-items: center;
`;

export const SubsHeadText = styled.Text`
  font-family: ${(props) => props.theme.fonts.gothicBanner};
  font-size: 84px;
  color: ${(props) => props.theme.colors.text};
  opacity: 0.91;
  letter-spacing: 3px;
`;

export const SubsHeadCap = styled.Text`
  font-family: ${(props) => props.theme.fonts.coreSans};
  font-size: 42px;
  color: ${(props) => props.theme.colors.text};
  opacity: 0.91;
  text-align: center;
`;

export const SubMenu = styled.View`
  margin-bottom: 14px;
`;

export const SubItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SubItemText = styled.Text`
  font-family: ${(props) => props.theme.fonts.coreSans};
  font-size: 21px;
  color: ${(props) => props.theme.colors.text};
  opacity: 0.91;
`;

export const Amount = styled.Text`
  font-family: ${(props) => props.theme.fonts.coreSans};
  font-size: 21px;
  color: ${(props) => props.theme.colors.text};
  opacity: 0.91;
`;

export const ModalStyles = styled(Modal as AnyStyledComponent)`
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
`;

export const ModalContainer = styled.View`
  background-color: ${(props) => props.theme.colors.bg};
  padding: 14px;
  padding-bottom: 3px;
  border-radius: 7px;
`;
