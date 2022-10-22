import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";

import HomeScrn from "./home";
import InfoScreen from "./info";
import { Review } from "../../../components/reviews/data";
import Reviews from "../../../components/reviews";

export type ReviewsProps = {
  name: string;
  reviews: Array<Review>;
}

type HomeParamList = {
  home: undefined;
  info: {
    place_id: string;
    name: string;
  };
  nearbyRvw: ReviewsProps;
};

export type HomeScrnProps = StackNavigationProp<HomeParamList, "home">;
export type InfoScreenProps = StackNavigationProp<HomeParamList, "info">;
export type RvwScrnProps = StackNavigationProp<HomeParamList, "nearbyRvw">;

const HomeStack = createStackNavigator<HomeParamList>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.ModalSlideFromBottomIOS,
};

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <HomeStack.Navigator screenOptions={screenOptions} initialRouteName="home">
      <HomeStack.Screen name="home" component={HomeScrn} />
      <HomeStack.Screen name="info" component={InfoScreen} />
      <HomeStack.Screen
        name="nearbyRvw"
        component={Reviews}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#f4f4f4" },
          headerTitleAlign: "center",
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeScreen;
