import React from "react";
import { useMainContext } from "../../context/main.context";

import {Container, MesssageBox, MessageText} from "./styles";

const localTranslations: Array<string> = [
  "You are not connected to the internet",
  "您没有连接到互联网",
  "आप इंटरनेट से कनेक्ट नहीं हैं",
  "Vous n'êtes pas connecté à Internet",
  "أنت غير متصل بالإنترنت",
  "Вы не подключены к Интернету",
];

interface NoInternetProps {}

const NoInternet: React.FC<NoInternetProps> = () => {
  const {lang} = useMainContext();

  return (
    <Container>
      <MesssageBox>
        <MessageText>
          {localTranslations[lang]}
        </MessageText>
      </MesssageBox>
    </Container>
  );
};

export default NoInternet;
