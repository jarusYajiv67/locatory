import React from "react";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";

import {Title, Container, Caption, Footer, HrLn} from "./styles";
import {headerTranslations as translations} from '../../utils/translations';

import { useUserContext } from "../../context/user.context";
import { useMainContext } from '../../context/main.context';

interface HeaderProps extends BottomTabHeaderProps {}

const Header: React.FC<HeaderProps> = ({route}) => {
  const { lang, city } = useMainContext();

  return (
    <Container>
      <Title>locatory</Title>
      <Footer>
        <HrLn />
        <Caption>{route.name === "Home" ? city : translations[route.name as "Favourites" | "Settings"][lang]}</Caption>
      </Footer>
    </Container>
  );
};

export default Header;
