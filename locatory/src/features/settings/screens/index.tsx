import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
  StackNavigationOptions,
  TransitionPresets
} from "@react-navigation/stack";

import SettingsMenu from "./menu";
import ProfileScreen from "./profile";
import ConditionsScreen from "../../account/screens/conditions";
import SubscriptionScreen from "./subscription";

type SettingsParamList = {
  Menu: undefined,
  Profile: undefined,
  Subscription: undefined,
  Conditions: undefined
};

export type MenuScreenProp = StackNavigationProp<SettingsParamList, "Menu">;
export type SubscriptionScreenProp = StackNavigationProp<SettingsParamList, "Subscription">;
export type ConditionsScreenProp = StackNavigationProp<SettingsParamList, "Conditions">;

const ConditionScreen = () => <ConditionsScreen fromSettings={true} />;

const SettingStack = createStackNavigator<SettingsParamList>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.ModalSlideFromBottomIOS,
};

interface SettingsScreenProps {}

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  return (
    <SettingStack.Navigator 
      screenOptions={screenOptions}
      initialRouteName="Menu"
    >
      <SettingStack.Screen name="Menu" component={SettingsMenu} />
      <SettingStack.Screen name="Subscription" component={SubscriptionScreen} />
      <SettingStack.Screen name="Conditions" component={ConditionScreen} />
    </SettingStack.Navigator>
  );
};

export default SettingsScreen;