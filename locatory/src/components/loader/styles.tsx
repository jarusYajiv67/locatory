import styled from "styled-components/native";
import loader from "../../../assets/loader.gif";

export const Container = styled.View`
  position: absolute;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.42);
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Loader = styled.Image.attrs({
  source: loader
})`
  width: 100px;
  height: 100px;
`;