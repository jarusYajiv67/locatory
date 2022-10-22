import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AccountNavigator from './account.navigator';
import AppNavigator from './app.navigator';

import Loader from "../../components/loader";

import { useUserContext } from "../../context/user.context";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const { loggedIn, loading } = useUserContext();
  return (
    <NavigationContainer>
      {loading && <Loader />}
      {loggedIn ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
