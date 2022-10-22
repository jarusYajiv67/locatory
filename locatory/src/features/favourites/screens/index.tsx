import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
  StackNavigationOptions,
  TransitionPresets
} from "@react-navigation/stack";

import FavScreen from "./favourites";
import Reviews from "../../../components/reviews";
import {Review} from "../../../components/reviews/data";

export type ReviewsProps = {
  name: string;
  reviews: Array<Review>;
}

type FavParamList = {
  favScreen: undefined;
  reviewsScreen: ReviewsProps;
};

export type FavScreenProps = StackNavigationProp<FavParamList, "favScreen">;
export type ReviewScreenProps = StackNavigationProp<FavParamList, "reviewsScreen">;

const FavStack = createStackNavigator<FavParamList>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.ModalSlideFromBottomIOS,
};

interface FavouriteScreenProps {}

const FavouriteScreen: React.FC<FavouriteScreenProps> = () => {
  return (
    <FavStack.Navigator
      screenOptions={screenOptions}
      initialRouteName="favScreen"
    >
      <FavStack.Screen name="favScreen" component={FavScreen} />
      <FavStack.Screen
        name="reviewsScreen"
        component={Reviews}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#f4f4f4" },
          headerTitleAlign: "center"
        }}
      />
    </FavStack.Navigator>
  );
};

export default FavouriteScreen;
