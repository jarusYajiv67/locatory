import React, { useEffect, useState } from "react";
import { TouchableOpacity, Linking, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { useMainContext } from "../../context/main.context";
import { getDistance } from "../../utils/distance";

import { favTranslations as translations } from "../../utils/translations";

import { 
  Card, RateIcon, TopImage,
  RatingContainer, Name, Rate, 
  RateCount, Address, Images, 
  FavImage, UtilImage, Buttons, DetailButton,
  Distance, TopContainer
} from "./styles";
import { HomeScrnProps } from "../../features/home/screens";
import {Review} from "../reviews/data";
import { InfoCard } from "../../features/home/screens/info";
import { API_URL } from "../../utils/constants";
import { useUserContext } from "../../context/user.context";

interface NearbyCardProps extends InfoCard {}

interface MiscData {
  reviews: Array<Review>;
  phone: string;
  website: string;
}

const NearbyCard: React.FC<NearbyCardProps> = ({
  photo_url, name, location,
  rating, total_ratings, address,
  open_now, place_id
}) => {
  const navigation = useNavigation<HomeScrnProps>();
  const {location: currLoc, lang} = useMainContext();
  const {token, setLoading, favourites, favHandler} = useUserContext();
  const [misc, setMisc] = useState<MiscData>({} as MiscData);

  const handleReviewPress = () => {
    if (!(misc.reviews && misc.reviews.length > 0)) return;
    navigation.navigate("nearbyRvw", {
      name,
      reviews: misc.reviews || []
    });
  };

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
        `${API_URL}api/google-api/nearby-place-misc`,
        { place_id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(({ data }) => {
        setMisc(data);
        setLoading!(false);
      })
      .catch((err) => {
        setLoading!(false);
        console.log(err);
      });
  }, [place_id]);

  return (
    <Card>
      <TopImage source={{ uri: photo_url }} />
      <Name>{name}</Name>
      <TopContainer>
        <Distance> - {getDistance(location, currLoc)}</Distance>
        <Images>
          <TouchableOpacity onPress={() => favHandler!(place_id)}>
            <FavImage fav={favourites.includes(place_id)} />
          </TouchableOpacity>
          {open_now ? (
            <UtilImage source={require("../../../assets/icons/open.png")} />
          ) : (
            <UtilImage source={require("../../../assets/icons/close.png")} />
          )}
        </Images>
      </TopContainer>
      <TouchableOpacity onPress={handleReviewPress}>
        <RatingContainer>
          <Rate>{rating}</Rate>
          <RateIcon />
          <RateCount>({total_ratings})</RateCount>
        </RatingContainer>
      </TouchableOpacity>
      <Address>{address}</Address>
      <Buttons>
        {misc?.phone?.length > 0 && (
          <DetailButton onPress={() => Linking.openURL(`tel:${misc.phone}`)}>
            {translations.contact[lang]}
          </DetailButton>
        )}
        {location?.length > 0 && (
          <DetailButton onPress={() => onDirectionsPress(location, name)}>
            {translations.directions[lang]}
          </DetailButton>
        )}
        {misc?.website?.length > 0 && (
          <DetailButton onPress={() => Linking.openURL(misc.website)}>
            {translations.website[lang]}
          </DetailButton>
        )}
      </Buttons>
    </Card>
  );
};

export default NearbyCard;