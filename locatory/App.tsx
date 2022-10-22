import React from "react";
import { ThemeProvider } from "styled-components/native";
import { useFonts } from "expo-font";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider as ModalProvider } from "react-native-paper";

import theme from "./src/infrastructure/styles";
import Navigation from "./src/infrastructure/navigation";
import RootContextProvider from "./src/context/root.context";


interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [CoreSans] = useFonts({
    CoreSans: require("./assets/fonts/CoreSans.ttf")
  });

  const [GothicBanner] = useFonts({
    GothicBanner: require("./assets/fonts/GothicBanner.otf")
  });

  if (!CoreSans || !GothicBanner) return null;

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <ModalProvider>
          <RootContextProvider>
            <Navigation />
          </RootContextProvider>
        </ModalProvider>
      </ToastProvider>
    </ThemeProvider>
  );

};

export default App;



