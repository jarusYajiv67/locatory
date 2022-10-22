import React, {useState} from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Portal, RadioButton } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";

import { 
  Container, MenuItem, ModalStyles,
  SubMenu, SubItem, SubItemText,
  ModalContainer
} from "./styles";

import { useUserContext } from "../../../context/user.context";
import { useMainContext } from "../../../context/main.context";
import { availLangTranslations, settingsMenuTranslations } from '../../../utils/translations';
import { MenuScreenProp } from "./index";

const languages: Array<string> = availLangTranslations.slice();
const translations = {...settingsMenuTranslations};

interface SettingsMenuProps {}

const SettingsMenu: React.FC<SettingsMenuProps> = () => {
  const navigation = useNavigation<MenuScreenProp>();
  const toast = useToast();
  const { logoutUser } = useUserContext();
  const { lang: currLang, setLang: setCurrLang } = useMainContext();

  const [showLanguages, setShowLanguages] = useState<boolean>(false);

  const updateCurrLang = (lang: number) => {
    if (lang === currLang) return;
    toast.hideAll();
    toast.show(translations.toast[lang], {
      placement: "bottom",
      type: "success",
      duration: 1500
    });
    setCurrLang!(lang);
    setShowLanguages(false);
  };

  return (
    <>
      <Portal>
        <ModalStyles
          visible={showLanguages}
          onDismiss={() => setShowLanguages(false)}
        >
          <ModalContainer>
            <SubMenu>
              {languages.map((lang, idx) => (
                <SubItem key={lang}>
                  <RadioButton
                    value="Monthly"
                    status={currLang === idx ? "checked" : "unchecked"}
                    onPress={() => updateCurrLang!(idx)}
                    color="#171417"
                  />
                  <SubItemText onPress={() => updateCurrLang!(idx)}>
                    {lang}
                  </SubItemText>
                </SubItem>
              ))}
            </SubMenu>
          </ModalContainer>
        </ModalStyles>
      </Portal>
      <Container>
        <TouchableOpacity onPress={() => navigation.navigate("Subscription")}>
          <MenuItem>{translations.subscription[currLang]}</MenuItem>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowLanguages(true)}>
          <MenuItem>{translations.language[currLang]}</MenuItem>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => navigation.navigate("Conditions")}
        >
          <MenuItem>{translations.tac[currLang]}</MenuItem>
          <MenuItem>{translations.pap[currLang]}</MenuItem>
        </TouchableOpacity>
        <TouchableOpacity onPress={logoutUser!}>
          <MenuItem>{translations.logout[currLang]}</MenuItem>
        </TouchableOpacity>
      </Container>
    </>
  );
};

export default SettingsMenu;
