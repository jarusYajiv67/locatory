import React from "react";
import { 
  createStackNavigator, 
  StackNavigationOptions, 
  StackNavigationProp,
  TransitionPresets
} from "@react-navigation/stack";

import LoginScreen from '../../features/account/screens/login';
import ConditionsScreen from '../../features/account/screens/conditions';

interface AccountNavigatorProps {}

type StackParamList = {
  Login: undefined,
  Create: undefined,
  Conditions: undefined
};

export type LoginScreenProp = StackNavigationProp<StackParamList, "Login">;
export type CreateScreenProp = StackNavigationProp<StackParamList, "Create">;
export type ConditionsScreenProp = StackNavigationProp<StackParamList, "Conditions">;

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.ModalSlideFromBottomIOS
};

const Stack = createStackNavigator<StackParamList>();

const AccountNavigator: React.FC<AccountNavigatorProps> = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Conditions" component={ConditionsScreen} />
    </Stack.Navigator>
  );
};

export default AccountNavigator;

