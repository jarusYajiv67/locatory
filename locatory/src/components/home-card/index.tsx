import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Icon,
  CategoryText
} from "./styles";
import {Category} from '../../features/home/screens/data';
import {homeTranslations as translations} from '../../utils/translations';
import {useMainContext} from '../../context/main.context';
import {HomeScrnProps} from "../../features/home/screens";

interface HomeCardProps extends Category {}

const HomeCard: React.FC<HomeCardProps> = ({icon, name}) => {
  const navigation = useNavigation<HomeScrnProps>();
  const {lang} = useMainContext();

  return (
    <Container onPress={() => navigation.navigate("nearby", {name})}>
      <Icon source={icon} />
      <CategoryText>{translations[name.toLowerCase()][lang]}</CategoryText>
    </Container>
  );
};

export default HomeCard;
