import React from "react";
import { 
  createBottomTabNavigator, BottomTabNavigationProp, 
  BottomTabNavigationOptions
} from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import Header from "../../components/header";

import HomeScreen from "../../features/home/screens";
import FavouriteScreen from "../../features/favourites/screens";
import SettingsScreen from "../../features/settings/screens";

const TAB_ICON = {
  Home: "ios-home",
  Favourites: "ios-heart",
  Settings: "ios-settings",
};

type AppParamList = {
  Home: undefined,
  Favourites: undefined,
  Settings: undefined
};

type iconNameType = "home" | "star" | "settings";

interface AppNavigatorProps {}

export type HomeScreenProp = BottomTabNavigationProp<AppParamList, "Home">;
export type FavouriteScreenProp = BottomTabNavigationProp<AppParamList, "Favourites">;
export type SettingsScreenProp = BottomTabNavigationProp<AppParamList, "Settings">;

const screenOptions:
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<AppParamList, keyof AppParamList>;
      navigation: any;
    }) => BottomTabNavigationOptions) = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName: iconNameType = TAB_ICON[route.name] as iconNameType;
    !focused && (iconName += "-outline");
    return (
      <Ionicons name={iconName as iconNameType} size={size} color={color} />
    );
  },
  tabBarActiveTintColor: "#171417",
  tabBarInactiveTintColor: "gray",
  tabBarHideOnKeyboard: true,
  tabBarShowLabel: false,
  header: (props) => <Header {...props} />,
  headerStyle: {
    height: 100,
  },
});

const Tab = createBottomTabNavigator<AppParamList>();

const AppNavigator: React.FC<AppNavigatorProps> = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={screenOptions}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favourites" component={FavouriteScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;