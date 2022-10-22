import React from "react";

import styled, { DefaultTheme, useTheme } from "styled-components/native";

type sizesType = 'small' | 'medium' | 'large';
type posesType = 'top' | 'left' | 'right' | 'bottom';

const sizes = {
  small: 1,
  medium: 2,
  large: 3,
};

const positions = {
  top: "margin-top",
  left: "margin-left",
  right: "margin-right",
  bottom: "margin-bottom",
};

const getVariant = (pos: posesType, size: sizesType, theme: DefaultTheme): string => {
  const sizeIndex = sizes[size];
  const property = positions[pos];
  const value = theme.space[sizeIndex];
  return `${property}: ${value}`;
};

const SpacerView = styled.View<{variant: string}>`
  ${({ variant }) => variant};
`;

interface SpacerProps {
  position?: posesType;
  size?: sizesType;
  children?: React.ReactNode
}

const Spacer: React.FC<SpacerProps> = ({ position = "top", size = "small", children }) => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);
  return <SpacerView variant={variant}>{children}</SpacerView>;
};

export default Spacer;
