import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      text: {
        light: String;
        dark: String;
      };
      bg: {
        light: String;
        dark: String;
      };
    };
    fonts: {
      coreSans: String;
      gothicBanner: String;
    };
    fontSizes: {
      caption: String;
      button: String;
      body: String;
      title: String;
      h5: String;
      h4: String;
      h3: String;
      h2: String;
      h1: String;
    };
    sizes: String[];
    space: String[];
  }
  }
}