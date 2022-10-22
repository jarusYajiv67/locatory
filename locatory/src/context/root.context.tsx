import React from "react";
import { MainContextProvider } from "./main.context";
import { UserContextProvider } from "./user.context";

const providers: Array<React.FC<{ children: React.ReactNode }>> = [
  MainContextProvider,
  UserContextProvider,
];

interface RootContextProps {
  children: React.ReactNode;
}

const RootContextProvider: React.FC<RootContextProps> = ({ children }) => {
  return (
    <>
      {providers.reduceRight(
        (acc, ResultComponent) => (
          <ResultComponent>{acc}</ResultComponent>
        ),
        children
      )}
    </>
  );
};

export default RootContextProvider;