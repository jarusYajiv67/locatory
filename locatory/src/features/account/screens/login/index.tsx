import React, { useState } from "react";
import { View } from "react-native";
import PhoneInput, {isValidNumber} from "react-native-phone-number-input";

import { Portal } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {LoginScreenProp} from "../../../../infrastructure/navigation/account.navigator";

import Spacer from "../../../../components/spacer";
import Text from "../../../../components/typography";
import { Title } from "../conditions/styles";
import {
  Scroller,
  AccountForm,
  AuthButton,
  AuthInput,
  PressableFooter,
  TopCredit,
  ModalStyles,
  MainLogo
} from './styles';

import { useUserContext } from "../../../../context/user.context";

interface LoginScreenProps {}

export interface Country {
  callingCode: string[];
  cca2: string;
  currency: string[];
  flag: string;
  name: string;
  region: string;
  subregion: string;
}

export const India: Country = {
  callingCode: ["91"],
  cca2: "IN",
  currency: ["INR"],
  flag: "flag-in",
  name: "India",
  region: "Asia",
  subregion: "Southern Asia",
};

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const navigation = useNavigation<LoginScreenProp>();
  const { phone, setPhone, otp, setOtp, loginUser } = useUserContext();
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [country, setCountry] = useState<Country>(India);
  const [currPhone, setCurrPhone] = useState<string>('');

  const handleConfirmPress = () => {
    loginUser!();
    setShowOTP(false);
  };

  return (
    <>
      <Portal>
        <ModalStyles
          visible={showOTP}
          onDismiss={() => {
            setShowOTP(false);
          }}
        >
          <AccountForm>
            <Spacer size="large" />
            <Text>Enter OTP sent to {phone}</Text>
            <Spacer size="large" />
            <Spacer position="left" size="medium">
              <Spacer position="right" size="medium">
                <AuthInput
                  mode="outlined"
                  label="OTP"
                  placeholder="OTP"
                  keyboardType="numeric"
                  autoCapitalize="none"
                  outlineColor="grey"
                  activeOutlineColor="black"
                  value={otp}
                  onChangeText={setOtp}
                />
              </Spacer>
            </Spacer>
            <Spacer size="large" />
            <View>
              <AuthButton
                color="#171417"
                mode="contained"
                disabled={otp.length < 3}
                tiny
                onPress={handleConfirmPress}
              >
                Confirm
              </AuthButton>
              <Spacer size="large" />
            </View>
          </AccountForm>
        </ModalStyles>
      </Portal>
      <Scroller>
        <MainLogo resizeMode="contain" />
        <TopCredit>
          <Title>locatory</Title>
          <Text>Your directory for places</Text>
        </TopCredit>
        <AccountForm>
          <PhoneInput
            layout="second"
            defaultValue={currPhone}
            onChangeText={setCurrPhone}
            onChangeCountry={setCountry}
            onChangeFormattedText={setPhone}
            containerStyle={{
              borderRadius: 7,
            }}
            textContainerStyle={{
              borderRadius: 7,
            }}
            textInputStyle={{
              fontFamily: "CoreSans",
              fontSize: 18,
            }}
            codeTextStyle={{
              fontFamily: "CoreSans",
              fontSize: 18,
            }}
            withShadow
          />
          <Spacer size="large" />
          <AuthButton
            color="#171417"
            mode="contained"
            disabled={!isValidNumber(currPhone, country.cca2)}
            tiny
            onPress={() => setShowOTP(true)}
          >
            GET OTP
          </AuthButton>
          <Spacer size="large" />
        </AccountForm>
        <PressableFooter onPress={() => navigation.navigate("Conditions")}>
          <Text variant="caption">Terms and Conditions</Text>
          <Text variant="caption">Privacy and Policy</Text>
        </PressableFooter>
      </Scroller>
    </>
  );
};

export default LoginScreen;
