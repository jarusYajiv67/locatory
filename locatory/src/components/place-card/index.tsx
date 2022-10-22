import React, { useState, useEffect } from "react";
import {TouchableOpacity, Linking, Platform} from "react-native";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";

import {
  Card, RateIcon, TopImage,
  RatingContainer, Name, Rate, 
  RateCount, Address, Images, 
  FavImage, UtilImage, Buttons, DetailButton,
  Distance, TopContainer
} from "../nearby-card/styles";
import { useMainContext } from "../../context/main.context";
import {favTranslations as translations} from '../../utils/translations';
import { FavScreenProps } from "../../features/favourites/screens";

import { useUserContext } from "../../context/user.context";
import { InfoCard } from "../../features/home/screens/info";
import { API_URL } from "../../utils/constants";
import {getDistance} from "../../utils/distance";

interface PlaceCardProps {
  place_id: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({place_id}) => {
  const navigation = useNavigation<FavScreenProps>();
  const { lang, location: currLoc } = useMainContext();
  const {favourites, favHandler, setLoading, token} = useUserContext();

  const [info, setInfo] = useState<InfoCard>({} as InfoCard);

  useEffect(() => {
    if (place_id?.length < 1) return;
    // setLoading!(true);
    axios
      .post(
        `${API_URL}api/google-api/place-info`,
        { place_id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(({ data }) => {
        setInfo(data);
        // setLoading!(false);
      })
      .catch((err) => {
        // setLoading!(false);
        console.log(err);
      });
  }, [place_id]);

  const handleReviewPress = () => {
    if (!(info.reviews && info.reviews.length > 0)) return;
    navigation.navigate("reviewsScreen", {
      name: info.name,
      reviews: info.reviews || []
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

  return (
    <Card>
      <TopImage source={{ uri: info.photo_url }} />
      <Name>{info.name}</Name>
      <TopContainer>
        <Distance> - {info.location && getDistance(info.location, currLoc)}</Distance>
        <Images>
          <TouchableOpacity onPress={() => favHandler!(place_id)}>
            <FavImage fav={favourites.includes(place_id)} />
          </TouchableOpacity>
          {info.open_now ? (
            <UtilImage source={require("../../../assets/icons/open.png")} />
          ) : (
            <UtilImage source={require("../../../assets/icons/close.png")} />
          )}
        </Images>
      </TopContainer>
      <TouchableOpacity onPress={handleReviewPress}>
        <RatingContainer>
          <Rate>{info.rating}</Rate>
          <RateIcon />
          <RateCount>{info.total_ratings}</RateCount>
        </RatingContainer>
      </TouchableOpacity>
      <Address>{info.address}</Address>
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
    </Card>
  );
};

export default PlaceCard;
