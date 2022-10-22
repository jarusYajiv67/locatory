import React, {useEffect} from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import { Container } from "./styles";
import ReviewCard from "./review-card";

import { ReviewScreenProps, ReviewsProps } from "../../features/favourites/screens";
import { favTranslations } from "../../utils/translations";
import { useMainContext } from "../../context/main.context";

const Reviews = () => {
  const {lang} = useMainContext();
  const {reviews, name} = useRoute().params as ReviewsProps;
  const navigation = useNavigation<ReviewScreenProps>();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${name} ${favTranslations.reviews[lang]}`
    });
  }, [lang]);

  return (
    <Container>
      {reviews.map(val => <ReviewCard key={val.author_name} {...val} />)}
    </Container>
  );
};

export default Reviews;