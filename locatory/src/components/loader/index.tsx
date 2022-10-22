import React from "react";

import {Container, Loader as LoaderImg} from "./styles";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <Container>
      <LoaderImg />
    </Container>
  );
};

export default Loader;