import React from "react";

import SafeArea from "../../../../components/safe-area";
import termsAndConditions from "../../../../utils/terms-and-conditions";
import privacyPolicy from "../../../../utils/privacy-and-policy";
import Text from "../../../../components/typography";
import Spacer from "../../../../components/spacer";
import {useMainContext} from "../../../../context/main.context";
import {settingsMenuTranslations as translations} from "../../../../utils/translations";

import { ConditionsContainer, ScrollContainer, Title, SubTitle } from './styles';

interface ConditionsScreenProps {
  fromSettings?: boolean;
}

const ConditionsScreen: React.FC<ConditionsScreenProps> = ({fromSettings=false}) => {
  const {lang} = useMainContext();

  return (
    <SafeArea fromSettings={fromSettings}>
      {fromSettings === true && <Spacer size="large" />}
      <ConditionsContainer>
        {!fromSettings && <Title>locatory</Title>}
        <SubTitle>{translations.tac[lang]}</SubTitle>
        <Spacer size="medium" />
        <ScrollContainer>
          <Text variant="hint">{termsAndConditions}</Text>
        </ScrollContainer>
        <Spacer size="large" />
        <SubTitle>{translations.pap[lang]}</SubTitle>
        <Spacer size="medium" />
        <ScrollContainer>
          <Text variant="hint">{privacyPolicy}</Text>
        </ScrollContainer>
      </ConditionsContainer>
      {fromSettings === true && <Spacer size="large" />}
    </SafeArea>
  );
};

export default ConditionsScreen;
