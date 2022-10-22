import React from "react";
import { useNavigation } from "@react-navigation/native";
import { CreateScreenProp } from "../../../../infrastructure/navigation/account.navigator";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import { 
  Scroller, 
  TopCredit,
  PressableFooter, 
  AccountForm,
  AuthInput,
  AuthButton
} from '../login/styles';
import {ImageButton} from './styles';
import Text from "../../../../components/typography";
import { Title } from "../conditions/styles";
import Spacer from "../../../../components/spacer";

import { useUserContext } from "../../../../context/user.context";

const defaultUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

interface CreateScreenProps {}

const CreateScreen: React.FC<CreateScreenProps> = () => {
  const navigation = useNavigation<CreateScreenProp>();
  const { 
    setLoggedIn, loggedIn, phone, otp
  } = useUserContext();
  
  const imageUrl = picture.length ? picture : defaultUrl;

  const openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission is required to access photos");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) setPicture!(pickerResult.uri);
  };

  return (
    <Scroller>
      <TopCredit>
        <Title>locatory</Title>
        <Text>Your directory for places</Text>
      </TopCredit>
      <AccountForm>
        <Spacer size="large" />
        <Avatar.Image
          size={142}
          source={{ uri: imageUrl + `?${new Date()}` }}
        />
        <Spacer size="large" />
        <Spacer size="large" />
        <ImageButton icon="image" onPress={openImagePickerAsync}>
          Choose Photo
        </ImageButton>
      </AccountForm>
      <AccountForm>
        <AuthInput
          mode="outlined"
          label="Name"
          placeholder="Name"
          autoCapitalize="none"
          outlineColor="grey"
          activeOutlineColor="black"
          value={name}
          onChangeText={setName}
        />
        <Spacer size="large" />
        <Spacer size="large" />
        <AuthButton
          color="#171417"
          mode="contained"
          disabled={!(name.length > 1)}
          tiny
          onPress={() => {
            setLoggedIn!(true);
            console.log({
              name,
              image: picture,
              loggedIn,
              phone, otp
            });
          }}
        >
          Create
        </AuthButton>
      </AccountForm>
      <PressableFooter onPress={() => navigation.navigate("Conditions")}>
        <Text variant="caption">Terms and Conditions</Text>
        <Text variant="caption">Privacy and Policy</Text>
      </PressableFooter>
    </Scroller>
  );
};

export default CreateScreen;
