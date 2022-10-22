import React from "react";
import { Review } from "./data";

import {
  Card, Header, UserImage,
  Details, ReviewText,
  Name, Time, Rating,
  RateIcon, Rate
} from "./styles";

interface ReviewCardProps extends Review {}

const ReviewCard: React.FC<ReviewCardProps> = ({
  text, profile_photo_url, author_name,
  relative_time_description, rating
}) => {
  return (
    <Card>
      <Header>
        <UserImage source={{uri: profile_photo_url}} />
        <Details>
          <Name>{author_name}</Name>
          <Rating>
            <Rate>{rating}</Rate>
            <RateIcon />
            <Time>{relative_time_description}</Time>
          </Rating>
        </Details>
      </Header>
      <ReviewText>{text}</ReviewText>
    </Card>
  );
};

export default ReviewCard;
