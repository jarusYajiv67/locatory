import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      text: string;
      bg: string;
    };
    fonts: {
      coreSans: string;
      gothicBanner: string;
    };
    fontSizes: {
      caption: string;
      button: string;
      body: string;
      title: string;
      h5: string;
      h4: string;
      h3: string;
      h2: string;
      h1: string;
    };
    sizes: Array<string>;
    space: Array<string>;
  }
}