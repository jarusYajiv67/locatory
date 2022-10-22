import styled, { DefaultTheme } from "styled-components/native";

const defaultTextStyles = (theme: DefaultTheme) => `
  fontFamily: ${theme.fonts.coreSans};
  color: ${theme.colors.text};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme: DefaultTheme) => `
  font-size: ${theme.fontSizes.body};
`;

const hint = (theme: DefaultTheme) => `
  font-size: ${theme.fontSizes.body};
`;

const caption = (theme: DefaultTheme) => `
  font-size: ${theme.fontSizes.caption};
`;

const label = (theme: DefaultTheme) => `
  font-size: ${theme.fontSizes.body};
`;

const error = (theme: DefaultTheme) => `
  color: #D0421B;
`;

const success = (theme: DefaultTheme) => `
  color: #138000;
`;

type varType = 'body' | 'label' | 'caption' | 'error' | 'hint' | 'success';

const variants = {
  body,
  label,
  caption,
  error,
  hint,
  success,
};

const Text = styled.Text<{variant?: varType}>`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant||"body"](theme)}
`;

export default Text;
