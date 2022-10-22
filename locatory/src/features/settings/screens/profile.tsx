import React, {useState} from "react";
import { Avatar } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";
import * as ImagePicker from "expo-image-picker";

import {Scroller, AccountForm, AuthInput, AuthButton} from "../../account/screens/login/styles";
import {ImageButton} from '../../account/screens/create/styles';
import Spacer from '../../../components/spacer';
import { profilePageTranslations as translations } from '../../../utils/translations';
import { useUserContext } from "../../../context/user.context";
import { useMainContext } from "../../../context/main.context";

const defaultUrl =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const toast = useToast();
  const { lang } = useMainContext();

  const { 
    name,
    image: picture, 
    setImage, setName,
  } = useUserContext();
  const [currImage, setCurrImage] = useState<string>(picture);
  const [currName, setCurrName] = useState<string>(name);
  
  const imageUrl = currImage.length ? currImage : defaultUrl;

  const openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission is required to access photos");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) setCurrImage(pickerResult.uri);
  };

  const updateAccount = () => {
    setImage!(currImage);
    setName!(currName);
    toast.show(translations.updation[lang], {
      placement: "center",
      type: "success",
      duration: 1500,
    });
  };

  return (
    <Scroller>
      <AccountForm>
        <Spacer size="large" />
        <Avatar.Image
          size={142}
          source={{ uri: imageUrl + `?${new Date()}` }}
        />
        <Spacer size="large" />
        <Spacer size="large" />
        <ImageButton icon="image" onPress={openImagePickerAsync}>
          {translations.photo[lang]}
        </ImageButton>
      </AccountForm>
      <AccountForm>
        <AuthInput
          mode="outlined"
          label={translations.name[lang]}
          placeholder={translations.name[lang]}
          autoCapitalize="none"
          outlineColor="grey"
          activeOutlineColor="black"
          value={currName}
          onChangeText={setCurrName}
        />
        <Spacer size="large" />
        <Spacer size="large" />
        <AuthButton
          color="#171417"
          mode="contained"
          disabled={
            (currName.length < 1) 
            || (currImage === picture && currName === name)
          }
          tiny
          onPress={updateAccount}
        >
          {translations.update[lang]}
        </AuthButton>
      </AccountForm>
    </Scroller>
  );
};

export default ProfileScreen;
