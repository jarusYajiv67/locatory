import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";

import { AuthButton } from "../../account/screens/login/styles";
import { useUserContext } from '../../../context/user.context';
import { subscriptionPageTranslations as translations } from '../../../utils/translations';
import { useMainContext } from '../../../context/main.context';
import { 
  SubsContainer, 
  SubsHeader,
  SubsHeadText,
  SubsHeadCap,
  SubMenu,
  SubItem,
  SubItemText,
} from "./styles";

const mapPlans = {
  "Monthly": 2592000000,
  "Yearly": 31104000000
};

interface SubscriptionScreenProps {}

const SubscriptionScreen: React.FC<SubscriptionScreenProps> = () => {
  const toast = useToast();
  const { lang } = useMainContext();
  const { expires, setExpires } = useUserContext();
  const [plan, setPlan] = useState<"Monthly"|"Yearly">("Monthly");

  const updateDays = () => {
    setExpires!(expires + mapPlans[plan]);
    toast.show(translations.toast[lang], {
      placement: "bottom",
      type: "success",
      duration: 1500,
    });
  };

  return (
    <SubsContainer>
      <SubsHeader>
        <SubsHeadCap>{translations.title[lang]}</SubsHeadCap>
        <SubsHeadText>
          {Math.floor((expires - Date.now()) / 86400000)}
        </SubsHeadText>
        <SubsHeadCap>{translations.days[lang]}</SubsHeadCap>
      </SubsHeader>
      <SubMenu>
        <SubItem>
          <RadioButton
            value="Monthly"
            status={plan === "Monthly" ? "checked" : "unchecked"}
            onPress={() => setPlan("Monthly")}
            color="#171417"
          />
          <SubItemText>30 {translations.days[lang]} - 2.99 $</SubItemText>
        </SubItem>
        <SubItem>
          <RadioButton
            value="Yearly"
            status={plan === "Yearly" ? "checked" : "unchecked"}
            onPress={() => setPlan("Yearly")}
            color="#171417"
          />
          <SubItemText>360 {translations.days[lang]} - 8.70 $</SubItemText>
        </SubItem>
      </SubMenu>
      <AuthButton color="#171417" mode="contained" onPress={updateDays} tiny>
        {translations.confirm[lang]}
      </AuthButton>
    </SubsContainer>
  );
};

export default SubscriptionScreen;
