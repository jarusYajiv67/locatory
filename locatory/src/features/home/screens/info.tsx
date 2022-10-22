import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {TouchableOpacity, Linking, Platform} from "react-native";
import axios from "axios";

import { 
  InfoContainer, InfoDist, InfoImage, 
  InfoName, InfoTop, Rate, RateCount, RateIcon,
  UtilImage, FavImage, InfoTopContainer, Address,
  Buttons, DetailButton, ReviewsContainer,
  Footer, HrLn, Caption
} from "./styles";
import { favTranslations as translations } from "../../../utils/translations";
import { getDistance } from "../../../utils/distance";
import { useMainContext } from "../../../context/main.context";
import ReviewCard from "../../../components/reviews/review-card";
import { Review } from "../../../components/reviews/data";
import { API_URL } from "../../../utils/constants";
import { useUserContext } from "../../../context/user.context";

export interface InfoCard {
  photo_url: string;
  name: string;
  location: string;
  rating: number;
  total_ratings: number;
  isFavourite: boolean;
  open_now: boolean;
  address: string;
  reviews: Array<Review>;
  phone: string;
  website: string;
  place_id: string;
};

const InfoScreen = () => {
  const {place_id} = useRoute().params as {place_id: string; name: string};
  const {location, lang} = useMainContext();
  const {token, setLoading, favourites, favHandler} = useUserContext();
  const [info, setInfo] = useState<InfoCard>({} as InfoCard);

  const onDirectionsPress = (latLng: string, label: string) => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url as string);
  };

  useEffect(() => {
    if (place_id?.length < 1) return;
    setLoading!(true);
    axios
      .post(
        `${API_URL}api/google-api/place-info`,
        {place_id},
        {headers: { Authorization: `Bearer ${token}`}},
      )
      .then(({ data }) => {
        setInfo(data);
        setLoading!(false);
      })
      .catch((err) => {
        setLoading!(false);
        console.log(err);
      });
  }, [place_id]);

  return (
    <InfoContainer>
      <InfoName>{info?.name}</InfoName>
      {info.location && (
        <InfoDist> ({info.location && getDistance(info.location, location)})</InfoDist>
      )}
      <InfoImage source={{ uri: info?.photo_url }} />
      <Address>{info?.address}</Address>
      <InfoTopContainer>
        <TouchableOpacity onPress={() => favHandler!(place_id)}>
          <FavImage fav={favourites.includes(place_id)} />
        </TouchableOpacity>
        {info.open_now ? (
          <UtilImage source={require("../../../../assets/icons/open.png")} />
        ) : (
          <UtilImage source={require("../../../../assets/icons/close.png")} />
        )}
      </InfoTopContainer>
      <Buttons>
        {info?.phone?.length > 0 && (
          <DetailButton onPress={() => Linking.openURL(`tel:${info.phone}`)}>
            {translations.contact[lang]}
          </DetailButton>
        )}
        {info?.location?.length > 0 && (
          <DetailButton
            onPress={() => onDirectionsPress(info.location, info.name)}
          >
            {translations.directions[lang]}
          </DetailButton>
        )}
        {info?.website?.length > 0 && (
          <DetailButton onPress={() => Linking.openURL(info.website)}>
            {translations.website[lang]}
          </DetailButton>
        )}
      </Buttons>
      <Footer>
        <HrLn />
        <Caption>Reviews</Caption>
      </Footer>
      <InfoTop>
        <Rate>{info?.rating}</Rate>
        <RateIcon />
        <RateCount>({info?.total_ratings})</RateCount>
      </InfoTop>
      <ReviewsContainer>
        {info?.reviews?.map((val) => (
          <ReviewCard key={val.author_name} {...val} />
        ))}
      </ReviewsContainer>
    </InfoContainer>
  );
};

export default InfoScreen;
