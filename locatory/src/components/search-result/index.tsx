import React from "react";
import { useNavigation } from "@react-navigation/native";

import { ResultItem } from "./data";
import {Container, Name, Address} from "./styles";
import {HomeScrnProps} from "../../features/home/screens";

interface SearchResultProps extends ResultItem {}

const SearchResult: React.FC<SearchResultProps> = ({
  main_text, secondary_text, place_id
}) => {
  const navigation = useNavigation<HomeScrnProps>();

  return (
    <Container onPress={() => navigation.navigate("info", {place_id, name: main_text})}>
      <Name>{main_text}</Name>
      <Address>{secondary_text}</Address>
    </Container>
  );
};

export default SearchResult;