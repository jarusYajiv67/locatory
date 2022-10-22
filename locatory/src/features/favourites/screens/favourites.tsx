import React from "react";

import {Container} from '../../home/screens/styles';
import {CardsContainer, EmptyContainer, EmptyText, HeartImage} from './styles';
import PlaceCard from "../../../components/place-card";
import { useUserContext } from "../../../context/user.context";
import {favTranslations as translations} from "../../../utils/translations";
import { useMainContext } from "../../../context/main.context";

interface FavouriteScreenProps {}

const FavouriteScreen: React.FC<FavouriteScreenProps> = () => {
  const {favourites} = useUserContext();
  const {lang} = useMainContext();

  return (
    <Container>
      <CardsContainer>
        {favourites.map((val) => (
          <PlaceCard key={val} place_id={val} />
        ))}
        {favourites.length < 1 && (
          <EmptyContainer>
            <HeartImage />
            <EmptyText>
              {translations.emptyText[lang]}
            </EmptyText>
          </EmptyContainer>
        )}
      </CardsContainer>
    </Container>
  );
};

export default FavouriteScreen;
